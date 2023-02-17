### calculate file size
```javascript
const calculateFileSize = (data) => {
  const blobArr = Array.isArray(data) ? data : [data]
  const byteSize = new Blob(blobArr).size
  return byteSize
}
```

> use Blob object to calculate file size, it returns number of bits