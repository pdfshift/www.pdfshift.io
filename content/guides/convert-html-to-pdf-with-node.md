---
title: Convert any HTML to PDF using Node.JS
description: A guide to get started in converting your HTML documents or URLs to PDF using PDFShift and Node.JS.
language: node
---

![node js](/static/images/guides/node.svg "Node JS Logo")
# How to convert HTML to PDF in Node.js

We recommand you to use a standard request library like "Axios", "Fetch", "Superhuman" or any other that you like.
We will focus here on using Axios, but the API should be straightforward enough to let you implement it in any other library.

## [Documentation](#documentation)

See the full documentation on [PDFShift's documentation](https://docs.pdfshift.io/).

## [Installation](#installation)

Only Axios is required, so if it's not already done, you can install it by doing:

```javascript
npm install --save axios
```

## [Usage](#usage)

To simplify the call to Axios, we made a pretty simple function that can be called to all your needs and will work accross all the type of conversions you'll need to do.

```javascript
// We won't import those two in the future code sample, we will imply they are already imported.
const axios = require('axios');
const fs = require('fs');

function pdfshift(api_key, data) {
    return new Promise((resolve, reject) => {
        let asJson = false
        if ('filename' in data || 'webhook' in data) {
            asJson  = true
        }

        axios.request({
            method: 'post',
            url: 'https://api.pdfshift.io/v3/convert/pdf',
            responseType: (asJson ? 'json' : 'arraybuffer'),
            data: data,
            auth: { username: 'api', password: api_key }
        }).then(resolve).catch(response => {
            // Handle any error that might have occured
            reject(response)
        })
    })
}

// Here's a sample of what to do
pdfshift('your_api_key', { source: 'https://www.example.com' }).then(response => {
    fs.writeFileSync('example.com.pdf', response.data, "binary", function () {})
})
```

We also highly recommend checking for errors after the conversion is made, before processing the document, in order to avoid issues later on.


The `sandbox` parameter allows you to do unlimited conversion, but will add a watermark on top of the generated document.
No credits are deduced from your account when the sandbox mode is on.

```javascript
pdfshift('your_api_key', {
    source: 'https://www.example.com',
    sandbox: true
}).then(response => {
    fs.writeFileSync('example.com.pdf', response.data, "binary", function () {})
})
```

### [With a URL](#with-a-url)

Converting a URL with PDFShift is really easy. All you have to do is send a POST request with the `source` parameter set to the URL, like the following:

```javascript
pdfshift('your_api_key', {
    source: 'https://www.example.com'
}).then(response => {
    fs.writeFileSync('example.com.pdf', response.data, "binary", function () {})
})
```

### [With inline HTML data](#with-inline-html-data)

To convert a raw HTML data with PDFShift, simply send the raw string in the `source` parameter:

```javascript
const data = fs.readFileSync('invoice.html', 'utf8');

pdfshift('your_api_key', {
    source: data
}).then(response => {
    fs.writeFileSync('example.com.pdf', response.data, "binary", function () {})
})
```

### [Save the file to Amazon S3 and get a URL instead](#save-the-file-to-amazon-s3)

By passing the `filename` parameter to your request, you will receive a JSON response instead of the binary PDF, with a `url` key that contains the path to the file stored on Amazon S3.
All files stored on Amazon S3 are kept for two days, then automatically deleted.

```javascript
pdfshift('your_api_key', {
    source: 'https://www.example.com',
    filename: 'example.com.pdf'
}).then(response => {
    // The response contains a few details, including the url at:
    console.log(response.data.url)
})
```

### [Custom HTTP Headers](#custom-http-headers)

You can pass custom HTTP headers, allowing you to adapt to the server handling your source. This can be a custom identification header, changing the language, or anything else.

```javascript
pdfshift('your_api_key', {
    source: 'https://httpbin.org/headers',
    http_headers: {
        'X-Original-Header': 'Awesome Header',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    }
}).then(response => {
    fs.writeFileSync('headers.pdf', response.data, "binary", function () {})
})
```

### [Accessing secured pages](#accessing-secured-pages)

If your `source` requires a BASIC AUTH mechanism, you can either use the custom headers part or use the `auth` parameter from the API that behaves the same.

```javascript
pdfshift('your_api_key', {
    source: 'https://httpbin.org/basic-auth/user/passwd',
    auth: {
        username: 'user',
        password: 'passwd'
    }
}).then(response => {
    fs.writeFileSync('auth.pdf', response.data, "binary", function () {})
})
```

### [Using cookies](#using-cookies)

Cookies might help you access unauthorized areas that aren't restricted by a simple Basic Auth mechanism. You can define as many cookies as you want.

```javascript
pdfshift('your_api_key', {
    source: 'https://httpbin.org/cookies',
    cookies: [
        { name: 'session', value: '4cb496a8-a3eb-4a7e-a704-f993cb6a4dac' }
    ]
}).then(response => {
    fs.writeFileSync('cookies.pdf', response.data, "binary", function () {})
})
```


### [Loading CSS from a URL](#loading-css-from-a-url)

By passing a `css` parameter, you will be able to modify the page with your CSS.
This allows you to customize the rendering of the page.

You can also call multiple CSS by calling a root CSS (like "print.css" in that case) that will call @import in it for each CSS files.

```javascript
pdfshift('your_api_key', {
    source: 'https://example.com',
    css: 'https://www.example.com/public/css/print.css'
}).then(response => {
    fs.writeFileSync('css.pdf', response.data, "binary", function () {})
})
```

### [Loading CSS from a string](#loading-css-from-a-string)

Like for the `source` parameter, you can pass a raw set of CSS rules to the `css` parameter and they will be injected to the loaded document.

```javascript
pdfshift('your_api_key', {
    source: 'https://example.com',
    css: 'a {text-decoration: underline; color: blue}'
}).then(response => {
    fs.writeFileSync('css.pdf', response.data, "binary", function () {})
})
```

### [Adding Watermark](#adding-watermark)

Some documents that you share need a watermark to clearly identify your brand. That's easy with PDFShift:

```javascript
pdfshift('your_api_key', {
    source: 'https://example.com',
    watermark: {
        image: 'https://pdfshift.io/static/img/logo.png',
        offset_x: 50,
        offset_y: '100px',
        rotate: 45
    }
}).then(response => {
    fs.writeFileSync('watermark.pdf', response.data, "binary", function () {})
})
```

### [Custom Header or Footer](#custom-header-or-footer)

You can add some custom header or footer to your generated document. These are often used to indicate the current page, or show the logo of your company on every page.

Note that the header and footer **are not related to the body**. For this reason, the CSS in your body doesn't apply to your header/footer.
By default, the font-size will be really small. You will have to set it manually, like in the following example:

```javascript
pdfshift('your_api_key', {
    source: 'https://example.com',
    footer: {
        source: '<div>Page {{page}} of {{total}}</div>',
        spacing: '50px'
    }
}).then(response => {
    fs.writeFileSync('footer.pdf', response.data, "binary", function () {})
})
```

### [Protecting the generated PDF](#protecting-the-generated-pdf)

Protecting your document is easy with PDFShift. You can specify a password for the user and for the owner.
(The owner will have full rights access while the user will have limited access based on your choice).

Please keep in mind that some PDF reader doesn't respect the rights as long as the user is authenticated.
This means that if you set an empty password for the user, with no rights to print or copy, some PDF reader will ignore this and still allow printing and copying.

This is outside of our capabilities here at PDFShift as we can't enforce a reader to respect PDF's standard.

```javascript
pdfshift('your_api_key', {
    source: 'https://example.com',
    protect: {
        user_password: 'user',
        owner_password: 'owner',
        no_print: true
    }
}).then(response => {
    fs.writeFileSync('footer.pdf', response.data, "binary", function () {})
})
```