---
title: "Adding a custom header or footer"
description: "Discover how to add custom headers or footers to a PDF using Node and the Bent library. This in-depth guide includes Node codes that you can easily follow and quickly generate documents with PDFShift's API."
language: 'Node'
library: 'Bent'
property: header
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers or footers to a PDF using Node and the Bent library.

We'll focus this guide on the `header` parameter, but know that the `footer` parameter works _exactly_ the same way.

The `header` parameter is an object that accepts the following parameters:

 * `source`: The source of the header. It can be a URL or a raw HTML document. You can also provide some variables that we'll explain at the bottom of this guide.
 * `height`: The height of the header. By default, the height is in pixels, but you can also use `mm`, `cm` or `in` as units, like `10mm`.
 * `start_at`: The page number where the header should start. By default, the header will start at the first page.


**NOTE**: You must provide the full data in the header/footer, and not via a network request. Loading files such as external CSS, Js or Fonts won't work in the header or footer.
Instead, we recommend you to embed them in Base64.

Here's an example:

```javascript
const bent = require('bent')
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://en.wikipedia.org/wiki/PDF',
    header: {
        source: '<div>Page {{ page }} over a total of {{ total }}. Made on {{ date }}</div>',
        height: 150,
        start_at: 2
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

The `source` parameter present in the header/footer accepts a set of variables that will be translated when converting the document.

Here are the properties you can use:

 * `{{ title }}`: The title of the document.
 * `{{ url }}`: The URL of the document.
 * `{{ page }}`: The current page number.
 * `{{ total }}`: The total number of pages in the document.
 * `{{ date }}`: The current date in the format `M/D/YY-H:MM am/pm` such as "3/16/24, 2:04 PM".


This will allow you to generate a document that looks more like a printable version of a website, with page number and customized header and footer.