---
title: "Convert an HTML document to PDF from a URL"
description: "Learn how to easily convert HTML documents to PDF from a URL using Python and the httplib2 library. This how-to guide offers clear Python code examples that show developers how to implement this using the PDFShift API."
language: 'Python'
library: 'httplib2'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to convert HTML documents to PDFs using PDFShift's API. This is a straightforward process that can be accomplished with just a few lines of Python code.

```python
import httplib2, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
}

http = httplib2.Http()
response, content = http.request(
    'https://api.pdfshift.io/v3/convert/pdf',
    method='POST',
    body=json.dumps(params),
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.b64encode(f'api:{api_key}'.encode('utf-8')).decode('utf-8')
    }
)

if response.status >= 400:
    raise ValueError(f"Request failed with status code {response.status}: {content.decode('utf-8')}")

with open('result.pdf', 'wb') as f:
    f.write(content)

print('The PDF document was generated and saved to result.pdf')
```

With this Python script, you can effortlessly convert HTML documents from a URL to PDF files using PDFShift's API. Happy coding!