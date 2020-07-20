export class ImageDrop {
  constructor(quill) {
    this.quill = quill;
    this.quill.root.addEventListener('drop', this.handleDrop, false);
    this.quill.root.addEventListener('paste', this.handlePaste, false);
    // this.quill.root.addEventListener('click', this.handleImgClick, false)
  }

  readFiles = (files, callback) => {
    [].forEach.call(files, (file) => {
      if (
        !file.type.match(
          /^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i
        )
      ) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        callback(e.target.result);
      };
      const blob = file.getAsFile ? file.getAsFile() : file;
      if (blob instanceof Blob) {
        reader.readAsDataURL(blob);
      }
    });
  };

  insert = (dataUrl) => {
    const selection = this.quill.getSelection();
    const index = (selection || {}).index || this.quill.getLength();
    this.quill.insertEmbed(index, 'image', dataUrl, 'user');
    // 插入后将光标移动到插入后的位置
    this.quill.setSelection(index + 1);
  };

  setRange = (e, imputSelection) => {
    if (document.caretRangeFromPoint) {
      const selection = imputSelection || document.getSelection();
      // 方法返回一个 Range 对象
      const range = document.caretRangeFromPoint(e.clientX, e.clientY);
      if (selection && range) {
        // 设置选中的区域
        selection.setBaseAndExtent(
          range.startContainer,
          range.startOffset,
          range.startContainer,
          range.startOffset
        );
      }
    }
  };

  handleDrop = (e) => {
    e.preventDefault();
    const files =
      e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length;
    if (files) {
      // this.setRange(e)
      this.readFiles(e.dataTransfer.files, this.insert);
    }
  };

  handlePaste = (e) => {
    if (
      e.clipboardData &&
      e.clipboardData.items[0].type.indexOf('image') > -1
    ) {
      this.readFiles(e.clipboardData.items, (dataUrl) => {
        setTimeout(() => {
          this.insert(dataUrl);
        }, 0);
      });
    }
  };

  handleImgClick = (e) => {
    const target = e.target;
    if (target.tagName === 'IMG') {
      const selection = document.getSelection();
      selection.removeAllRanges();
      const range = document.createRange();
      range.selectNode(target);
      selection.addRange(range);
    }
  };
}
