---
language: 'PHP'
library: 'guzzle'
link: 'https://docs.guzzlephp.org/en/stable/'
---

[Guzzle](https://docs.guzzlephp.org/en/stable/) is a popular PHP HTTP client library that provides a simple and flexible API for making HTTP requests and handling responses. It offers features like request and response middleware, streaming uploads and downloads, and request batching. Guzzle is widely used for consuming web services, interacting with APIs, and performing HTTP operations in PHP applications.

```php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

function convert($api_key, $params, $endpoint = 'pdf') {
    // Ensure the endpoint is valid
    if (!in_array($endpoint, array('pdf', 'png', 'jpg', 'webp'))) {
        throw new Exception('Invalid endpoint specified');
    }

    // Set the API URL
    $url = 'https://api.pdfshift.io/v3/convert/' . $endpoint;

    // Create a Guzzle client
    $client = new Client();

    try {
        // Make the POST request
        $response = $client->post($url, [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Basic ' . base64_encode('api:' . $api_key)
            ],
            'json' => $params
        ]);

        // Get the response body
        $body = $response->getBody()->getContents();

        // Check if filename or webhook were passed
        if (array_key_exists('filename', $params) || array_key_exists('webhook', $params)) {
            return json_decode($body, true);
        }

        // Return the binary content
        return $body;
    } catch (RequestException $e) {
        if ($e->hasResponse()) {
            $statusCode = $e->getResponse()->getStatusCode();
            $reasonPhrase = $e->getResponse()->getReasonPhrase();
            throw new Exception("Request failed with status code $statusCode: $reasonPhrase");
        } else {
            throw new Exception("Request failed: " . $e->getMessage());
        }
    }
}
```

```php
try {
    $result = convert('sk_XXXXXXXXXXXXXX', array(
        'source' => 'https://en.wikipedia.org/wiki/REST'
    ));

    var_dump($result);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
```