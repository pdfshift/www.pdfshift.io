---
title: "Loading CSS from a URL"
description: "This guides shows you how to add a custom CSS from an URL onto your document to customize the output of your generated PDF. Follow this guides to learn how to do it using Python and the urllib3 library and see how it can quickly be implemented using the PDFShift's API."
language: 'Python'
library: 'urllib3'
property: 'css'
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-string', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to load custom CSS as a URL when converting an HTML document to PDF using PDFShift's API. This allows you to add custom CSS to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

Moreover, adding a URL can be easier to do than passing the raw CSS content, as it allows you to later modify that CSS without having to modify the query made to PDFShift.

```python
import urllib3, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'css': "https://www.example.com/public/style/print.css"
}

http = urllib3.PoolManager()
response = http.request(
    'POST',
    'https://api.pdfshift.io/v3/convert/pdf',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Basic {}'.format(
            base64.b64encode('api:{}'.format(api_key).encode('utf-8')).decode('utf-8')
        )
    },
    body=json.dumps(params).encode('utf-8')
)

if response.status != 200:
    raise ValueError(f"Request failed with status code {response.status}: {response.data.decode('utf-8')}")

with open('result.pdf', 'wb') as f:
    f.write(response.content)

print('The PDF document was generated and saved to result.pdf')
```

The `css` parameter accepts either a string or a URL. It will be used as the CSS for the page when converting it to PDF. This allows you to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.