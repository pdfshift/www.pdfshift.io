---
language: 'PHP'
library: 'curl'
link: 'https://www.php.net/manual/en/book.curl.php'
---

[cURL](https://www.php.net/manual/en/book.curl.php) is commonly used as an extension to make HTTP requests and handle responses from within PHP scripts. It provides a wide range of features and options for making HTTP requests, including support for various protocols and authentication methods.

```php
<?php

function convert($api_key, $params, $endpoint = 'pdf') {
    // Ensure the endpoint is valid
    if (!in_array($endpoint, array('pdf', 'png', 'jpg', 'webp'))) {
        throw new Exception('Invalid endpoint specified');
    }

    // Set the API URL
    $url = 'https://api.pdfshift.io/v3/convert/' . $endpoint;

    // Set cURL options
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($params));
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Authorization: Basic ' . base64_encode('api:' . $api_key)
    ));

    // Execute the cURL request
    $response = curl_exec($curl);

    // Check for cURL errors
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

    // Check if filename or webhook were passed
    if (array_key_exists('filename', $params) || array_key_exists('webhook', $params)) {
        // Decode the response JSON
        return json_decode($response, true);
    }

    // Return the binary content
    return $response;
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
