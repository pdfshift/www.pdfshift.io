---
title: "Convert an HTML document to PDF from a URL"
description: "Learn how to easily convert HTML documents to PDF from a URL using Python and the aiohttp library. This how-to guide offers clear Python code examples that show developers how to implement this using the PDFShift API."
language: 'Python'
library: 'aiohttp'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to convert HTML documents to PDFs using PDFShift's API. This is a straightforward process that can be accomplished with just a few lines of Python code.

```python
import aiohttp, asyncio, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
}

response = None
try:
    auth = base64.b64encode(
        'api:{}'.format(api_key).encode('utf-8')
    ).decode('utf-8')

    async with aiohttp.ClientSession() as session:
        async with session.post(
            'https://api.pdfshift.io/v3/convert/pdf',
            headers={'Authorization': f'Basic {auth}'},
            json=params
        ) as response:
            if response.status >= 400:
                raise Exception('Invalid request: {}'.format(await response.text()))

            with open('result.pdf', 'wb') as f:
                f.write(await response.read())

            print('The PDF document was generated and saved to result.pdf')
except asyncio.TimeoutError:
    raise Exception('The request took too long to process')
except aiohttp.ClientError as e:
    raise Exception(f'An error occurred: {e}')
except Exception as e:
    # We highly recommend you to handle exceptions. Often, PDFShift will provide you with a clear explanation about what happened.
    # Moreover, in case of error, no PDF are returned !
    raise Exception(f'An error occurred: {e}')
```

With this Python script, you can effortlessly convert HTML documents from a URL to PDF files using PDFShift's API. Happy coding!