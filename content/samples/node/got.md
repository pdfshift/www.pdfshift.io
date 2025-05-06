---
language: 'Node'
library: 'Got'
link: 'https://www.npmjs.com/package/got'
---

[Got](https://www.npmjs.com/package/got) is a lightweight and flexible HTTP client for Node.js. It provides a simple API for making HTTP requests with support for Promises and async/await syntax. Got focuses on performance, ease of use, and extensibility.

```javascript
const got = require('got');

async function convert(apiKey, params, endpoint='pdf') {

    if (!['pdf', 'png', 'jpg', 'webp'].includes(endpoint)){
        throw new Error('Invalid endpoint');
    }

    const response = await got.post(`https://api.pdfshift.io/v3/convert/${endpoint}`, {
        headers: { 'X-API-Key': apiKey },
        json: params,
        responseType: 'json'
    });

    if ('filename' in params || 'webhook' in params){
        return response.body;
    }

    return response.rawBody;
}
```

```javascript
(async () => {
    const binary = await convert('sk_XXXXXXXXXXXXXX', { source: 'https://en.wikipedia.org/wiki/REST' });

    require('fs').writeFileSync('result.pdf', binary);
})()
```
