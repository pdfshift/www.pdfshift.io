---
language: 'Node'
library: 'Bent'
link: 'https://github.com/mikeal/bent'
---

[Bent](https://github.com/mikeal/bent) is a functional programming-style HTTP client for Node.js with support for async/await syntax. It offers a simple and expressive API for making HTTP requests and handling responses using functional programming concepts.

```javascript
const bent = require('bent')

const convert = async (apiKey, params, endpoint='pdf') => {
    if (!['pdf', 'png', 'jpg', 'webp'].includes(endpoint)) {
        throw new Error('Invalid endpoint')
    }

    const post = bent(`https://api.pdfshift.io/v3/convert/${endpoint}`, 'POST', 'json', 200)

    const response = await post('', params, {'X-API-Key': apiKey});
    
    if ('filename' in params || 'webhook' in params) {
        return response;
    }
    
    const getBuffer = bent('buffer');
    const responseBuffer = await getBuffer(response.pdf.url);
    return responseBuffer;
}
```

```javascript
const fs = require('fs');
convert('sk_XXXXXXXXXXXXXX', {'source': 'https://en.wikipedia.org/wiki/REST'})
    .then((binary) => {
        fs.writeFile('result.pdf', binary, 'binary', (err) => {
            if (err) throw err;
        })
    });
```
