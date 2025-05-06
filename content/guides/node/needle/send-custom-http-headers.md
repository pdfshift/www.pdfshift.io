---
title: "Send custom HTTP headers"
description: "Learn how to add custom HTTP headers when requesting an URL to be converted in PDF with PDFShift's API. It allows you to add specific headers that your backend can check against to authenticate a query before converting it to PDF. This guide explains you how using Node and the Needle library."
language: 'Node'
library: 'Needle'
property: 'http_headers'
output: 'pdf'
related: ['using-cookies', 'accessing-secured-pages']
default: true
---

In this guide, we'll walk you through the process of sending custom HTTP headers when requesting an URL to be converted to PDF using PDFShift's API.

This can be useful to pass custom parameters to your server. It can help for instance to identify from where is coming the request, and add some extra layer of security.

```javascript
const needle = require('needle');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    http_headers: {
        'x-custom-header': 'custom-value',
        Authorization: 'Bearer {token}'  // This allows you to authenticate PDFShift to your service in a custom way
    }
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

This allows you to set specific HTTP headers that will be send along with the request PDFShift will make to your server.
It can be helpful to authenticate the request that your backend can check against before converting it to PDF.