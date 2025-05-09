---
title: "Exporting only a specific set of pages"
description: "Learn how to export only a specific set of pages from a document using Node and the SuperAgent library. This guide offers detailed steps with code samples in Node and the SuperAgent library, highlighting how you can export only a specific set of pages from a document using PDFShift's API."
language: 'Node'
library: 'SuperAgent'
property: pages
output: 'pdf'
default: false
---

In this guide, we'll show you how to export only a specific set of pages from a document using Node and the SuperAgent library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to export only a specific set of pages from a document. This can be done by setting the `pages` parameter to the request.

It behaves exactly like the page parameter you can see when you print a document from your browser.

It accepts the following pattern:

 * A number, such as `2`. This will print the page 2
 * A range, such as `2-4`. This will print the pages 2 to 4 (2, 3 and 4)
 * A list, such as `2,4,5,9`. This will print the pages 2, 4, 5 and 9


This way, you can only export the pages that you really need and get immediately the result you want in the PDF, without having to edit it.

Here's an example:

```javascript
const superagent = require('superagent');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://en.wikipedia.org/wiki/PDF',
    pages: '2-4'
}

let response = await superagent
    .post('https://api.pdfshift.io/v3/convert/pdf')
    .set('X-API-Key', api_key)
    .send(params);

fs.writeFileSync('result.pdf', response.body);

console.log('The PDF document was generated and saved to result.pdf');
```
