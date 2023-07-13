// 普通单文件上传并监听progress事件
const uploadFile = (file) => {
  const xhr = new XMLHttpRequest();
  xhr.open('post', '/single', true);
  const formData = new FormData();
  formData.set(file.name, file);
  xhr.send(formData);
  xhr.upload.addEventListener('progress', (event) => {
    if (event.total > 0) {
      const { loaded, total } = event;
      const percent = (loaded / total) * 100
      console.log(percent)
    }
  })
}

// 上传多个文件 => html input的multiple属性

// 目录上传 => html input的webkitdirectory

// 压缩目录上传 => 可以使用使用Jszip来实现上传

// 拖拽上传
/*
* dragEnter
* dragOver
* dragLeave
* drop
* 注意可能需要在事件处理函数中阻止浏览器默认行为。
*/

// 剪切板上传 （图片）
upload.addEventListener('paste', (event) => {
  const items = event.clipboardData && event.clipboardData.items;
  let file = []
  if (items && items.length) {
    items.forEach(item => {
      if (item.type.indexOf('image') !== -1) {
        file.push(item.getAsFile())
      }
    })
  }
})
// https://www.zhangxinxu.com/wordpress/2018/09/ajax-upload-image-from-clipboard/

// 分块上传
/*
  使用Blob.slice()方法，把文件分割成块。对于每一块，可以添加到FormData中来传输
*/
// 块的相关信息可以放在post的数据formData中。
// 也可以放在自定义header字段里
