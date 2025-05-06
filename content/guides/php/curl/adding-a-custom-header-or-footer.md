---
title: "Adding a custom header or footer"
description: "Discover how to add custom headers or footers to a PDF using PHP and the cURL library. This in-depth guide includes PHP codes that you can easily follow and quickly generate documents with PDFShift's API."
language: 'PHP'
library: 'cURL'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: true
---

In this guide, we'll show you how to add custom headers or footers to a PDF using PHP and the cURL library.

We'll focus this guide on the `header` parameter, but know that the `footer` parameter works _exactly_ the same way.

The `header` parameter is an object that accepts the following parameters:

 * `source`: The source of the header. It can be a URL or a raw HTML document. You can also provide some variables that we'll explain at the bottom of this guide.
 * `height`: The height of the header. By default, the height is in pixels, but you can also use `mm`, `cm` or `in` as units, like `10mm`.
 * `start_at`: The page number where the header should start. By default, the header will start at the first page.


**NOTE**: You must provide the full data in the header/footer, and not via a network request. Loading files such as external CSS, Js or Fonts won't work in the header or footer.
Instead, we recommend you to embed them in Base64.

Here's an example:

```php
# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://en.wikipedia.org/wiki/PDF',
    'header' => array (
        'source' => '<div>Page {{ page }} over a total of {{ total }}. Made on {{ date }}</div>',
        'height' => 150,
        'start_at' => 2
    )
)

$curl = curl_init('https://api.pdfshift.io/v3/convert/pdf');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'X-API-Key: '.$api_key
));

$response = curl_exec($curl);
if ($response === false) {
    $error_message = curl_error($curl);
    curl_close($curl);
    throw new Exception("cURL error: $error_message");
}

// Get the HTTP status code
$http_status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

// Close cURL resource
curl_close($curl);

// Check if the request was successful
if ($http_status !== 200) {
    throw new Exception("Request failed with HTTP status code: $http_status");
}

// Save the file to result.pdf
file_put_contents('result.pdf', $response);

echo 'The PDF document was generated and saved to result.pdf';
```

The `source` parameter present in the header/footer accepts a set of variables that will be translated when converting the document.

Here are the properties you can use:

 * `{{ title }}`: The title of the document.
 * `{{ url }}`: The URL of the document.
 * `{{ page }}`: The current page number.
 * `{{ total }}`: The total number of pages in the document.
 * `{{ date }}`: The current date in the format `M/D/YY-H:MM am/pm` such as "3/16/24, 2:04 PM".


This will allow you to generate a document that looks more like a printable version of a website, with page number and customized header and footer.