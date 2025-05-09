---
title: "Loading Javascript from a URL"
description: "Follow this guide to add custom javascript to your page before converting it to PDF. Using a URL allows you to later be able to change the content of the javascript without having to update the query made to PDFShift. Learn how you can implement this using Node and the Needle library to call the PDFShift's API."
language: 'Node'
library: 'Needle'
property: javascript
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-string', 'loading-css-from-a-url', 'loading-javascript-from-a-string']
default: true
---

In this guide, we'll show you how to load custom javascript as a URL when converting an HTML document to PDF using PDFShift's API. This allows you to add custom Js to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom javascript value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

Moreover, adding a URL can be easier to do than passing the raw javascript content, as it allows you to later modify that javascript without having to modify the query made to PDFShift.

```javascript
const needle = require('needle');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    javascript: 'https://www.example.com/custom.js'
}

needle.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    params,
    {
        headers: { 'X-API-Key': apiKey },
        json: params,
    },
    function(err, resp) {
        if (err) throw err;

        // Write the response body to a local file
        fs.writeFileSync('result.pdf', resp.body, 'binary');

        console.log('The PDF document was generated and saved to result.pdf');
    }
)
```

The `javascript` parameter accepts either a string or a URL. It will be used as the javascript for the page when converting it to PDF. This allows you to set a custom javascript value to adjust the rendering of your page specifically when exporting the document to PDF.