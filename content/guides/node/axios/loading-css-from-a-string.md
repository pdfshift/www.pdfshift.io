---
title: "Loading CSS from a string"
description: "Follow this guide to load custom CSS as a given string when converting an HTML document to PDF with PDFShift's API. This guide provides Node code samples with the Axios library."
language: 'Node'
library: 'Axios'
property: css
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-url', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: true
---

In this guide, we'll show you how to load custom CSS as a given string when converting an HTML document to PDF using PDFShift's API. This allows you to add custom CSS to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

```javascript
const axios = require('axios');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    css: 'body { background-color: #f00; }'
}

const response = await axios.post(
    `https://api.pdfshift.io/v3/convert/pdf`,
    params,
    {
        headers: { 'X-API-Key': api_key }
    }
});

// Handle errors:
if (response.status >= 400) {
    throw new Error(`Request failed with status code ${response.status}: ${response.data}`);
}

fs.writeFileSync('result.pdf', response.data);

console.log('The PDF document was generated and saved to result.pdf');
```

The `css` parameter accepts either a string or a URL. It will be used as the CSS for the page when converting it to PDF. This allows you to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.