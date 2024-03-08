---
language: 'Node'
library: 'Axios'
link: 'https://axios-http.com/'
---

[Axios](https://axios-http.com/) is a popular Promise-based HTTP client for Node.js and the browser. It provides an easy-to-use API for making HTTP requests and handling responses asynchronously. Axios supports features like request and response interceptors, automatic JSON data transformation, and request cancellation.

```javascript
const axios = require('axios');

async function convert(api_key, params, endpoint = 'pdf') {
    if (!['pdf', 'png', 'jpg', 'webp'].includes(endpoint)) {
        throw new Error('Invalid endpoint');
    }

    try {
        const response = await axios.post(`https://api.pdfshift.io/v3/convert/${endpoint}`, params, {
            auth: {
                username: 'api',
                password: api_key
            }
        });

        if (params.filename || params.webhook) {
            // Return JSON in this case
            return response.data;
        }

        // Returns the binary data
        return response.data;

    } catch (error) {
        console.error(error);
    }
}
```

```javascript
let binary = await convert('sk_XXXXXXXXXXXXXX', {source: 'https://en.wikipedia.org/wiki/REST'});
require('fs').writeFileSync('result.pdf', binary);
```
