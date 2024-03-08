---
title: "Waiting for a custom element to be ready"
description: "Learn how to set up a custom javascript function that will waits for a specific condition to become true before allowing the conversion to happen. This is very interesting for waiting on charts to be generated, or custom fonts to be loaded. With PDFShift's API, this can easily be done using Node and the Unfetch library."
language: 'Node'
library: 'Unfetch'
property: 'wait_for'
output: 'pdf'
related: ['define-a-time-limit', 'loading-javascript-from-a-string']
default: false
---

The `wait_for` parameter is one of the most powerful feature of PDFShift. It allows you to control when the document is ready to be converted to PDF.

For instance, you might need the `wait_for` parameter to wait on your charts to be visible.

It makes sense because from our engine point of view, all the resources are loaded so the conversion to PDF can be executed. But from your page stand point, even though everything is loaded, _not everything is rendered_!

So by using the `wait_for` parameter, you can tell PDFShift to wait for a specific condition to be true before allowing the conversion to happen.

That property **expects a string which points to a global function**.

For instance, if in your HTML page, you have the following script:

```javascript
<script>
function isPageReady() {
    return document.getElementById('chart').clientHeight > 0;
}
</script>
```

You can set the `wait_for` parameter to `isPageReady` and PDFShift will wait for the `isPageReady` function to return `true` before converting the page to PDF.


```javascript
const fetch = require('unfetch')
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    wait_for: 'isPageReady'
}

const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`api:${api_key}`).toString('base64')}`
    },
    body: JSON.stringify(params)
})

// Handle errors:
if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}: ${response.data}`);
}

fs.writeFileSync('result.pdf', await response.blob());

console.log('The PDF document was generated and saved to result.pdf');
```

In case your page doesn't have the javascript function available, but you still need to wait on some elements to be rendered before continuing the conversion, you can add javascript code directly in the request and use it at the same time:

```javascript
const fetch = require('unfetch')
const fs = require('fs');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    javascript: 'let isFontReady = false; document.fonts.ready.then(() => isFontReady = true); function isPageReady() { return isFontReady; }',
    wait_for: 'isPageReady'
}

const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`api:${api_key}`).toString('base64')}`
    },
    body: JSON.stringify(params)
})

// Handle errors:
if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}: ${response.data}`);
}

fs.writeFileSync('result.pdf', await response.blob());

console.log('The PDF document was generated and saved to result.pdf');
```

The above script will wait for all fonts to be ready before returning `true` for the `isPageReady` function.
PDFShift will then wait for the fonts to be ready, via the `isPageReady`, before converting the page to PDF.