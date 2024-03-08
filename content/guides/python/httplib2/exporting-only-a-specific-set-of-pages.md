---
title: "Exporting only a specific set of pages"
description: "Learn how to export only a specific set of pages from a document using Python and the httplib2 library. This guide offers detailed steps with code samples in Python and the httplib2 library, highlighting how you can export only a specific set of pages from a document using PDFShift's API."
language: 'Python'
library: 'httplib2'
property: 'pages'
output: 'pdf'
default: false
---

In this guide, we'll show you how to export only a specific set of pages from a document using Python and the httplib2 library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to export only a specific set of pages from a document. This can be done by setting the `pages` parameter to the request.

It behaves exactly like the page parameter you can see when you print a document from your browser.

It accepts the following pattern:

 * A number, such as `2`. This will print the page 2
 * A range, such as `2-4`. This will print the pages 2 to 4 (2, 3 and 4)
 * A list, such as `2,4,5,9`. This will print the pages 2, 4, 5 and 9


This way, you can only export the pages that you really need and get immediately the result you want in the PDF, without having to edit it.

Here's an example:

```python
import httplib2, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://en.wikipedia.org/wiki/PDF',
    'pages': '2-4'
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
