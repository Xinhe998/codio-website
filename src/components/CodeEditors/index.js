/* eslint-disable no-eval */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import Websocket from 'react-websocket';
import { store } from 'react-notifications-component';
import { Hook, Decode } from 'console-feed';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IoIosArrowDown, IoIosCloud } from 'react-icons/io';
import { MdCompare, MdFormatAlignLeft } from 'react-icons/md';
import action from '../../actions';
import TabPanel from '../TabPanel';
import ConsoleBox from '../ConsoleBox';
import Button from '../Button';
import Dropdown from './Dropdown';
import Resizer from '../Resizer';
import Modal from '../Modal';
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

import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import './index.scss';

let WS_URL = '';
if (
  process.env.NODE_ENV === 'production' ||
  process.env.CIRCLECI ||
  process.env.CI
) {
  WS_URL = process.env.WS_URL;
} else {
  WS_URL = require('../../../config/project_config').wsURL;
}

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
  '#00FFFF',
  '#00FF00',
];

class CodeEditors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
      project_title: this.props.editor.mp_name || '專案名稱',
      isDropdownOpen: false,
      editorWidth: 650,
      projectTitleInputSize: 0,
      isShareModalOpen: false,
      isDeleteModalOpen: false,
      permission: '編輯',
      currentCollabarators: [],
    };
    this.delayHtmlOnChange = _.throttle(this.htmlEditorOnChange, 1000);
    this.delayCssOnChange = _.throttle(this.cssEditorOnChange, 1000);
    this.delayJsOnChange = _.throttle(this.jsEditorOnChange, 1000, {
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
      window.alert = function() {}; // 讓alert不要執行兩次
      eval(js);
      this.runCode();
    } catch (e) {
      console.error(e);
    }
  };

  jsEditorOnChange = (e, changeObj) => {
    this.props.updateJs(e);
    this.sendMessage(
      JSON.stringify({
        type: 'on change',
        mode: 'js',
        m_no: this.props.user.m_no,
        m_name: this.props.user.m_name,
        code: e,
      }),
    );
    if (
      JSON.stringify(changeObj.text) !== '[";"]' &&
      JSON.stringify(changeObj.text) !== '[""]' &&
      JSON.stringify(changeObj.text) !== '[" "]' &&
      JSON.stringify(changeObj.text) !== '["",""]'
    ) {
      this.autoComplete(this.refs.jsEditor.codeMirror, 'javascript');
    }
  };

  cssEditorOnChange = (e, changeObj) => {
    this.props.updateCss(e);
    this.sendMessage(
      JSON.stringify({
        type: 'on change',
        mode: 'css',
        m_no: this.props.user.m_no,
        m_name: this.props.user.m_name,
        code: e,
      }),
    );
    if (
      JSON.stringify(changeObj.text) !== '[";"]' &&
      JSON.stringify(changeObj.text) !== '[""]' &&
      JSON.stringify(changeObj.text) !== '["",""]' &&
      JSON.stringify(changeObj.text) !== '["{"]' &&
      JSON.stringify(changeObj.text) !== '["}"]' &&
      JSON.stringify(changeObj.text) !== '["{}"]'
    ) {
      this.autoComplete(this.refs.cssEditor.codeMirror, 'css');
    }
  };

  htmlEditorOnChange = (e, changeObj) => {
    this.props.updateHtml(e);
    this.sendMessage(
      JSON.stringify({
        type: 'on change',
        mode: 'html',
        m_no: this.props.user.m_no,
        m_name: this.props.user.m_name,
        code: e,
      }),
    );
    if (
      JSON.stringify(changeObj.text) !== '[""]' &&
      JSON.stringify(changeObj.text) !== '["",""]' &&
      JSON.stringify(changeObj.text) !== '["  "]' &&
      JSON.stringify(changeObj.text) !== '[">","","</div>"]' &&
      JSON.stringify(changeObj.text) === '["<"]'
    ) {
      this.autoComplete(this.refs.htmlEditor.codeMirror, 'htmlmixed');
    }
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
          /^[A-Za-z0-9]*$/.test(text.charAt(i)) ||
          /[.!?\\-]/.test(text.charAt(i)) ||
          text.charAt(i) === ' '
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

  // 游標位置改變事件
  cursorOnChange = (e, mode) => {
    this.props.updateCursor({
      mode,
      line: e.doc.getCursor().line + 1,
      ch: e.doc.getCursor().ch,
    });
    this.sendMessage(
      JSON.stringify({
        type: 'cursor change',
        m_no: this.props.user.m_no,
        m_name: this.props.user.m_name,
        mode: this.props.editor.mode,
        line: this.props.editor.line,
        ch: this.props.editor.ch,
      }),
    );
  };

  // 根據行數和格數計算css position
  coord = (cm, line, ch) =>
    cm.codeMirror.charCoords(
      {
        line,
        ch,
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
  };

  // 自己上線
  handleWebSocketOnOpen = (msg) => {
    this.sendMessage(
      JSON.stringify({
        type: 'new client',
        m_no: this.props.user.m_no,
        m_name: this.props.user.m_name,
        m_avatar: this.props.user.m_avatar || 'https://i.imgur.com/SiRVSp2.jpg',
      }),
    );
  };

  // 收到socket訊息
  handleWebSocketOnMessage = (msg) => {
    let message;
    // 剛連線會發送Accepted訊息
    if (msg && JSON.parse(msg).Message !== 'Accepted') {
      message = JSON.parse(JSON.parse(msg).Message);
    } else message = JSON.parse(msg).Message;

    // 當接收到有新使用者加入時要跳出通知，並通知他人自己是舊使用者，還要把新使用者加進redux
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
          duration: 15000,
        },
      });
      this.props.updateClient([
        ...this.props.editor.clients,
        {
          m_no: message.m_no,
          m_name: message.m_name,
          m_avatar: message.m_avatar,
          color: colorArr[this.props.editor.clients.length || 1],
        },
      ]);
      this.sendMessage(
        JSON.stringify({
          type: 'old client',
          m_no: this.props.user.m_no,
          m_name: this.props.user.m_name,
          m_avatar:
            this.props.user.m_avatar || 'https://i.imgur.com/SiRVSp2.jpg',
        }),
      );
      this.sendMessage(
        JSON.stringify({
          type: 'on change',
          mode: 'html',
          m_no: this.props.user.m_no,
          m_name: this.props.user.m_name,
          code: this.props.editor.html,
        }),
      );
      this.sendMessage(
        JSON.stringify({
          type: 'on change',
          mode: 'css',
          m_no: this.props.user.m_no,
          m_name: this.props.user.m_name,
          code: this.props.editor.css,
        }),
      );
      this.sendMessage(
        JSON.stringify({
          type: 'on change',
          mode: 'js',
          m_no: this.props.user.m_no,
          m_name: this.props.user.m_name,
          code: this.props.editor.js,
        }),
      );
    }
    // 當得知原本就在線上的使用者要加到redux editor.clients中
    if (
      message.type === 'old client' &&
      message.m_no !== this.props.user.m_no
    ) {
      this.props.updateClient([
        ...this.props.editor.clients,
        {
          m_no: message.m_no,
          m_name: message.m_name,
          m_avatar: message.m_avatar,
          color: colorArr[this.props.editor.clients.length || 1],
        },
      ]);
    }
    // 當收到別人的游標有改動時，要先根據收到的m_no找出他的color，之後建立新的假游標
    if (
      message.type === 'cursor change' &&
      message.m_no !== this.props.user.m_no
    ) {
      var ownColor;
      this.props.editor.clients.map((item, index) => {
        if (item.m_no === message.m_no) {
          ownColor = item.color;
        }
      });
      const elements = document.getElementsByClassName(`${message.m_no}`);
      if (elements.length > 0) {
        for (let i = 0; i <= elements.length; i++) {
          elements[i].remove();
        }
      }
      const cursorbar = document.createElement('div');
      var cm;
      switch (message.mode) {
        case 'html':
          cm = this.refs.htmlEditor;
          break;
        case 'css':
          cm = this.refs.cssEditor;
          break;
        case 'js':
          cm = this.refs.jsEditor;
          break;
      }
      cursorbar.innerHTML = `<div class="cursor_usertag" style="background: ${ownColor}; left: ${
        this.coord(cm, message.line - 1, message.ch).left < 4
          ? 4
          : this.coord(cm, message.line - 1, message.ch).left
      }px;">${
        message.m_name
      }</div><div class="cursorbar" style="border-left: 2px solid ${ownColor}; left: ${
        this.coord(cm, message.line - 1, message.ch).left < 4
          ? 4
          : this.coord(cm, message.line - 1, message.ch).left
      }px;"> </div>`;
      cursorbar.classList.add(`${message.m_no}`);
      cm.codeMirror.doc.setBookmark(
        { line: message.line - 1, ch: message.ch },
        cursorbar,
      );
      for (
        let i = 0;
        i < document.querySelectorAll('.cursor_usertag').length;
        i++
      ) {
        document
          .querySelectorAll('.cursor_usertag')
          [i].closest('.CodeMirror-widget')
          .classList.add('collaborative_widget');
      }
    }
    // 收到code有變化
    if (message.type === 'on change' && message.m_no !== this.props.user.m_no) {
      switch (message.mode) {
        case 'html':
          this.props.updateHtml(message.code);
          this.refs.htmlEditor &&
            this.refs.htmlEditor.codeMirror.doc.setValue(message.code);
          break;
        case 'css':
          this.props.updateCss(message.code);
          this.refs.cssEditor &&
            this.refs.cssEditor.codeMirror.doc.setValue(message.code);
          break;
        case 'js':
          this.props.updateJs(message.code);
          this.refs.jsEditor &&
            this.refs.jsEditor.codeMirror.doc.setValue(message.code);
          break;
      }
    }
  };

  sendMessage(message) {
    this.refWebSocket.sendMessage(message);
  }

  render() {
    const { html, css, js } = this.props.editor;
    const codeMirrorOptions = {
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
        'Ctrl-Q': (cm) => {
          cm.foldCode(cm.getCursor());
        },
        'Ctrl-E': (cm) => this.autoFormat(cm),
        'Ctrl-H': (cm) => this.autoComplete(cm),
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
        {this.props.settings.collborative_mode ? (
          <Websocket
            url={WS_URL}
            onOpen={this.handleWebSocketOnOpen}
            onMessage={this.handleWebSocketOnMessage}
            reconnect
            ref={(Websocket) => {
              this.refWebSocket = Websocket;
            }}
          />
        ) : null}
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
              {/* <Modal
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
                  onClick={() =>
                    this.autoFormat(
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
                  onClick={() =>
                    this.autoFormat(this.refs.cssEditor.codeMirror, 'css')
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
                  onClick={() =>
                    this.autoFormat(this.refs.jsEditor.codeMirror, 'javascript')
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
const mapStateToProps = (store) => ({
  editor: store.editor,
  user: store.user,
  project: store.project,
  settings: store.settings,
});
export default withRouter(connect(mapStateToProps, action)(CodeEditors));
