---
title: "Define a time limit"
description: "Learn how to set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted. This guides explains you how to achieve it using PHP and the Guzzle library."
language: 'PHP'
library: 'Guzzle'
property: 'timeout'
output: 'pdf'
related: ['waiting-for-a-custom-element-to-be-ready']
default: false
---

In this guide, we'll show you how you can set a conversion time limit at PDFShift. This will allow you to define a maximum time for the conversion process to complete, and if the process takes longer than the defined time, the conversion will be aborted.

In some cases, this can be useful if you want the request to not be too long and then handle failure on your end depending on the result.

To do so, we use the `timeout` property, which is the maximum time in **seconds** that the request is allowed to take. If the request takes longer than the defined time, the conversion will be aborted.

```php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    'timeout' => 10
)

// Create a Guzzle client
$client = new Client();
try {
    // Make the POST request
    $response = $client->post('https://api.pdfshift.io/v3/convert/pdf', [
        'headers' => [
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . base64_encode('api:' . $api_key)
        ],
        'json' => $params
    ]);

    // Get the response body
    $body = $response->getBody()->getContents();

    // Save the file to result.pdf
    file_put_contents('result.pdf', $body);

    echo 'The PDF document was generated and saved to result.pdf';
} catch (RequestException $e) {
    if ($e->hasResponse()) {
        $statusCode = $e->getResponse()->getStatusCode();
        $reasonPhrase = $e->getResponse()->getReasonPhrase();
        throw new Exception("Request failed with status code $statusCode: $reasonPhrase");
    } else {
        throw new Exception("Request failed: " . $e->getMessage());
    }
}
```

In the above example, the conversion could fail if the conversion takes longer than 10 seconds.