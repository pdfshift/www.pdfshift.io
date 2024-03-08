---
title: "Accessing secured pages"
description: "Learn how to access secured pages using PHP and the cURL library. This guide offers detailed steps with code samples in PHP and the cURL library, highlighting how you can acces page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'PHP'
library: 'cURL'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: true
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using PHP and the cURL library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```php
# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    # You can set a basic authentication by passing the "auth" property which contains a username and password
    'auth' => array (
        'username' => 'user',
        'password' => 'password'
    )
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

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
