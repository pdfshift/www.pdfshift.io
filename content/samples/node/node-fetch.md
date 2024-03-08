---
language: 'Node'
library: 'Node Fetch'
link: 'https://www.npmjs.com/package/node-fetch'
---

[Node Fetch](https://www.npmjs.com/package/node-fetch) is a native implementation of the fetch() API for making HTTP requests in Node.js. It provides a modern and standards-compliant API for fetching resources over the network. Node Fetch supports Promises and async/await syntax, making it easy to work with asynchronous code.

```javascript
const fetch = require('node-fetch');

async function convert(api_key, params, endpoint='pdf') {

    if (!['pdf', 'png', 'jpg', 'webp'].includes(endpoint)) {
        throw new Error('Invalid endpoint');
    }
    
    const response = await fetch(`https://api.pdfshift.io/v3/convert/${endpoint}`, {
        method: 'post',
        headers: {
            'Authorization': 'Basic ' + Buffer.from('api:' + api_key).toString('base64'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    if ('filename' in params || 'webhook' in params) {
        //Return in JSON in this case
        return response.json();
    }
    
    //Returns the bytes
    return response.buffer();
}
```

```javascript
convert('sk_XXXXXXXXXXXXXX', {source: 'https://en.wikipedia.org/wiki/REST'})
    .then(buffer => {
        require('fs').writeFile('result.pdf', buffer, () => {});
    });
```
