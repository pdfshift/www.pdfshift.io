---
title: "Avoid the conversion on error when loading the document"
description: "Learn how to avoid the conversion on error when loading the document using PHP and the Guzzle library and relies on the PDFShift's API."
language: 'PHP'
library: 'Guzzle'
property: 'raise_for_status'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html']
default: false
---

In this guide, we'll show you how to abort the conversion when loading the distant source does not return a 2XX response.

When you're converting a document, you might want to avoid the conversion on error when loading the document. This can be done by setting the `raise_for_status` parameter to `True` in the request.


```php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.httpstat.us/404',
    'raise_for_status' => true
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

Passing `raise_for_status` to `true` will ensure that if PDFShift can not load your document, the conversion will fail with an error.