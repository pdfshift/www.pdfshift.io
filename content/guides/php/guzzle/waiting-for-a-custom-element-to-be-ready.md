---
title: "Waiting for a custom element to be ready"
description: "Learn how to set up a custom javascript function that will waits for a specific condition to become true before allowing the conversion to happen. This is very interesting for waiting on charts to be generated, or custom fonts to be loaded. With PDFShift's API, this can easily be done using PHP and the Guzzle library."
language: 'PHP'
library: 'Guzzle'
property: 'wait_for'
output: 'pdf'
related: ['define-a-time-limit', 'loading-javascript-from-a-string']
default: false
---

The `wait_for` parameter is one of the most powerful feature of PDFShift. It allows you to control when the document is ready to be converted to PDF.

For instance, you might need the `wait_for` parameter to wait on your charts to be visible.

It makes sense because from our engine point of view, all the resources are loaded so the conversion to PDF can be executed. But from your page stand point, even though everything is loaded, _not everything is rendered_!

So by using the `wait_for` parameter, you can tell PDFShift to wait for a specific condition to be true before allowing the conversion to happen.

That property **expects a string which points to a global function**.

For instance, if in your HTML page, you have the following script:

```javascript
<script>
function isPageReady() {
    return document.getElementById('chart').clientHeight > 0;
}
</script>
```

You can set the `wait_for` parameter to `isPageReady` and PDFShift will wait for the `isPageReady` function to return `true` before converting the page to PDF.


```php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    'wait_for' => 'isPageReady'
)

$curl = curl_init('https://api.pdfshift.io/v3/convert/pdf');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Authorization: Basic ' . base64_encode('api:' . $api_key)
));

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

In case your page doesn't have the javascript function available, but you still need to wait on some elements to be rendered before continuing the conversion, you can add javascript code directly in the request and use it at the same time:

```php
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

# You can get an API key at https://pdfshift.io
$api_key = 'sk_xxxxxxxxxxxx'

$params = array (
    'source' => 'https://www.example.com',
    'javascript' => 'let isFontReady = false; document.fonts.ready.then(() => isFontReady = true); function isPageReady() { return isFontReady; }',
    'wait_for' => 'isPageReady'
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

The above script will wait for all fonts to be ready before returning `true` for the `isPageReady` function.
PDFShift will then wait for the fonts to be ready, via the `isPageReady`, before converting the page to PDF.