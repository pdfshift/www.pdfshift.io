---
language: 'Node'
library: 'Unfetch'
link: 'https://www.npmjs.com/package/unfetch'
---

[Unfetch](https://www.npmjs.com/package/unfetch) is a lightweight and minimalistic HTTP client for Node.js and the browser. It offers a simple API for making HTTP requests and handling responses with minimal overhead. Unfetch focuses on simplicity, performance, and ease of use.

```javascript
const fetch = require('unfetch')

async function convert(api_key, params, endpoint = 'pdf') {
    const validEndpoints = ['pdf', 'png', 'jpg', 'webp'];
    if (!validEndpoints.includes(endpoint)) {
        throw new Error('Invalid endpoint');
    }

    const response = await fetch(`https://api.pdfshift.io/v3/convert/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': api_key
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    if ('filename' in params || 'webhook' in params) {
        return await response.json();
    }

    return Buffer.from(await response.blob(), 'utf8');
}
```

```javascript
const binary = await convert('sk_XXXXXXXXXXXXXX', { 'source': 'https://en.wikipedia.org/wiki/REST' });
require('fs').promises.writeFile('result.pdf', binary);
```
