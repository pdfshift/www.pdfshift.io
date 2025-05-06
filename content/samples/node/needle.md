---
language: 'Node'
library: 'Needle'
link: 'https://www.npmjs.com/package/needle'
---

[Needle](https://www.npmjs.com/package/needle) is a lightweight and flexible HTTP client for Node.js. It offers a simple and intuitive API for making HTTP requests and handling responses. Needle supports features like automatic decompression, streaming requests and responses, and multipart/form-data uploads.

```javascript
const needle = require('needle');
const fs = require('fs');

function convert(apiKey, params, endpoint='pdf') {
    if (!['pdf', 'png', 'jpg', 'webp'].includes(endpoint)) {
         throw new Error('Invalid endpoint');
    } 
    
    let options = {
        headers: { 'X-API-Key': apiKey },
        json: params,
    }

    return new Promise((resolve, reject) => {
        needle.post(`https://api.pdfshift.io/v3/convert/${endpoint}`, params, options, function(err, resp) {
            if (err) reject(err);
            if ('filename' in params || 'webhook' in params) {
                // Return in JSON in this case
                resolve(JSON.parse(resp.body));
            }
            resolve(resp.body);
        });
    });
}
```

```javascript
const body = await convert('sk_XXXXXXXXXXXXXX', {source: 'https://en.wikipedia.org/wiki/REST'});

// Write the response body to a local file
fs.writeFile('result.pdf', body, 'binary')
```
