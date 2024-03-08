---
title: "Convert an HTML document to PDF from a URL"
description: "Learn how to easily convert HTML documents to PDF from a URL using Python and the requests library. This how-to guide offers clear Python code examples that show developers how to implement this using the PDFShift API."
language: 'Python'
library: 'requests'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'avoid-conversion-on-error']
default: true
---

Converting HTML documents to PDFs using PDFShift's API is a straightforward process.
With just a few lines of Python code, you can seamlessly convert a URL into a PDF document.

```python
import requests

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
}

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', api_key),
    json=params
)
response.raise_for_status()

with open('result.pdf', 'wb') as f:
    f.write(response.content)

print('The PDF document was generated and saved to result.pdf')
```

With this Python script, you can effortlessly convert HTML documents from a URL to PDF files using PDFShift's API. Happy coding!