---
title: "Avoid the conversion on error when loading the document"
description: "Learn how to avoid the conversion on error when loading the document using Node and the NodeFetch library and relies on the PDFShift's API."
language: 'Node'
library: 'NodeFetch'
property: raise_for_status
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html']
default: false
---

In this guide, we'll show you how to abort the conversion when loading the distant source does not return a 2XX response.

When you're converting a document, you might want to avoid the conversion on error when loading the document. This can be done by setting the `raise_for_status` parameter to `True` in the request.


```javascript
const fetch = require('node-fetch');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.httpstat.us/404',
    raise_for_status: True
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

Passing `raise_for_status` to `true` will ensure that if PDFShift can not load your document, the conversion will fail with an error.