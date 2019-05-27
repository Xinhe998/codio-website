/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

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

import './index.scss';


const csstree = require('css-tree');
const gonzales = require('gonzales-pe');
const beautify_js = require('js-beautify'); // also available under "js" export
const beautify_css = require('js-beautify').css;
const beautify_html = require('js-beautify').html;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      html: '<div>hello</div>',
      css: 'body{color: red}.text {font-size: 200px;}',
      js: 'var a=13264;let b="eeffe";',
    };
  }

  componentDidMount() {
    this.runCode();
  }

  componentDidUpdate() {
    this.runCode();
  }

  runCode = () => {
    const { html, css, js } = this.state;
    const ast = csstree.parse(css, {
      onParseError(error) {
        // console.log(error.formattedMessage);
      },
    });
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
        cm.replaceRange(beautify_html(text, {
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
        }), from, to);
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
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      autoCloseBrackets: true,
      autoCloseTags: true,
      extraKeys: {
        'Ctrl-Q': (cm) => {
          cm.foldCode(cm.getCursor());
        },
        'Ctrl-E': cm => this.autoFormat(cm),
      },
      theme: 'material',
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
    return (
      <div className="App">
        <section className="playground">
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <button type="button" onClick={() => this.autoFormat(this.refs.htmlEditor.codeMirror, 'htmlmixed')}>Format</button>
            <CodeMirror
              ref="htmlEditor"
              value={html}
              options={{
                mode: 'htmlmixed',
                ...codeMirrorOptions,
              }}
              onChange={e => this.setState({ html: e })}
            />
          </div>
          <div className="code-editor css-code">
            <div className="editor-header">CSS</div>
            <button type="button" onClick={() => this.autoFormat(this.refs.cssEditor.codeMirror, 'css')}>Format</button>
            <CodeMirror
              ref="cssEditor"
              value={css}
              options={{
                mode: 'css',
                ...codeMirrorOptions,
              }}
              onChange={e => this.setState({ css: e })}
            />
          </div>
          <div className="code-editor js-code">
            <div className="editor-header">JavaScript</div>
            <button type="button" onClick={() => this.autoFormat(this.refs.jsEditor.codeMirror, 'javascript')}>Format</button>
            <CodeMirror
              ref="jsEditor"
              value={js}
              options={{
                mode: 'javascript',
                ...codeMirrorOptions,
              }}
              onChange={e => this.setState({ js: e })}
            />
          </div>
        </section>
        <section className="result">
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
        <section className="consoleBox">
        </section>
      </div>
    );
  }
}

export default Home;
