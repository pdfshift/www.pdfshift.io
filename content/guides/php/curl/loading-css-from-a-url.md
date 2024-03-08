---
title: "Loading CSS from a URL"
description: "This guides shows you how to add a custom CSS from an URL onto your document to customize the output of your generated PDF. Follow this guides to learn how to do it using PHP and the cURL library and see how it can quickly be implemented using the PDFShift's API."
language: 'PHP'
library: 'cURL'
property: 'css'
output: 'pdf'
related: ['adding-a-custom-header-or-footer', 'loading-css-from-a-string', 'loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: true
---

In this guide, we'll show you how to load custom CSS as a URL when converting an HTML document to PDF using PDFShift's API. This allows you to add custom CSS to your page to customize the output of your generated PDF.

It can be interesting to be able to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.
This allows you to keep a standard look and feel to your users, but adjust some areas when sending that same document to PDFShift to get back a PDF.

Moreover, adding a URL can be easier to do than passing the raw CSS content, as it allows you to later modify that CSS without having to modify the query made to PDFShift.

```php
# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    'css' => 'https://www.example.com/public/style/print.css'
)

$curl = curl_init('https://api.pdfshift.io/v3/convert/pdf');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode('api:' . $api_key)
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

The `css` parameter accepts either a string or a URL. It will be used as the CSS for the page when converting it to PDF. This allows you to set a custom CSS value to adjust the rendering of your page specifically when exporting the document to PDF.