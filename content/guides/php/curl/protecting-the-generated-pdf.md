---
title: "Protecting the generated PDF"
description: "Learn how to protect your generated PDF with encryption for owner and user, and for choosing who can modify, print and/or copy the generated PDF. This guides explains you to do it using PHP and the cURL library and relies on the PDFShift's API."
language: 'PHP'
library: 'cURL'
property: 'protection'
output: 'pdf'
related: ['adding-an-image-watermark', 'adding-a-text-watermark']
default: true
---

In this guide, we'll show you how you can protect your generated PDF with encryption for owner and user, and for choosing who can modify, print and/or copy the generated PDF. This guides explains you to do it using PHP and the cURL library and relies on the PDFShift's API.

One of the most useful feature here is the ability to set a password for the owner and the user of the PDF. This allows you to protect your document from anyone and restrict its access to only a few people.

PDFShift allows you to do this easily by adding the `protection` object to your query.

Here's a sample:

```php
# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    'protection' => array (
        'owner_password' => 'owner_password',
        'user_password' => 'user_password',
        'no_print' => true,
        'no_modify' => true
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
