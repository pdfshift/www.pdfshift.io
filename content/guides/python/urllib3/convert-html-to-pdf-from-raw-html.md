---
title: "Convert an HTML document to PDF from raw HTML"
description: "Learn how to to convert raw HTML document to PDF using Python and the urllib3 library. Our guide will explain you how to quickly convert documents with PDFShift's API."
language: 'Python'
library: 'urllib3'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url']
default: false
---

In this guide, we'll show you how to convert an HTML document to PDF using Python and the urllib3 library.
Providing the HTML document as raw as a lot of great advantages :

 * It avoids PDFShift to make a network request to fetch the HTML document.
 * It allows you to convert HTML documents that are not publicly accessible.
 * It improves the speed of the conversion

If, on top of that, you can provide the styles and javascript also inline in the document (`<style>` and `<script>` tags), it will also drastically reduce the duration of the conversion.

For converting a raw document, we use the same parameter as for the URL, which is the `source` parameter.
All you have to do is provide an HTML document.

Here's an example:

```python
import urllib3, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': '<html><body><h1>This will be a PDF document</h1><p>This will generate a basic PDF to show how you can add raw HTML</body></html>',
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

Providing the `source` parameter as a raw HTML document is by far the best recommended method to convert HTML documents in PDFShift as it reduce the amount of network requests, loading time of each documents (image, css, javascript, etc) and thus improve the conversion time.
