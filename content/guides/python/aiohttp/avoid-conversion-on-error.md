---
title: "Avoid the conversion on error when loading the document"
description: "Learn how to avoid the conversion on error when loading the document using Python and the aiohttp library and relies on the PDFShift's API."
language: 'Python'
library: 'aiohttp'
property: 'raise_for_status'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html']
default: false
---

In this guide, we'll show you how to abort the conversion when loading the distant source does not return a 2XX response.

When you're converting a document, you might want to avoid the conversion on error when loading the document. This can be done by setting the `raise_for_status` parameter to `True` in the request.


```python
import aiohttp, asyncio, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.httpstat.us/404',
    'raise_for_status': True
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

Passing `raise_for_status` to `true` will ensure that if PDFShift can not load your document, the conversion will fail with an error.