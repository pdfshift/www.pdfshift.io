---
title: Convert any HTML to PDF using PHP
description: A guide to get started in converting your HTML documents or URLs to PDF using PDFShift and PHP.
language: php
logo: php.svg
---

# How to convert HTML to PDF in PHP

PDFShift provides a powerful API that let you convert any HTML documents to PDF using a simple POST request.
Python provides a great package, called `requests` that will handle all the network issues for us, so we recommend using it.

## [Documentation](#documentation)

See the full documentation on [PDFShift's documentation](https://docs.pdfshift.io/).

## [cURL function](#curl-function)

We provide a custom made function that works well with PHP for those who don't use Composer.
It uses `curl_*` functions to do a POST request like intended by the API, and throws exception in case the server returns a 4xx or 5xx response.

You can view the function as a [Gist on GitHub](https://gist.github.com/cnicodeme/f2c73d89ac49313d023d738b5cdb7046), or copy directly the function here:

```php
<?php
function pdfshift($apiKey, $params) {
    $curl = curl_init();

    curl_setopt_array ($curl, array (
        CURLOPT_URL => "https://api.pdfshift.io/v3/convert/pdf",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($params),
        CURLOPT_HTTPHEADER => array ('Content-Type:application/json'),
        CURLOPT_USERPWD => 'api:'.$apiKey
    ));

    $response = curl_exec($curl);
    $error = curl_error($curl);
    $statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if (!empty($error)) {
        throw new Exception($error);
    } elseif ($statusCode >= 400) {
        $body = json_decode($response, true);
        if (isset($body['error'])) {
            throw new Exception($body['error']);
        } else {
            throw new Exception($response);
        }
    }

    return $response;
}
```

## [Requirements](#requirements)

* PHP 5.4 or later
* cURL functions enabled on your server.

## [Usage](#usage)

This function needs to be configured with your `api_key` received when creating an account.
Setting it is easy as:

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com'
));

file_put_contents('result.pdf', $response);
```

We also highly recommend checking for errors after the conversion is made, before processing the document, in order to avoid issues later on.
This can be easily handled with `requests` by doing the following:

```php
try {
    $response = pdfshift('your_api_key', array (
        'source' => 'https://www.example.com'
    ));
} catch ($e) {
    // Handle Exception
}

file_put_contents('result.pdf', $response);
```

The `sandbox` parameter allows you to do unlimited conversion, but will add a watermark on top of the generated document.
No credits are deduced from your account when the sandbox mode is on.

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com',
    'sandbox' => true
));

file_put_contents('result.pdf', $response);
```

### [With a URL](#with-a-url)

Converting an URL with PDFShift is really easy. All you have to do is send a POST request with the `source` parameter set to the URL, like the following:

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com'
));

file_put_contents('result.pdf', $response);
```

### [With inline HTML data](#with-inline-data)

To convert a raw HTML data with PDFShift, simply send the raw string in the `source` parameter:

```php
$source = file_get_contents('invoice.html');

$response = pdfshift('your_api_key', array (
    'source' => $source
));

file_put_contents('result.pdf', $response);
```

### [Save the file to Amazon S3 and get an URL instead](#save-file-to-amazon-s3)

By passing the `filename` parameter to your request, you will receive a JSON response instead of the binary PDF, with a `url` key that contains the path to the file stored on Amazon S3.
All files stored on Amazon S3 are kept for two days, then automatically deleted.

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com',
    'filename' => 'result.pdf'
));

$json = json_decode($response, true);
// The URL is at $json['url'];
```

### [Custom HTTP Headers](#custom-http-headers)

You can pass custom HTTP headers, allowing you to adapt to the server handling your source. This can be a custom identification header, changing the language, or anything else.

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com',
    'http_headers' => array (
        'X-Original-Header' => 'Awesome value',
        'user-agent' => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
    )
));

file_put_contents('result.pdf', $response);
```

### [Accessing secured pages](#accessing-secured-pages)

If your `source` requires a BASIC AUTH mechanism, you can either use the custom headers part or use the `auth` parameter from the API that behaves the same.

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://httpbin.org/basic-auth/user/passwd',
    'auth' => array (
        'username' => 'user',
        'password' => 'passwd'
    )
));

file_put_contents('result.pdf', $response);
```

### [Using cookies](#using-cookies)

Cookies might help you access unauthorized areas that aren't restricted by a simple Basic Auth mechanism. You can define as many cookies as you want.

```php
// cookies is a list of object, that's why we call twice `array`.
// First for the list, second as an object.
$response = pdfshift('your_api_key', array (
    'source' => 'https://httpbin.org/cookies',
    'cookies' => array(array ('name' => 'session', 'value' => '4cb496a8-a3eb-4a7e-a704-f993cb6a4dac'))
));

file_put_contents('result.pdf', $response);
```


### [Loading CSS from a URL](#loading-css-from-url)

By passing a `css` parameter, you will be able to modify the page with your CSS.
This allows you to customize the rendering of the page.

You can also call multiple CSS by calling a root CSS (like "print.css" in that case) that will call @import in it for each CSS files.

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com',
    'css' => 'https://www.example.com/public/css/print.css'
));

file_put_contents('result.pdf', $response);
```

### [Loading CSS from a string](#loading-css-from-string)

Like for the `source` parameter, you can pass a raw set of CSS rules to the `css` parameter and they will be injected to the loaded document.

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com',
    'css' => 'a {text-decoration: underline; color: blue}'
));

file_put_contents('result.pdf', $response);
```

### [Adding Watermark](#adding-watermark)

Some documents that you share need a watermark to clearly identify your brand. That's easy with PDFShift:

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com',
    'watermark' => array (
        'image' => 'https://pdfshift.io/images/logo.png',
        'offset_x' => 50,
        'offset_y' => '100px',
        'rotate' => 45
    )
));

file_put_contents('result.pdf', $response);
```

### [Custom Header (or Footer)](#custom-header-footer)

You can add some custom header or footer to your generated document. These are often used to indicate the current page, or show the logo of your company on every page.

Note that the header and footer **are not related to the body**. For this reason, the CSS in your body doesn't apply to your header/footer.
By default, the font-size will be really small. You will have to set it manually, like in the following example:

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com',
    'footer' => array (
        'source' => '<div style="font-size: 12px">Page {{ "{{page}}" }} of {{ "{{total}}" }}</div>',
        'spacing' => '50px'
    )
));

file_put_contents('result.pdf', $response);
```

### [Protecting the generated PDF](#protecting-the-pdf)

Protecting your document is easy with PDFShift. You can specify a password for the user and for the owner.
(The owner will have full rights access while the user will have limited access based on your choice).

Please keep in mind that some PDF reader doesn't respect the rights as long as the user is authenticated.
This means that if you set an empty password for the user, with no rights to print or copy, some PDF reader will ignore this and still allow printing and copying.

This is outside of our capabilities here at PDFShift as we can't enforce a reader to respect PDF's standard.

```php
$response = pdfshift('your_api_key', array (
    'source' => 'https://www.example.com',
    'protection' => array (
        'user_password' => 'user',
        'owner_password' => 'owner',
        'no_print' => true
    )
));

file_put_contents('result.pdf', $response);
```