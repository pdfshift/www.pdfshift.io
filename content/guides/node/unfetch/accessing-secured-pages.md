---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Node and the Unfetch library. This guide offers detailed steps with code samples in Node and the Unfetch library, highlighting how you can acces page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Node'
library: 'Unfetch'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: false
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Node and the Unfetch library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```javascript
const fetch = require('unfetch')
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

const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': api_key
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

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
