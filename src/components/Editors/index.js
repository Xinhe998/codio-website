/* eslint-disable no-eval */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import { Hook, Decode } from 'console-feed';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import action from '../../actions';
import TabPanel from '../TabPanel';
import ConsoleBox from '../ConsoleBox';
import Resizer from '../Resizer';

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

const csstree = require('css-tree');
const gonzales = require('gonzales-pe');
const beautify_js = require('js-beautify'); // also available under "js" export
const beautify_css = require('js-beautify').css;
const beautify_html = require('js-beautify').html;

class Editors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: [],
    };
    this.delayHtmlOnChange = _.throttle(this.htmlEditorOnChange, 3000);
    this.delayCssOnChange = _.throttle(this.cssEditorOnChange, 3000);
    this.delayJsOnChange = _.throttle(this.jsEditorOnChange, 3000, {
      leading: false,
    });
    this.sidebarWidth = 0.6;
  }

  componentDidMount() {
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
    // const ast = csstree.parse(css, {
    //   onParseError(error) {
    //     // console.error(error.formattedMessage);
    //   },
    // });
    // console.log(csstree.generate(ast));
    // const parseTree = gonzales.parse(css, { syntax: 'scss' });
    // console.log('!!!', parseTree.toString());

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
      window.alert = function () {}; // 讓alert不要執行兩次
      eval(js);
      this.runCode();
    } catch (e) {
      console.error(e);
    }
  };

  jsEditorOnChange = (e, changeObj) => {
    this.props.addJavascript(e);
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
    this.props.addCss(e);
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
    this.props.addHtml(e);
    if (
      JSON.stringify(changeObj.text) !== '[""]'
      && JSON.stringify(changeObj.text) !== '["",""]'
      && JSON.stringify(changeObj.text) !== '["  "]'
      && JSON.stringify(changeObj.text) !== '[">","","</div>"]'
    ) {
      this.autoComplete(this.refs.htmlEditor.codeMirror, 'htmlmixed');
    }
  };

  handleResize = (diff) => {
    let elementNewWidth = 0;
    elementNewWidth = this.sidebarWidth - diff;
    // elementNewWidth = Math.round(elementNewWidth * 10000) / 10000;
    console.log(elementNewWidth);
    this.sidebarWidth = elementNewWidth;
  };

  handleResizeStart = () => {};

  handleResizeEnd = () => {
    console.log('resize end');
  };

  render() {
    const { html, css, js } = this.props.editor;
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
    };
    const leftStyle = {
      width: `${this.sidebarWidth * 100}%`,
      minWidth: '1%',
    };
    const rightStyle = {
      width: `${(1 - this.sidebarWidth) * 100}%`,
      minWidth: '1%',
    };
    return (
      <div className="playground">
        <TabPanel
          selected={this.props.currentActiveTab === 'html'}
          style={leftStyle}
        >
          <div className="code-editor html-code">
            <div className="editor-header">
              <span className="editor-header-title">HTML</span>
              <button
                type="button"
                className="formatBtn"
                onClick={() => this.autoFormat(this.refs.htmlEditor.codeMirror, 'htmlmixed')
                }
              >
                Format
              </button>
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
            />
          </div>
        </TabPanel>
        <TabPanel
          selected={this.props.currentActiveTab === 'css'}
          style={leftStyle}
        >
          <div className="code-editor css-code">
            <div className="editor-header">
              <span className="editor-header-title">CSS</span>
              <button
                type="button"
                className="formatBtn"
                onClick={() => this.autoFormat(this.refs.cssEditor.codeMirror, 'css')
                }
              >
                Format
              </button>
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
            />
          </div>
        </TabPanel>
        <TabPanel
          selected={this.props.currentActiveTab === 'js'}
          style={leftStyle}
        >
          <div className="code-editor js-code">
            <div className="editor-header">
              <span className="editor-header-title">JavaScript</span>
              <button
                type="button"
                className="formatBtn"
                onClick={() => this.autoFormat(this.refs.jsEditor.codeMirror, 'javascript')
                }
              >
                Format
              </button>
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
            />
          </div>
        </TabPanel>
        <TabPanel
          selected={this.props.currentActiveTab === 'logs'}
          style={leftStyle}
        >
          <div className="code-editor logs-code">
            <div className="editor-header">Console</div>
            <ConsoleBox logs={this.state.logs} />
          </div>
        </TabPanel>

        <div className="result" style={rightStyle}>
          {/* <Resizer
            direction="x"
            onResizeStart={this.handleResizeStart}
            onResize={this.handleResize}
            onResizeEnd={this.handleResizeEnd}
          > */}
            <iframe title="result" className="iframe" ref="iframe" />
          {/* </Resizer> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  editor: store.editor,
  user: store.user,
});
export default withRouter(
  connect(
    mapStateToProps,
    action,
  )(Editors),
);
