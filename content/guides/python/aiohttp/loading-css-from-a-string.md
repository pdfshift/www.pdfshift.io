---
title: "Loading CSS from a string"
description: "Follow this guide to load custom CSS as a given string when converting an HTML document to PDF with PDFShift's API. This guide provides Python code samples with the aiohttp library."
language: 'Python'
library: 'aiohttp'
property: 'css'
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-url', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to load custom CSS as a given string when converting an HTML document to PDF using PDFShift's API. This allows you to add custom CSS to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

```python
import aiohttp, asyncio, json

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'css': 'body { background-color: #f00; }'
}

response = None
try:
    async with aiohttp.ClientSession() as session:
        async with session.post(
            'https://api.pdfshift.io/v3/convert/pdf',
            headers={'X-API-Key': api_key},
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

The `css` parameter accepts either a string or a URL. It will be used as the CSS for the page when converting it to PDF. This allows you to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.