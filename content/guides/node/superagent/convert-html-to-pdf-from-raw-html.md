---
title: "Convert an HTML document to PDF from raw HTML"
description: "Learn how to to convert raw HTML document to PDF using Node and the SuperAgent library. Our guide will explain you how to quickly convert documents with PDFShift's API."
language: 'Node'
library: 'SuperAgent'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
default: false
---

In this guide, we'll show you how to convert an HTML document to PDF using Node and the SuperAgent library.
Providing the HTML document as raw as a lot of great advantages :

 * It avoids PDFShift to make a network request to fetch the HTML document.
 * It allows you to convert HTML documents that are not publicly accessible.
 * It improves the speed of the conversion

If, on top of that, you can provide the styles and javascript also inline in the document (`<style>` and `<script>` tags), it will also drastically reduce the duration of the conversion.

For converting a raw document, we use the same parameter as for the URL, which is the `source` parameter.
All you have to do is provide an HTML document.

Here's an example:

```javascript
const superagent = require('superagent');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: '<html><body><h1>This will be a PDF document</h1><p>This will generate a basic PDF to show how you can add raw HTML</body></html>',
}

let response = await superagent
    .post('https://api.pdfshift.io/v3/convert/pdf')
    .set('X-API-Key', api_key)
    .send(params);

fs.writeFileSync('result.pdf', response.body);

console.log('The PDF document was generated and saved to result.pdf');
```

Providing the `source` parameter as a raw HTML document is by far the best recommended method to convert HTML documents in PDFShift as it reduce the amount of network requests, loading time of each documents (image, css, javascript, etc) and thus improve the conversion time.
