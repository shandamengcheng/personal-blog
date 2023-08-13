## 文件的处理

- 常见的文件上传，下载操作。
  a 标签，download 属性，如果是文件夹的处理，则是 webkitdirectory 属性。

```javascript
// 上传
// <input type="file" webkitdirectory>

function isBase64(str) {
  try {
    atob(str);
    return true;
  } catch() {
    return false;
  }
}

// 下载的处理
// src链接：Bolb => URL.createObjectURL, base64
function downloadFile(data: Bolb | string, fileName: string) {
  const isBase64 = typeof data === 'string' && isBase64(string);
  const href = isBase64 ? data : URL.createObjectURL(data);
  const a = document.createElement('a');
  a.download = fileName;
  a.href = href;
  a.addEventListener('click', () => {
    if (isBase64) {
      return;
    }
    setTimeout(() =>  URL.revokeObjectURL(href), 30 * 1000)
  })
  a.click();
}
```

> 存在的问题： 只能是对原始文件进行打开，下载操作。且下载的是上传文件的副本。 => 不是open -> edit -> save flow
> new copy, not overwrite

### File System API

## 参考资料

- https://blog.excalidraw.com/browser-fs-access/
- https://developer.chrome.com/articles/file-system-access/
