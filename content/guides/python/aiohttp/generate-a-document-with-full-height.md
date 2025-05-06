---
title: "Generate a document with full height"
description: "Learn to generate full-height documents dynamically with our step-by-step guide. This will allow you to create documents with a dynamic height, based on the content of the document. This guide provides Python code samples using the aiohttp library to help you generate full-height documents with PDFShift's API."
language: 'Python'
library: 'aiohttp'
property: 'format'
output: 'pdf'
default: false
---

In this guide, we'll show you how to generate a document with full height dynamically using Python and the aiohttp library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to generate a document with full height dynamically. This can be done by setting the `format` parameter to the request and passing it a custom "auto" value for the `{height}` part.


```python
import aiohttp, asyncio, json

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'format': '1280xauto'
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