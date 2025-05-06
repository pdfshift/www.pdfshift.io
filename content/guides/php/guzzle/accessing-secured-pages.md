---
title: "Accessing secured pages"
description: "Learn how to access secured pages using PHP and the Guzzle library. This guide offers detailed steps with code samples in PHP and the Guzzle library, highlighting how you can acces page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'PHP'
library: 'Guzzle'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: false
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using PHP and the Guzzle library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

```php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

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

// Create a Guzzle client
$client = new Client();
try {
    // Make the POST request
    $response = $client->post('https://api.pdfshift.io/v3/convert/pdf', [
        'headers' => [
            'Content-Type' => 'application/json',
            'X-API-Key' => $api_key
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

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.
