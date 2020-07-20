import React, { Component } from 'react';
// 测试富文本
import ReactQuill, { Quill } from 'react-quill';
import { ImageDrop } from './components/imageDrop';

import { options } from './config';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/monokai-sublime.css';

class Editor extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const { value, onChange } = this.props;
    Quill.register('modules/imageDrop', ImageDrop);
    return <ReactQuill {...options} value={value} onChange={onChange} />;
  }
}

export default Editor;
