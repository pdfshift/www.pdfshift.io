---
title: "Send custom HTTP headers"
description: "Learn how to add custom HTTP headers when requesting an URL to be converted in PDF with PDFShift's API. It allows you to add specific headers that your backend can check against to authenticate a query before converting it to PDF. This guide explains you how using PHP and the Guzzle library."
language: 'PHP'
library: 'Guzzle'
property: 'http_headers'
output: 'pdf'
related: ['using-cookies', 'accessing-secured-pages']
default: false
---

In this guide, we'll walk you through the process of sending custom HTTP headers when requesting an URL to be converted to PDF using PDFShift's API.

This can be useful to pass custom parameters to your server. It can help for instance to identify from where is coming the request, and add some extra layer of security.

```php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    'http_headers' => array (
        'x-custom-header' => 'custom-value',
        'Authorization' => 'Bearer {token}'  # This allows you to authenticate PDFShift to your service in a custom way
    )
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

This allows you to set specific HTTP headers that will be send along with the request PDFShift will make to your server.
It can be helpful to authenticate the request that your backend can check against before converting it to PDF.