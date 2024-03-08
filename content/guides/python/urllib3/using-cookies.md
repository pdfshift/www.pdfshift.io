---
title: "Using cookies to convert HTML documents to PDF"
description: "Learn how to add custom Cookies when requesting an URL to be converted in PDF with PDFShift's API. It allows you to pursue an active session for instance, that will authenticate the request as a specific user before converting the page to PDF. This guide explains you how using Python and the urllib3 library."
language: 'Python'
library: 'urllib3'
property: 'cookies'
output: 'pdf'
related: ['send-custom-http-headers', 'accessing-secured-pages']
default: false
---

In this comprehensive guide, we will demonstrate the step-by-step process of incorporating custom Cookies into your URL request for PDF conversion using PDFShift's API. By leveraging this functionality, you can maintain an active session, enabling authentication as a specific user before generating the PDF document.

To do so, we'll use the `cookies` parameter when sending a request to PDFShift. It expects a list of dictionnary that contains the name and the value of the cookies (more details after):

```python
import urllib3, json, base64

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://www.example.com',
    # The "cookies" parameter expects a list of dictionnary that contains the name and the value of the cookies
    'cookies': [
        { 'name': 'PHPSESSID', 'value': 'el4ukv0kqbvoirg7nkp4dncpk3' }
    ]
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

The `cookies` parameter accept the following parameters:

 * `name` : The name of the cookie.
 * `value`: The value of the cookie.
 * `secure`: A boolean (defaults to false) that will tell the browser to only send the cookie if the request is being sent over HTTPS.
 * `http_only`: A boolean (defaults to false) that will tell the browser to not expose it to client-side scripts.

Like in our guide to send custom HTTP headers or to access secured pages, this allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.