---
title: "Generate a document with full height"
description: "Learn to generate full-height documents dynamically with our step-by-step guide. This will allow you to create documents with a dynamic height, based on the content of the document. This guide provides Python code samples using the urllib3 library to help you generate full-height documents with PDFShift's API."
language: 'Python'
library: 'urllib3'
property: 'format'
output: 'pdf'
default: false
---

In this guide, we'll show you how to generate a document with full height dynamically using Python and the urllib3 library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to generate a document with full height dynamically. This can be done by setting the `format` parameter to the request and passing it a custom "auto" value for the `{height}` part.


```python
import urllib3, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'format': '1280xauto'
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

The format parameter can accept various values, such as 'Letter', 'Legal', 'Tabloid', 'Ledger', 'A0', 'A1', 'A2', 'A3', 'A4', 'A5'.

But it can also accept a custom values that is defined per the width and height as follow: `{width}x{height}`

Both `width` and `height` are pixel value by default, but if you precise the unit (in "cm", "mm", "in" or "pt"). That unit will be used instead.

For instance, you can set a format of:

```json
{
    "source": "https://www.example.com",
    "format": "21cmx29,7cm"
}
```

Now, if you want a "liquid" height, which will analyze the height of the page and use it as your format, you can set the `{height}` value to `auto`.
So, instead of setting a fixed height such as `'format': '1280x1024'`, you can set `'format': '1280xauto'` and the height will be calculated based on the content of the page.