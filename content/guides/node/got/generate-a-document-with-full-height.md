---
title: "Generate a document with full height"
description: "Learn to generate full-height documents dynamically with our step-by-step guide. This will allow you to create documents with a dynamic height, based on the content of the document. This guide provides Node code samples using the Got library to help you generate full-height documents with PDFShift's API."
language: 'Node'
library: 'Got'
property: format
output: 'pdf'
default: false
---

In this guide, we'll show you how to generate a document with full height dynamically using Node and the Got library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to generate a document with full height dynamically. This can be done by setting the `format` parameter to the request and passing it a custom "auto" value for the `{height}` part.


```javascript
const got = require('got');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
apiKey = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    format: '1280xauto'
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

The format parameter can accept various values, such as 'Letter', 'Legal', 'Tabloid', 'Ledger', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'.

But it can also accept a custom values that is defined per the width and height as follow: `{width}x{height}`

Both `width` and `height` are pixel value by default, but if you precise the unit (in "cm", "mm", "in" or "pt"). That unit will be used instead.

For instance, you can set a format of:

```json
{
    "source": "https://www.example.com",
    "format": "21cmx29,7cm"
}
```

Now, if you want a "liquid" height, which will analyze the height of the page and use it as your format, you can set the `{height}` value to `auto`.
So, instead of setting a fixed height such as `format: '1280x1024'`, you can set `format: '1280xauto'` and the height will be calculated based on the content of the page.