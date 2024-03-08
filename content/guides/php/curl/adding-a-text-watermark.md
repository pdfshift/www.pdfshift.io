---
title: "Adding a text watermark"
description: "Learn how to add text watermarks to your generated PDF document using PHP and the cURL library. With this guide, you'll be able to add watermarks on top of your generated PDFs easily with a quick request to PDFShift's API."
language: 'PHP'
library: 'cURL'
property: 'watermark'
output: 'pdf'
related: ['adding-an-image-watermark', 'protecting-the-generated-pdf']
default: true
---

In this guide, we'll walk you through the process of adding text watermarks to your PDF files, using PDFShift's API.

Adding a watermark to your PDF can be done by adding the `watermark` object to your query. Adding a text allows you to customize its content and PDFShift's API provides a few properties to help you customize the visual aspect, such as the font size, color, and position.

```php
# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    'watermark' => array (
        'text' => 'PROTECTED DOCUMENT',
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

You can customize the text watermark by applying the following properties:

 * `font_size`: The size of the text. An integer value in pixels. Defaults to 16.
 * `font_family` : The font family to be used. Defaults to Helvetica.
 * `font_color` : The color of the text. A hexadecimal color value. Defaults to '000000'.
 * `font_opacity` : The opacity of the text. A float value between 0 and 100. Defaults to 100.
 * `font_bold`: A boolean to set the text as bold. Defaults to false.
 * `font_italic`: A boolean to set the text as italic. Defaults to false.

You can also customize the position of the text watermark by applying the following properties:

 * `offset_x`: The horizontal position of the text. Can be 'left', 'center', 'right', or a specific value in pixels. Defaults to 'center'.
 * `offset_y`: The vertical position of the text. Can be 'top', 'middle', 'bottom', or a specific value in pixels. Defaults to 'center'.

For the offset positions, we accept a value in integer which will be translated to pixels, but you can also pass a unit such as 'px', 'in', 'cm', 'mm', 'pt'.

For example:

```php
$params = array (
    "source": "https://www.example.com",
    "watermark": {
        "text": "PROTECTED DOCUMENT",
        "offset_x": "5cm",
        "offset_top": "15mm"
    }
}
```
