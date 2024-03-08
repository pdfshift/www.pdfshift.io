---
title: "Avoid the conversion on error when loading the document"
description: "Learn how to avoid the conversion on error when loading the document using Python and the urllib3 library and relies on the PDFShift's API."
language: 'Python'
library: 'urllib3'
property: 'raise_for_status'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html']
default: false
---

In this guide, we'll show you how to abort the conversion when loading the distant source does not return a 2XX response.

When you're converting a document, you might want to avoid the conversion on error when loading the document. This can be done by setting the `raise_for_status` parameter to `True` in the request.


```python
import urllib3, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.httpstat.us/404',
    'raise_for_status': True
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

Passing `raise_for_status` to `true` will ensure that if PDFShift can not load your document, the conversion will fail with an error.