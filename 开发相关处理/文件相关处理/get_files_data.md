### Get Files Data

- if data type is tsv, csv, xlsx, xls, can use sheetJS to get data

```html
pnpm install https://cdn.sheetjs.com/xlsx-0.19.2/xlsx-0.19.2.tgz
```

> https://docs.sheetjs.com/docs/getting-started/installation/nodejs/
> 
> usage: https://docs.sheetjs.com/docs/demos/frontend/react

- if data type is txt, json
```javascript
new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => resolve(reader.result) // text
    // reder.onload = () => {
    //     if (typeof reader.result === 'string') {
    //         resolve(JSON.parse(reader.result))
    //     }
    // } // json
})
```