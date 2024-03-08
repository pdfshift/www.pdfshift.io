---
language: 'Node'
library: 'SuperAgent'
link: 'https://www.npmjs.com/package/superagent'
---

[SuperAgent](https://www.npmjs.com/package/superagent) is a feature-rich HTTP client for Node.js and the browser. It provides an intuitive API for making HTTP requests and handling responses. Superagent supports features like request chaining, form data encoding, and streaming responses.

```javascript
const superagent = require('superagent');

async function convert(api_key, params, endpoint='pdf') {
    if (!['pdf', 'png', 'jpg', 'webp'].includes(endpoint)) {
        throw new Error('Invalid endpoint');
    }

    let response = await superagent
        .post(`https://api.pdfshift.io/v3/convert/${endpoint}`)
        .auth('api', api_key)
        .send(params);
        
    if ('filename' in params || 'webhook' in params) {
        // Return in JSON in that case
        return response.body;
    }

    // Returns the binary content
    return response.body;
}
```

```javascript
const binary = await convert('sk_XXXXXXXXXXXXXX', {source: 'https://en.wikipedia.org/wiki/REST'})
require('fs').writeFileSync('result.pdf', binary);
```
