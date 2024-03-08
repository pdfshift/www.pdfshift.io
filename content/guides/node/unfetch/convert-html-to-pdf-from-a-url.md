---
title: "Convert an HTML document to PDF from a URL"
description: "Learn how to easily convert HTML documents to PDF from a URL using Node and the Unfetch library. This how-to guide offers clear Node code examples that show developers how to implement this using the PDFShift API."
language: 'Node'
library: 'Unfetch'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to convert HTML documents to PDFs using PDFShift's API. This is a straightforward process that can be accomplished with just a few lines of Node code.

```javascript
const fetch = require('unfetch')
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
}

const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`api:${api_key}`).toString('base64')}`
    },
    body: JSON.stringify(params)
})

// Handle errors:
if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}: ${response.data}`);
}

fs.writeFileSync('result.pdf', await response.blob());

console.log('The PDF document was generated and saved to result.pdf');
```

With this Node script, you can effortlessly convert HTML documents from a URL to PDF files using PDFShift's API. Happy coding!