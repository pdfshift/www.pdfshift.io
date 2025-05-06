---
title: "Protecting the generated PDF"
description: "Learn how to protect your generated PDF with encryption for owner and user, and for choosing who can modify, print and/or copy the generated PDF. This guides explains you to do it using Python and the aiohttp library and relies on the PDFShift's API."
language: 'Python'
library: 'aiohttp'
property: 'protection'
output: 'pdf'
related: ['adding-an-image-watermark', 'adding-a-text-watermark']
default: false
---

In this guide, we'll show you how you can protect your generated PDF with encryption for owner and user, and for choosing who can modify, print and/or copy the generated PDF. This guides explains you to do it using Python and the aiohttp library and relies on the PDFShift's API.

One of the most useful feature here is the ability to set a password for the owner and the user of the PDF. This allows you to protect your document from anyone and restrict its access to only a few people.

PDFShift allows you to do this easily by adding the `protection` object to your query.

Here's a sample:

```python
import aiohttp, asyncio, json

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    'protection': {
        'owner_password': 'owner_password',
        'user_password': 'user_password',
        'no_print': True,
        'no_modify': True
    }
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

Adding the `protection` object to your query will tell PDFShift to generate a PDF that will be password protected.

The `protection` object accepts the following parameters:

 * `author` : The name of the author in the PDF metadata.
 * `owner_password`: The password set for the owner.
 * `user_password`: The password set for the user.
 * `no_print`: If set to `True`, the user won't be able to print the PDF. (Only the owner)
 * `no_modify`: If set to `True`, the user won't be able to modify the PDF. (Only the owner)
 * `no_copy`: If set to `True`, the user won't be able to copy the content of the PDF. (Only the owner)


**IMPORTANT**:
It is important to note that most PDF reader don't respect the protection parameter. For instance, if you set the user_password to none (allowing anyone to view the PDF) but set the owner_password and block the modify, print and copy, most PDF reader will still allow user (and not owners) to modify, print and copy the PDF. This is a limitation of the PDF format and not PDFShift.
