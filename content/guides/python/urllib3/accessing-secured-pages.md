---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Python and the urllib3 library. This guide offers detailed steps with code samples in Python and the urllib3 library, highlighting how you can acces page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Python'
library: 'urllib3'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: false
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Python and the urllib3 library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```python
import urllib3, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    # You can set a basic authentication by passing the "auth" property which contains a username and password
    'auth': {
        'username': 'user',
        'password': 'password'
    }
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
    f.write(response.data)

print('The PDF document was generated and saved to result.pdf')
```

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
