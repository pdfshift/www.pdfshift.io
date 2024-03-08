---
title: "Convert an HTML document to PDF from a URL"
description: "Learn how to easily convert HTML documents to PDF from a URL using Node and the NodeFetch library. This how-to guide offers clear Node code examples that show developers how to implement this using the PDFShift API."
language: 'Node'
library: 'NodeFetch'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to convert HTML documents to PDFs using PDFShift's API. This is a straightforward process that can be accomplished with just a few lines of Node code.

```javascript
const fetch = require('node-fetch');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
}

const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'post',
    headers: {
        'Authorization': 'Basic ' + Buffer.from('api:' + api_key).toString('base64'),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
});

if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
}

fs.writeFileSync('result.pdf', response.buffer());

console.log('The PDF document was generated and saved to result.pdf');
```

With this Node script, you can effortlessly convert HTML documents from a URL to PDF files using PDFShift's API. Happy coding!