/* eslint-disable no-eval */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import Websocket from 'react-websocket';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { Hook, Decode } from 'console-feed';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { IoIosArrowDown, IoIosCloud } from 'react-icons/io';
import { MdCompare, MdFormatAlignLeft } from 'react-icons/md';
import action from '../../actions';
import TabPanel from '../TabPanel';
import ConsoleBox from '../ConsoleBox';
import Button from '../Button';
import Dropdown from './Dropdown';
import Resizer from '../Resizer';
import Modal from '../Modal';
import TextInput from '../TextInput';
import RadioButtonGroup from '../RadioButtonGroup';
import CodioNotification from '../CodioNotification';

import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/twilight.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';

import 'codemirror/addon/selection/active-line';

import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldgutter.css';

import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css'; // without this css hints won't show

import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/searchcursor';

import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';

import 'codemirror/addon/comment/comment';
import 'codemirror-colorpicker/dist/codemirror-colorpicker.css';
import 'codemirror-colorpicker';

import './index.scss';
import defaultAvatar from '../../assets/default_avatar.jpg';

const beautify_js = require('js-beautify'); // also available under "js" export
const beautify_css = require('js-beautify').css;
const beautify_html = require('js-beautify').html;


const colorArr = [
  '#FF5511',
  '#00AA00',
  '#009FCC',
  '#7700BB',
  '#FF77FF',
  '#8B4513',
  ' #00FFFF',
  '#00FF00',
];

