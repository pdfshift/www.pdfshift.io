---
title: "Adding an image watermark"
description: "Discover how to effortlessly add image watermarks to PDFs using PHP and the cURL library. Our guide shows you how to add images on top of your PDF to protect your document easily. This is easily done with a simple request to PDFShift's API."
language: 'PHP'
library: 'cURL'
property: 'watermark'
output: 'pdf'
related: ['protecting-the-generated-pdf', 'adding-a-text-watermark']
default: true
---

In this guide, we'll walk you through the process of adding text watermarks to your PDF files, using PDFShift's API.

Adding a watermark to your PDF can be done by adding the `watermark` object to your query.
The advantage of providing an image is that you can add a visual stamp on top of each of your pages that are generated through PDFShift.

```php
# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    'watermark' => array (
        'image' => 'https://placekitten.com/200/300',
        'offset_x' => 'center',
        'offset_top' => 'top'
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

The "image" parameter for the watermark can be used in two different values:

 * URL : A full URL to an image that will be used as the watermark.
 * Base64 : A base64 encoded image that will be used as the watermark.

Note that you can also rotate the image by passing the `rotate` parameter as a degree (or negative degree)

You can also customize the position of the text watermark by applying the following properties:

 * `offset_x`: The horizontal position of the text. Can be 'left', 'center', 'right', or a specific value in pixels. Defaults to 'center'.
 * `offset_y`: The vertical position of the text. Can be 'top', 'middle', 'bottom', or a specific value in pixels. Defaults to 'center'.

For the offset positions, we accept a value in integer which will be translated to pixels, but you can also pass a unit such as 'px', 'in', 'cm', 'mm', 'pt'.

For example:

```json
$params = array (
    "source": "https://www.example.com",
    "watermark": {
        "text": "PROTECTED DOCUMENT",
        "offset_x": "5cm",
        "offset_top": "15mm"
    }
}
```
