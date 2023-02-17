### convert file between base64

#### file to base64

```javascript
new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(file)
})
```

Sometimes, we may want to get origin File type file through file info, such as name, MIME type, and file base64 data.

#### base64 to origin File
````javascript
/*
* dataUrl: complete base64 string, 
* filename: file name string
 */
const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataurl.split(",")
    const mime = arr[0].match(/:(.*?);/)?.[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

//Usage example:
const file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
console.log(file);
````
> https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f/38935990#38935990