class CodeEditors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      project_title: '專案名稱',
      isDropdownOpen: false,
      editorWidth: 650,
      projectTitleInputSize: 0,
      isShareModalOpen: false,
      isDeleteModalOpen: false,
      permission: '編輯',
      currentCollabarators: [],
    };
    this.delayHtmlOnChange = _.throttle(this.htmlEditorOnChange, 3000);
    this.delayCssOnChange = _.throttle(this.cssEditorOnChange, 3000);
    this.delayJsOnChange = _.throttle(this.jsEditorOnChange, 3000, {
      leading: false,
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (this.props.project[id]) {
      this.setState(
        {
          project_title: this.props.project[id].mp_name,
        },
        () => {
          this.autoSizeInput(this.state.project_title);
        },
      );
    } else {
      this.autoSizeInput(this.state.project_title);
    }
    this.props.getCodeByProjectId(
      {
        token: this.props.user.token,
        projectId: id,
        m_no: this.props.user.m_no,
      },
      this.props.history,
    );
    this.printConsole();
  }

  componentDidUpdate(prevProps, prevState) {
    const { html, css, js } = this.props.editor;
    if (prevProps.editor.js !== js) {
      this.updateConsole();
    }
    if (prevProps.editor.css !== css || prevProps.editor.html !== html) {
      this.runCode();
    }
  }

  runCode = () => {
    const { html, css, js } = this.props.editor;

    const { iframe } = this.refs;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  selectAll = (cm) => {
    cm.execCommand('selectAll');
  };

  autoFormatRange = (cm, from, to, lang) => {
    const text = cm.getRange(from, to);
    const outer = cm.getMode();
    const lines = 0;
    cm.operation(() => {
      switch (lang || outer.name) {
        case 'htmlmixed':
          cm.replaceRange(
            beautify_html(text, {
              indent_size: 2,
              html: {
                end_with_newline: true,
                js: {
                  indent_size: 2,
                },
                css: {
                  indent_size: 2,
                },
              },
              css: {
                indent_size: 2,
              },
              js: {
                'preserve-newlines': true,
              },
            }),
            from,
            to,
          );
          break;
        case 'css':
          cm.replaceRange(
            beautify_css(text, {
              indent_size: 4,
              html: {
                end_with_newline: true,
                js: {
                  indent_size: 2,
                },
                css: {
                  indent_size: 2,
                },
              },
              css: {
                indent_size: 2,
              },
              js: {
                'preserve-newlines': true,
              },
            }),
            from,
            to,
          );
          break;
        case 'javascript':
          cm.replaceRange(beautify_js(text), from, to);
          break;
        default:
          break;
      }
      for (
        let cur = from.line + 1, end = from.line + lines;
        cur <= end;
        ++cur
      ) {
        cm.indentLine(cur, 'smart');
      }
      cm.setSelection(from, cm.getCursor(false));
    });
  };

  autoFormat = (cm, lang) => {
    const cursor_line = cm.getCursor().line;
    const cursor_ch = cm.getCursor().ch;
    cm.setCursor(0, 0);
    this.selectAll(cm);
    this.autoFormatRange(cm, cm.getCursor(true), cm.getCursor(false), lang);
    cm.setCursor(cursor_line, cursor_ch);
    this.updateConsole();
  };

  autoComplete = (cm, lang) => {
    let codeMirror;
    const hintOptions = {
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: true,
      closeOnUnfocus: true,
      matchInMiddle: true,
    };
    switch (lang || cm.getMode().name) {
      case 'htmlmixed':
        codeMirror = this.refs.htmlEditor.getCodeMirrorInstance();
        codeMirror.showHint(cm, codeMirror.hint.html, hintOptions);
        break;
      case 'css':
        codeMirror = this.refs.cssEditor.getCodeMirrorInstance();
        codeMirror.showHint(cm, codeMirror.hint.css, hintOptions);
        break;
      case 'javascript':
        codeMirror = this.refs.jsEditor.getCodeMirrorInstance();
        codeMirror.showHint(cm, codeMirror.hint.js, hintOptions);
        break;
      default:
        break;
    }
  };

  printConsole = () => {
    const { js } = this.props.editor;
    try {
      Hook(window.console, (log) => {
        this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }));
      });
      eval(js);
      this.runCode();
    } catch (e) {
      console.error(e);
    }
  };

  updateConsole = () => {
    const { js } = this.props.editor;
    const updatedLogs = [];
    try {
      Hook(window.console, (log) => {
        updatedLogs.push(Decode(log));
      });
      this.setState({ logs: updatedLogs });
      this.props.addLogs(updatedLogs);
      window.alert = function () { }; // 讓alert不要執行兩次
      eval(js);
      this.runCode();
    } catch (e) {
      console.error(e);
    }
  };

  jsEditorOnChange = (e, changeObj) => {
    this.props.updateJs(e);
    if (
      JSON.stringify(changeObj.text) !== '[";"]'
      && JSON.stringify(changeObj.text) !== '[""]'
      && JSON.stringify(changeObj.text) !== '[" "]'
      && JSON.stringify(changeObj.text) !== '["",""]'
    ) {
      this.autoComplete(this.refs.jsEditor.codeMirror, 'javascript');
    }
  };

  cssEditorOnChange = (e, changeObj) => {
    this.props.updateCss(e);
    if (
      JSON.stringify(changeObj.text) !== '[";"]'
      && JSON.stringify(changeObj.text) !== '[""]'
      && JSON.stringify(changeObj.text) !== '["",""]'
      && JSON.stringify(changeObj.text) !== '["{"]'
      && JSON.stringify(changeObj.text) !== '["}"]'
      && JSON.stringify(changeObj.text) !== '["{}"]'
    ) {
      this.autoComplete(this.refs.cssEditor.codeMirror, 'css');
    }
  };

  htmlEditorOnChange = (e, changeObj) => {
    this.props.updateHtml(e);
    if (
      JSON.stringify(changeObj.text) !== '[""]'
      && JSON.stringify(changeObj.text) !== '["",""]'
      && JSON.stringify(changeObj.text) !== '["  "]'
      && JSON.stringify(changeObj.text) !== '[">","","</div>"]'
    ) {
      this.autoComplete(this.refs.htmlEditor.codeMirror, 'htmlmixed');
    }
  };

  cursorOnChange = (e, mode) => {
    this.props.updateCursor({
      mode,
      line: e.doc.getCursor().line + 1,
      ch: e.doc.getCursor().ch,
    });
    // this.sendMessage(JSON.stringify({
    //   type: 'cursor change',
    // }));
  };

  switchDropdown = (isOpen) => {
    this.setState({
      isDropdownOpen: isOpen,
    });
  };

  editorWidthOnChange = (width) => {
    this.setState({
      editorWidth: width,
    });
  };

  autoSizeInput = (text) => {
    let inputSize = 0;
    if (text.length > 0) {
      for (let i = 0; i < text.length; i++) {
        if (
          /^[A-Za-z0-9]*$/.test(text.charAt(i))
          || /[.!?\\-]/.test(text.charAt(i))
          || text.charAt(i) === ' '
        ) {
          // number
          inputSize++;
        } else {
          inputSize += 2;
        }
      }
      this.setState({
        projectTitleInputSize: inputSize,
      });
    } else {
      this.setState({
        projectTitleInputSize: 1,
      });
    }
  };

  coord = (cm, line, ch) =>
    cm.codeMirror.charCoords(
      {
        line: line,
        ch: ch,
      },
      'windows',
    );

  // 儲存程式碼
  saveCode = () => {
    const { id } = this.props.match.params;
    const { html, css, js } = this.props.editor;
    this.props.updateCode(
      {
        token: this.props.user.token,
        projectId: id,
        projectName: this.state.project_title,
        html,
        css,
        js,
      },
      () => {
        store.addNotification({
          message: '儲存成功！',
          type: 'default', // 'default', 'success', 'info', 'warning'
          container: 'bottom-left', // where to position the notifications
          animationIn: ['animated', 'fadeIn'], // animate.css classes that's applied
          animationOut: ['animated', 'fadeOut'], // animate.css classes that's applied
          dismiss: {
            duration: 3000,
          },
        });
      },
    );
    let cursorbar = document.createElement('div');
    cursorbar.innerHTML = ' ';
    cursorbar.setAttribute(
      'style',
      `height: 22px; border-left: 2px solid rgb(179, 216, 78); position: absolute; left: ${
        this.coord(this.refs.htmlEditor, 0, 1).left
      }px; top: ${this.coord(this.refs.htmlEditor, 0, 1).top}px`,
    );
    cursorbar.classList.add('cursorbar');
    this.refs.htmlEditor.codeMirror.doc.setBookmark(
      { line: 0, ch: 1 },
      cursorbar,
    );
    // console.log(this.refs.htmlEditor.codeMirror.doc);
  };

  handleWebSocketOnOpen = (msg) => {
    console.log('onOpen', msg);
    // console.log(JSON.stringify({
    //   type: 'new client',
    //   m_no: this.props.user.m_no,
    //   m_name: this.props.user.m_name,
    //   m_avatar: this.props.user.m_avatar.replace('https://i.imgur.com/', '').substring(0,7) || 'SiRVSp2',
    // }));
    this.sendMessage(
      JSON.stringify({
        type: 'new client',
        m_no: this.props.user.m_no,
        m_name: this.props.user.m_name,
        m_avatar: this.props.user.m_avatar || 'https://i.imgur.com/SiRVSp2.jpg',
      }),
    );
  };

  handleWebSocketOnMessage = (msg) => {
    var message;
    console.log('msg', msg);
    console.log('JSON.parse(msg)', JSON.parse(msg));
    if (msg && JSON.parse(msg).Message !== 'Accepted')
      message = JSON.parse(JSON.parse(msg).Message);
    else message = JSON.parse(msg).Message;
    console.log('收到訊息===>', message);
    if (
      message.type === 'new client' &&
      message.m_no !== this.props.user.m_no
    ) {
      store.addNotification({
        content: (
          <CodioNotification name={message.m_name} avatar={message.m_avatar} />
        ),
        container: 'bottom-right',
        animationIn: ['animated', 'fadeIn'],
        animationOut: ['animated', 'fadeOut'],
        dismiss: {
          duration: 3000,
        },
      });
      this.sendMessage(
        JSON.stringify({
          type: 'old client',
          m_no: this.props.user.m_no,
          m_name: this.props.user.m_name,
          m_avatar:
            this.props.user.m_avatar || 'https://i.imgur.com/SiRVSp2.jpg',
        }),
      );
    }
    if (
      message.type === 'old client' &&
      message.m_no !== this.props.user.m_no
    ) {
      this.setState({
        currentCollabarators: [
          ...this.state.currentCollabarators,
          {
            m_no: message.m_no,
            m_name: message.m_name,
            m_avatar: message.m_avatar,
          },
        ],
      });
    }
    console.log(this.state.currentCollabarators);
  };

  sendMessage(message) {
    this.refWebSocket.sendMessage(message);
  }

  render() {
    const { html, css, js } = this.props.editor;
    const ShareUrlInputRef = React.createRef();
    const permissionOptions = ['編輯', '檢視'];
    const codeMirrorOptions = {
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
        'Ctrl-Q': (cm) => {
          cm.foldCode(cm.getCursor());
        },
        'Ctrl-E': cm => this.autoFormat(cm),
        'Ctrl-H': cm => this.autoComplete(cm),
      },
      theme: 'one-dark',
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
      indentUnit: 2,
      lineNumbers: true,
      lineWrapping: true,
      matchTags: { bothTags: true },
      matchInMiddle: true,
      scrollbarStyle: null,
      showHint: true,
      styleActiveLine: true,
      tabSize: 2,
      lineWiseCopyCut: true,
    };
    const deleteModalOpen = () => {
      this.setState({
        isDeleteModalOpen: true,
      });
    };
    
    const deleteProjectHandler = () => {
      const { id } = this.props.match.params;
      const deleteProjectData = {
        token: this.props.user.token,
        mp_no: id,
      };
      this.props.deleteProject(deleteProjectData, this.props.history);
    };

    const dropdownOptions = [
      {
        text: '另開新專案',
        action: () => this.props.history.push('/create_project'),
      },
      { text: '刪除此專案', action: deleteProjectHandler },
      {
        text: '分享此專案',
        action: () => {
          this.setState({
            isShareModalOpen: true,
            isDropdownOpen: false,
          });
        },
      },
    ];

    const editorWidthStyle = {
      width: `${this.state.editorWidth}px`,
    };

    return (
      <div className="playground">
        <Websocket
          url="ws://Codio_backend.hsc.nutc.edu.tw/content"
          onOpen={this.handleWebSocketOnOpen}
          onMessage={this.handleWebSocketOnMessage}
          reconnect
          debug
          ref={(Websocket) => {
            this.refWebSocket = Websocket;
          }}
        />
        <Resizer
          direction="x"
          elementWidth={this.state.editorWidth}
          widthOnChange={this.editorWidthOnChange}
        >
          <TabPanel selected={this.props.currentActiveTab === 'html'}>
            <div className="titlebar" style={editorWidthStyle}>
              <input
                className="titlebar_input"
                value={this.state.project_title}
                aria-expanded="false"
                aria-busy="false"
                aria-owns="titlebar"
                aria-haspopup="true"
                placeholder=""
                size={this.state.projectTitleInputSize}
                onChange={(e) => {
                  this.setState({ project_title: e.target.value });
                  this.autoSizeInput(e.target.value);
                }}
              />
              <Dropdown
                icon={<IoIosArrowDown />}
                options={dropdownOptions}
                isOpen={this.state.isDropdownOpen}
                swichOptionHandler={this.switchDropdown}
              />
              {this.state.currentCollabarators.map((item, index) => (
                <img className="user_img" key={index} src={item.m_avatar} />
              ))}
              {/*<Modal
                isOpen={isModalOpen}
                title="確定刪除專案"
                onClose={() => {
                  setIsModalOpen(false);
                }}
                shouldCloseOnEsc
                shouldCloseOnClickOutside
                showControlBtn
                cancelBtnText="取消"
                confirmBtnText="新增"
                Confirm={deleteProjectHandler}
              /> */}
              <div className="titlebar_btnGroup">
                {/* <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="splitBtn"
                  icon={<MdCompare />}
                /> */}
                <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="saveBtn"
                  text="儲存"
                  icon={<IoIosCloud />}
                  onClick={this.saveCode}
                />
                <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="formatBtn"
                  icon={<MdFormatAlignLeft />}
                  onClick={() => this.autoFormat(
                    this.refs.htmlEditor.codeMirror,
                    'htmlmixed',
                  )
                  }
                />
              </div>
            </div>
            <div className="code-editor html-code">
              <div className="editor-header">
                <span className="editor-header-title">HTML</span>
              </div>
              <CodeMirror
                ref="htmlEditor"
                value={html}
                options={{
                  mode: 'htmlmixed',
                  ...codeMirrorOptions,
                }}
                onChange={(e, changeObj) => {
                  this.delayHtmlOnChange(e, changeObj);
                }}
                onCursorActivity={(e) => {
                  if (this.refs.htmlEditor !== undefined) {
                    this.cursorOnChange(e, 'html');
                  }
                }}
              />
            </div>
          </TabPanel>

          <TabPanel selected={this.props.currentActiveTab === 'css'}>
            <div className="titlebar" style={editorWidthStyle}>
              <input
                className="titlebar_input"
                value={this.state.project_title}
                aria-expanded="false"
                aria-busy="false"
                aria-owns="titlebar"
                aria-haspopup="true"
                placeholder=""
                size={this.state.projectTitleInputSize}
                onChange={(e) => {
                  this.setState({ project_title: e.target.value });
                  this.autoSizeInput(e.target.value);
                }}
              />
              <Dropdown
                icon={<IoIosArrowDown />}
                options={dropdownOptions}
                isOpen={this.state.isDropdownOpen}
                swichOptionHandler={this.switchDropdown}
              />
              <div className="titlebar_btnGroup">
                {/* <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="splitBtn"
                  icon={<MdCompare />}
                /> */}
                <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="saveBtn"
                  text="儲存"
                  icon={<IoIosCloud />}
                  onClick={this.saveCode}
                />
                <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="formatBtn"
                  icon={<MdFormatAlignLeft />}
                  onClick={() => this.autoFormat(this.refs.cssEditor.codeMirror, 'css')
                  }
                />
              </div>
            </div>
            <div className="code-editor css-code">
              <div className="editor-header">
                <span className="editor-header-title">CSS</span>
              </div>

              <CodeMirror
                ref="cssEditor"
                value={css}
                options={{
                  mode: 'css',
                  colorpicker: {
                    type: 'sketch', // or 'sketch',  default type is 'chromedevtool'
                  },
                  ...codeMirrorOptions,
                }}
                onChange={(e, changeObj) => {
                  this.delayCssOnChange(e, changeObj);
                }}
                onCursorActivity={(e) => {
                  if (this.refs.cssEditor !== undefined) {
                    this.cursorOnChange(e, 'css');
                  }
                }}
              />
            </div>
          </TabPanel>
          <TabPanel selected={this.props.currentActiveTab === 'js'}>
            <div className="titlebar" style={editorWidthStyle}>
              <input
                className="titlebar_input"
                value={this.state.project_title}
                aria-expanded="false"
                aria-busy="false"
                aria-owns="titlebar"
                aria-haspopup="true"
                placeholder=""
                size={this.state.projectTitleInputSize}
                onChange={(e) => {
                  this.setState({ project_title: e.target.value });
                  this.autoSizeInput(e.target.value);
                }}
              />
              <Dropdown
                icon={<IoIosArrowDown />}
                options={dropdownOptions}
                isOpen={this.state.isDropdownOpen}
                swichOptionHandler={this.switchDropdown}
              />
              <div className="titlebar_btnGroup">
                {/* <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="splitBtn"
                  icon={<MdCompare />}
                /> */}
                <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="saveBtn"
                  text="儲存"
                  icon={<IoIosCloud />}
                  onClick={this.saveCode}
                />
                <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="formatBtn"
                  icon={<MdFormatAlignLeft />}
                  onClick={() => this.autoFormat(this.refs.jsEditor.codeMirror, 'javascript')
                  }
                />
              </div>
            </div>
            <div className="code-editor js-code">
              <div className="editor-header">
                <span className="editor-header-title">JavaScript</span>
              </div>

              <CodeMirror
                ref="jsEditor"
                value={js}
                options={{
                  mode: 'javascript',
                  ...codeMirrorOptions,
                }}
                onChange={(e, changeObj) => {
                  this.delayJsOnChange(e, changeObj);
                }}
                onCursorActivity={(e) => {
                  if (this.refs.jsEditor !== undefined) {
                    this.cursorOnChange(e, 'js');
                  }
                }}
              />
            </div>
          </TabPanel>
          <TabPanel selected={this.props.currentActiveTab === 'logs'}>
            <div className="titlebar" style={editorWidthStyle}>
              <input
                className="titlebar_input"
                value={this.state.project_title}
                aria-expanded="false"
                aria-busy="false"
                aria-owns="titlebar"
                aria-haspopup="true"
                placeholder=""
                size={this.state.projectTitleInputSize}
                onChange={(e) => {
                  this.setState({ project_title: e.target.value });
                  this.autoSizeInput(e.target.value);
                }}
              />
              <Dropdown
                icon={<IoIosArrowDown />}
                options={dropdownOptions}
                isOpen={this.state.isDropdownOpen}
                swichOptionHandler={this.switchDropdown}
              />
              <div className="titlebar_btnGroup">
                {/* <Button
                  type="primary"
                  size="small"
                  theme="red"
                  shape="square"
                  className="splitBtn"
                  icon={<MdCompare />}
                /> */}
              </div>
            </div>
            <div className="code-editor logs-code">
              <div className="editor-header">Console</div>
              <ConsoleBox logs={this.state.logs} />
            </div>
          </TabPanel>
        </Resizer>
        <div
          className="result"
          style={{
            width: `calc(${window.innerWidth}px - ${this.state.editorWidth}px)`,
          }}
        >
          <iframe title="result" className="iframe" ref="iframe" />
        </div>
        <Modal
          isOpen={this.state.isShareModalOpen}
          className="shareModal"
          title="與他人共用"
          onClose={() => {
            this.setState({
              isShareModalOpen: false,
            });
          }}
          shouldCloseOnEsc
          shouldCloseOnClickOutside
          showControlBtn
          confirmBtnText="儲存"
          cancelBtnText="取消"
        >
          <TextInput
            text="http://www.qwertyuiopzjqwmdhsuabxsjx.."
            showPostBtn
            postBtnText="複製連結"
            ref={ShareUrlInputRef}
            postBtnOnClick={() => {
              ShareUrlInputRef.current.select();
              document.execCommand('copy');
            }}
            readonly
          />
          <p>知道連結的人可以</p>
          <RadioButtonGroup
            name="permission"
            options={permissionOptions}
            value={this.state.permission}
          // onChange={()=> {}}
          />
        </Modal>
        <Modal
          isOpen={this.state.isDeleteModalOpen}
          title="確定刪除專案"
          onClose={() => {
            this.setState({
              isDeleteModalOpen: false,
            });
          }}
          shouldCloseOnEsc
          shouldCloseOnClickOutside
          showControlBtn
          cancelBtnText="取消"
          confirmBtnText="確定"
          Confirm={deleteProjectHandler}
        />
      </div>
    );
  }
}
CodeEditors.propTypes = {
  currentActiveTab: PropTypes.string,
};
const mapStateToProps = store => ({
  editor: store.editor,
  user: store.user,
  project: store.project,
});
export default withRouter(connect(mapStateToProps, action)(CodeEditors));
