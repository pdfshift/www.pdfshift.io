---
title: "Using cookies to convert HTML documents to PDF"
description: "Learn how to add custom Cookies when requesting an URL to be converted in PDF with PDFShift's API. It allows you to pursue an active session for instance, that will authenticate the request as a specific user before converting the page to PDF. This guide explains you how using Node and the Got library."
language: 'Node'
library: 'Got'
property: 'cookies'
output: 'pdf'
related: ['send-custom-http-headers', 'accessing-secured-pages']
default: false
---

In this comprehensive guide, we will demonstrate the step-by-step process of incorporating custom Cookies into your URL request for PDF conversion using PDFShift's API. By leveraging this functionality, you can maintain an active session, enabling authentication as a specific user before generating the PDF document.

To do so, we'll use the `cookies` parameter when sending a request to PDFShift. It expects a list of dictionnary that contains the name and the value of the cookies (more details after):

```javascript
const got = require('got');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
apiKey = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    // The "cookies" parameter expects a list of dictionnary that contains the name and the value of the cookies
    cookies: [
        { name: 'PHPSESSID', value: 'el4ukv0kqbvoirg7nkp4dncpk3' }
    ]
}

const response = await got.post('https://api.pdfshift.io/v3/convert/pdf', {
    headers: { 'X-API-Key': apiKey },
    json: params,
    responseType: 'buffer'
});

// Write the buffer as result.pdf
fs.writeFileSync('result.pdf', await response.buffer());

console.log('The PDF document was generated and saved to result.pdf');
```

The `cookies` parameter accept the following parameters:

 * `name` : The name of the cookie.
 * `value`: The value of the cookie.
 * `secure`: A boolean (defaults to false) that will tell the browser to only send the cookie if the request is being sent over HTTPS.
 * `http_only`: A boolean (defaults to false) that will tell the browser to not expose it to client-side scripts.

Like in our guide to send custom HTTP headers or to access secured pages, this allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
