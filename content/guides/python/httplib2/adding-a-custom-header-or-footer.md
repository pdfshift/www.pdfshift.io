---
title: "Add a header or footer to a PDF"
description: "Add a header, or a footer with page numbers, to a PDF in Python: one extra object in your httplib2 request to PDFShift's API. Tested code."
language: 'Python'
library: 'httplib2'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

To add a header or footer to a PDF in Python, send your page to PDFShift's API with httplib2 and include a `header` or `footer` object in the request. Each one is a small piece of HTML of its own, printed at the top or bottom of each page, and it can show the page number, the total number of pages, the date or the document's title.

## Add a header to a PDF in Python

The `header` parameter is an object that accepts the following parameters:

 * `source`: The source of the header. It can be a URL or a raw HTML document. You can also provide some variables that we'll explain at the bottom of this guide.
 * `height`: The height of the header. By default, the height is in pixels, but you can also use `mm`, `cm` or `in` as units, like `10mm`.
 * `start_at`: The page number where the header should start. By default, the header will start at the first page.

The `footer` parameter takes the same three values and works exactly the same way, only at the bottom of the page.

**NOTE**: You must provide the full data in the header/footer, and not via a network request. Loading files such as external CSS, Js or Fonts won't work in the header or footer.
Instead, we recommend you to embed them in Base64.

Here's an example that prints a header from the second page on:

```python
import httplib2, json

# You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    'source': 'https://en.wikipedia.org/wiki/PDF',
    'header': {
        'source': '<div>Page {{ page }} over a total of {{ total }}. Made on {{ date }}</div>',
        'height': 150,
        'start_at': 2
    }
}

http = httplib2.Http()
response, content = http.request(
    'https://api.pdfshift.io/v3/convert/pdf',
    method='POST',
    body=json.dumps(params),
    headers={
        'Content-Type': 'application/json',
        'X-API-Key': api_key
    }
)

if response.status >= 400:
    raise ValueError(f"Request failed with status code {response.status}: {content.decode('utf-8')}")

with open('result.pdf', 'wb') as f:
    f.write(content)

print('The PDF document was generated and saved to result.pdf')
```

We ran it on November 25, 2026 (httplib2 0.32.1) and got the Wikipedia article back as a 26-page PDF: no header on page 1, then "Page 2 over a total of 26. Made on 11/25/26, 3:50 PM" at the top of page 2.

::::guide-figure{caption="Pages 1 and 2 of the PDF this code returned for the Wikipedia article on PDF. The badge is the watermark on calls without a key. Our test, November 25, 2026."}
:::guide-page-pair{:names='["Page 1", "Page 2"]'}
![Page 1 of the PDF: the Wikipedia article on PDF from its title down, with no header line above it.](/images/guides/python-header-footer-page-1.webp){width="720" height="1018"}

![Page 2 of the PDF: a small header line at the top reads Page 2 over a total of 26. Made on 11/25/26, 3:50 PM, above the text of the article's History section.](/images/guides/python-header-footer-page-2.webp){width="720" height="1018"}
:::
::::

## Add a footer with page numbers

Page numbers usually go at the bottom. Swap `header` for `footer` in the same request:

```python
params = {
    'source': 'https://en.wikipedia.org/wiki/PDF',
    'footer': {
        'source': '<div style="font-size: 10px; width: 100%; text-align: center;">Page {{ page }} of {{ total }}</div>',
        'height': '15mm'
    }
}
```

The rest of the code stays the same. Every page gets its own number and the total, like "Page 2 of 26".

You can send a `header` and a `footer` in the same request. If you set `start_at` above 1 on both, give them the same value. A header from page 2 with a footer from page 3 isn't supported. A header from page 1 with a footer from page 5 is fine.

## Style the header and footer

The header and footer are rendered apart from the rest of the document. Style them in their own source, with a `<style>` tag at the start of their `source` or `style=""` on the elements, like the footer above. For fonts, see [adding custom fonts in headers and footers](https://help.pdfshift.io/adding-custom-fonts-in-headers-and-footers).

## Variables you can use in the header or footer

The `source` parameter present in the header/footer accepts a set of variables that will be translated when converting the document.

Here are the properties you can use:

 * `{{ title }}`: The title of the document.
 * `{{ url }}`: The URL of the document.
 * `{{ page }}`: The current page number.
 * `{{ total }}`: The total number of pages in the document.
 * `{{ date }}`: The date of the conversion, such as "11/25/26, 3:50 PM".


This will allow you to generate a document that looks more like a printable version of a website, with page number and customized header and footer.
