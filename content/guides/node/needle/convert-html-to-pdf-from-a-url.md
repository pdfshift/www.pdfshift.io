---
title: "Convert an HTML document to PDF from a URL"
description: "Learn how to easily convert HTML documents to PDF from a URL using Node and the Needle library. This how-to guide offers clear Node code examples that show developers how to implement this using the PDFShift API."
language: 'Node'
library: 'Needle'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'avoid-conversion-on-error']
default: true
---

In this guide, we'll show you how to convert HTML documents to PDFs using PDFShift's API. This is a straightforward process that can be accomplished with just a few lines of Node code.

```javascript
const needle = require('needle');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
}

needle.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    params,
    {
        username: 'api',
        password: apiKey,
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

With this Node script, you can effortlessly convert HTML documents from a URL to PDF files using PDFShift's API. Happy coding!