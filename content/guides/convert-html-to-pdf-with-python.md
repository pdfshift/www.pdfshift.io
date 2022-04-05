---
title: Convert any HTML to PDF using Python
description: A guide to get started in converting your HTML documents or URLs to PDF using PDFShift and Python.
language: python
logo: python-requests.svg
---

# How to convert HTML to PDF in Python

PDFShift provides a powerful API that let you convert any HTML documents to PDF using a simple POST request.
Python provides a great package, called `requests` that will handle all the network issues for us, so we recommend using it.

## [Documentation](#documentation)

See the full documentation on [PDFShift's documentation](https://docs.pdfshift.io/).

## [Requirements](#requirements)

* Python 2.6+
* [Requests](http://docs.python-requests.org/en/master/)

## [Usage](#usage)

Using Python's `requests` package, you can send a POST request toward PDFShift's API by simply passing your `api_key` as the user parameter of a basic authentication.
The `api_key` is the one you received by email when creating your account, or any you created from your dashboard.
Setting it is easy as:

```python
import requests
response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://www.example.com',
        'sandbox': True
    }
)
```

We also highly recommend checking for errors after the conversion is made, before processing the document, in order to avoid issues later on.
This can be easily handled with `requests` by doing the following:

```python
response = requests.post('https://api.pdfshift.io/v3/convert/pdf', json={'source': 'https://www.example.com'}, auth=('api', 'your_api_key'))

# Ensuring everything went fine:
# raise_for_status will raise an exception if the status code is 4xx or 5xx
response.raise_for_status()
```

The `sandbox` parameter allows you to do unlimited conversion, but will add a watermark on top of the generated document.
No credits are deduced from your account when the sandbox mode is on.

### [With a URL](#with-a-url)

Converting an URL with PDFShift is really easy. All you have to do is send a POST request with the `source` parameter set to the URL, like the following:

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={'source': 'https://www.example.com'},
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```

### [With inline HTML data](#with-inline-html-data)

To convert a raw HTML data with PDFShift, simply send the raw string in the `source` parameter:

```python
import requests

document = open('invoice.html', 'r')
document_content = document.read()
document.close()

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={'source': document_content},
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```

### [Save the file to Amazon S3 and get a URL instead](#save-the-file-to-amazon-s3-and-get-a-url-instead)

By passing the `filename` parameter to your request, you will receive a JSON response instead of the binary PDF, with a `url` key that contains the path to the file stored on Amazon S3.
All files stored on Amazon S3 are kept for two days, then automatically deleted.

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://www.example.com',
        'filename': 'result.pdf'
    }
)

response.raise_for_status()

json_response = response.json()
# The URL to the document is at json_response['url]
```

### [Custom HTTP Headers](#custom-http-headers)

You can pass custom HTTP headers, allowing you to adapt to the server handling your source. This can be a custom identification header, changing the language, or anything else.

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://www.example.com',
        'http_headers': {
            'X-Original-Header': 'Awesome value',
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
        }
    },
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```

### [Accessing secured pages](#accessing-secured-pages)

If your `source` requires a BASIC AUTH mechanism, you can either use the custom headers part or use the `auth` parameter from the API that behaves the same.

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://httpbin.org/basic-auth/user/passwd',
        'auth': {
            'username': 'user',
            'password': 'passwd'
        }
    },
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```

### [Using cookies](#using-cookies)

Cookies might help you access unauthorized areas that aren't restricted by a simple Basic Auth mechanism. You can define as many cookies as you want.

```python
import requests

# cookies is a list of dict
# That way, you can add as many dict (cookie) as you want.
response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://httpbin.org/cookies',
        'cookies': [{'name': 'session', 'value': '4cb496a8-a3eb-4a7e-a704-f993cb6a4dac'}]
    },
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```


### [Loading CSS from a URL](#loading-css-from-a-url)

By passing a `css` parameter, you will be able to modify the page with your CSS.
This allows you to customize the rendering of the page.

You can also call multiple CSS by calling a root CSS (like "print.css" in that case) that will call @import in it for each CSS files.

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://www.example.com',
        'css': 'https://www.example.com/public/css/print.css'
    },
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```

### [Loading CSS from a string](#loading-css-from-a-string)

Like for the `source` parameter, you can pass a raw set of CSS rules to the `css` parameter and they will be injected to the loaded document.

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://www.example.com',
        'css': 'a {text-decoration: underline; color: blue}'
    },
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```

### [Adding Watermark](#adding-watermark)

Some documents that you share need a watermark to clearly identify your brand. That's easy with PDFShift:

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://www.example.com',
        'watermark': {
            'image': 'https://pdfshift.io/images/logo.png',
            'offset_x': 50,
            'offset_y': '100px',
            'rotate': 45
        }
    },
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```

### [Custom Header or Footer](#custom-header-or-footer)

You can add some custom header or footer to your generated document. These are often used to indicate the current page, or show the logo of your company on every page.

Note that the header and footer **are not related to the body**. For this reason, the CSS in your body doesn't apply to your header/footer.
By default, the font-size will be really small. You will have to set it manually, like in the following example:

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://www.example.com',
        'footer': {
            'source': '<div style="font-size: 12px">Page {{ "{{page}}" }} of {{ "{{total}}" }}</div>',
            'spacing': '50px'
        }
    },
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```

### [Protecting the generated PDF](#protecting-the-generated-pdf)

Protecting your document is easy with PDFShift. You can specify a password for the user and for the owner.
(The owner will have full rights access while the user will have limited access based on your choice).

Please keep in mind that some PDF reader doesn't respect the rights as long as the user is authenticated.
This means that if you set an empty password for the user, with no rights to print or copy, some PDF reader will ignore this and still allow printing and copying.

This is outside of our capabilities here at PDFShift as we can't enforce a reader to respect PDF's standard.

```python
import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={
        'source': 'https://www.example.com',
        'protection': {
            'user_password': 'user',
            'owner_password': 'owner',
            'no_print': True
        }
    },
    stream=True
)

response.raise_for_status()

with open('result.pdf', 'wb') as output:
    for chunk in response.iter_content(chunk_size=1024):
        output.write(chunk)
```