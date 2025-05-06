---
title: "Loading Javascript from a string"
description: "Follow this guide to learn how to add custom javascript to your page to customize the output of your generated PDF. This allows you to modify elements on the page, add or remove content, etc. This guide uses Python and the urllib3 library and relies on the PDFShift's API."
language: 'Python'
library: 'urllib3'
property: 'javascript'
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-string', 'loading-css-from-a-url', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to load custom javascript code as a given string when converting an HTML document to PDF using PDFShift's API. This allows you to add custom JS to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom JS value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

```python
import urllib3, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'javascript': 'document.querySelector("h1").style.color = "red";'
}

http = urllib3.PoolManager()
response = http.request(
    'POST',
    'https://api.pdfshift.io/v3/convert/pdf',
    headers={
        'Content-Type': 'application/json',
        'X-API-Key': api_key
    },
    body=json.dumps(params).encode('utf-8')
)

if response.status != 200:
    raise ValueError(f"Request failed with status code {response.status}: {response.data.decode('utf-8')}")

with open('result.pdf', 'wb') as f:
    f.write(response.content)

print('The PDF document was generated and saved to result.pdf')
```

The `javascript` parameter accepts either a string or a URL. It will be used as the javascript for the page when converting it to PDF. This allows you to set a custom JS value to adjust the rendering of your page specifically when exporting the document to PDF.