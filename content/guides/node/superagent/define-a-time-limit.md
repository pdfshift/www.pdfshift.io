---
title: "Define a time limit"
description: "Learn how to set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted. This guides explains you how to achieve it using Node and the SuperAgent library."
language: 'Node'
library: 'SuperAgent'
property: 'timeout'
output: 'pdf'
related: ['waiting-for-a-custom-element-to-be-ready']
default: false
---

In this guide, we'll show you how you can set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted.

In some cases, this can be useful if you want the request to not be too long and then handle failure on your end depending on the result.

To do so, we use the `timeout` property, which is the maximum time in **seconds** that the request is allowed to take. If the request takes longer than the defined time, the conversion will be aborted.

```javascript
const superagent = require('superagent');
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    timeout: 10
}

let response = await superagent
    .post('https://api.pdfshift.io/v3/convert/pdf')
    .set('X-API-Key', api_key)
    .send(params);

fs.writeFileSync('result.pdf', response.body);

console.log('The PDF document was generated and saved to result.pdf');
```

In the above example, the conversion could fail if the conversion takes longer than 10 seconds.