---
title: "Using cookies to convert HTML documents to PDF"
description: "Learn how to add custom Cookies when requesting an URL to be converted in PDF with PDFShift's API. It allows you to pursue an active session for instance, that will authenticate the request as a specific user before converting the page to PDF. This guide explains you how using PHP and the cURL library."
language: 'PHP'
library: 'cURL'
property: 'cookies'
output: 'pdf'
related: ['send-custom-http-headers', 'accessing-secured-pages']
default: true
---

In this comprehensive guide, we will demonstrate the step-by-step process of incorporating custom Cookies into your URL request for PDF conversion using PDFShift's API. By leveraging this functionality, you can maintain an active session, enabling authentication as a specific user before generating the PDF document.

To do so, we'll use the `cookies` parameter when sending a request to PDFShift. It expects a list of dictionnary that contains the name and the value of the cookies (more details after):

```php
# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    # The "cookies" parameter expects a list of dictionnary that contains the name and the value of the cookies
    'cookies' => array (
        array ( 'name' => 'PHPSESSID', 'value' => 'el4ukv0kqbvoirg7nkp4dncpk3' )
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

The `cookies` parameter accept the following parameters:

 * `name` : The name of the cookie.
 * `value`: The value of the cookie.
 * `secure`: A boolean (defaults to false) that will tell the browser to only send the cookie if the request is being sent over HTTPS.
 * `http_only`: A boolean (defaults to false) that will tell the browser to not expose it to client-side scripts.

Like in our guide to send custom HTTP headers or to access secured pages, this allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
