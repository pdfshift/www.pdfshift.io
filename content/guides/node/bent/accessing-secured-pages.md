---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Node and the Bent library. This guide offers detailed steps with code samples in Node and the Bent library, highlighting how you can acces page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Node'
library: 'Bent'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: false
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Node and the Bent library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```javascript
const bent = require('bent')
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    // You can set a basic authentication by passing the "auth" property which contains a username and password
    auth: {
        username: 'user',
        password: 'password'
    }
}

const post = bent('https://api.pdfshift.io/v3/convert/pdf', 'POST', 'json', 200);
const response = await post('', params, {'X-API-Key': apiKey});

if (response.status >= 400) {
    throw new Error(`Request failed with status code ${response.status}: ${response.data}`);
}

const getBuffer = bent('buffer')
fs.writeFileSync('result.pdf', await getBuffer(response));

console.log('The PDF document was generated and saved to result.pdf');
```

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
