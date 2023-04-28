---
title: "PDFShift Guide: Convert HTML to PDF Using Ruby"
description: With PDFShift, you can convert any HTML to PDF using Ruby. Learn more about our Ruby API including general documentation, easy installation, and usage.
language: ruby
logo: ruby.svg
---

# How to convert HTML to PDF in Ruby

PDFShift provides a powerful API that let you convert any HTML documents to PDF using a simple POST request.
Ruby already has all the required library to make the request for converting your document, and this guides will explain how.

## [Documentation](#documentation)

See the full documentation on [PDFShift's documentation](https://docs.pdfshift.io/).

## [Requirements](#requirements)

* Ruby 1.9.1 or later

## [Usage](#usage)

Using Python's `requests` package, you can send a POST request toward PDFShift's API by simply passing your `api_key` as the user parameter of a basic authentication.
The `api_key` is the one you received by email when creating your account, or any you created from your dashboard.

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://www.example.com", "sandbox" => true}

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

We also highly recommend checking for errors after the conversion is made, before processing the document, in order to avoid issues later on.

The `sandbox` parameter allows you to do unlimited conversion, but will add a watermark on top of the generated document.
No credits are deduced from your account when the sandbox mode is on.

### [With a URL](#with-a-url)

Converting an URL with PDFShift is really easy. All you have to do is send a POST request with the `source` parameter set to the URL, like the following:

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://www.example.com"}

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [With inline HTML data](#with-inline-html-data)

To convert a raw HTML data with PDFShift, simply send the raw string in the `source` parameter:

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

file = File.read("invoice.html")
uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => file}

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Save the file to Amazon S3 and get a URL instead](#save-the-file-to-amazon-s3-and-get-a-url-instead)

By passing the `filename` parameter to your request, you will receive a JSON response instead of the binary PDF, with a `url` key that contains the path to the file stored on Amazon S3.
All files stored on Amazon S3 are kept for two days, then automatically deleted.

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = { "source" => 'http://www.example.com',
    "filename" => "result.pdf" }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        puts response.body
        # { "duration":1309,
        # "filesize":37511,
        # "success":true,
        # "url":"<amazon_s3_url>/result.pdf"}
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Custom HTTP Headers](#custom-http-headers)

You can pass custom HTTP headers, allowing you to adapt to the server handling your source. This can be a custom identification header, changing the language, or anything else.

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://www.example.com",
    "http_headers" => {
        "X-Original-Header" => "Awesome value",
        "user-agent" => "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0"
    } }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Accessing secured pages](#accessing-secured-pages)

If your `source` requires a BASIC AUTH mechanism, you can either use the custom headers part or use the `auth` parameter from the API that behaves the same.

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://httpbin.org/basic-auth/user/passwd",
    "auth" => {
        "username" => "user",
        "password" => "passwd"
    } }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Using cookies](#using-cookies)

Cookies might help you access unauthorized areas that aren't restricted by a simple Basic Auth mechanism. You can define as many cookies as you want.

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://httpbin.org/cookies",
    "cookies" => [{"name" => "session",
    "value" => "4cb496a8-a3eb-4a7e-a704-f993cb6a4dac" }] }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```


### [Loading CSS from a URL](#loading-css-from-a-url)

By passing a `css` parameter, you will be able to modify the page with your CSS.
This allows you to customize the rendering of the page.

You can also call multiple CSS by calling a root CSS (like "print.css" in that case) that will call @import in it for each CSS files.

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://www.w3.org/",
    "css" => "https://www.w3.≤≤≤org/2008/site/css/print" }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Loading CSS from a string](#loading-css-from-a-string)

Like for the `source` parameter, you can pass a raw set of CSS rules to the `css` parameter and they will be injected to the loaded document.

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://www.example.com",
    "css" => "body { background-color: red }" }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Adding Watermark](#adding-watermark)

Some documents that you share need a watermark to clearly identify your brand. That's easy with PDFShift:

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://example.com",
    "watermark" => {
        "image" => "https://pdfshift-dev.netlify.com/images/logo/logo-violet.png",
        "offset_x" => 50,
        "offset_y" => "100px",
        "rotate" => 45
    } }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Custom Header or Footer](#custom-header-or-footer)

You can add some custom header or footer to your generated document. These are often used to indicate the current page, or show the logo of your company on every page.

Note that the header and footer **are not related to the body**. For this reason, the CSS in your body doesn't apply to your header/footer.
By default, the font-size will be really small. You will have to set it manually, like in the following example:

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://www.example.com",
    'footer' => {
        'source' => '<div style="font-size: 12px">Page {{ "{{page}}" }} of {{ "{{total}}" }}</div>',
        'spacing' => '50px'
    } }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Protecting the generated PDF](#protecting-the-generated-pdf)

Protecting your document is easy with PDFShift. You can specify a password for the user and for the owner.
(The owner will have full rights access while the user will have limited access based on your choice).

Please keep in mind that some PDF reader doesn't respect the rights as long as the user is authenticated.
This means that if you set an empty password for the user, with no rights to print or copy, some PDF reader will ignore this and still allow printing and copying.

This is outside of our capabilities here at PDFShift as we can't enforce a reader to respect PDF's standard.

```ruby
require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://www.example.com",
    'protection' => {
        'user_password' => 'user',
        'owner_password' => 'owner',
        'no_print' => true
    } }

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("result.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end
```

### [Real life example - Sending an invoice by email](#real-life-example)

One frequent use of PDFShift is to generate an invoice when receiving a payment, and sending that invoice - in PDF format - by email, to the customer.

This can be done really easily and quickly, with the following lines:

```ruby
require 'uri'
require 'net/https'
require 'json'
require 'net/smtp'
require 'mail'
require 'sinatra'

get '/send' do
    generate_invoice
    send_invoice_via_email
    redirect to('/thank-you')
end

get '/thank-you' do
    'Check your email! thanks for using PDFShift!'
end

def generate_invoice
    file = File.read("invoice.html")
    uri = URI("https://api.pdfshift.io/v3/convert/pdf")
    data = {"source" => file}

    Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
        request = Net::HTTP::Post.new(uri.request_uri)
        request.body = data.to_json
        request["Content-Type"] = "application/json"
        request.basic_auth 'api', 'your_api_key'

        response = http.request(request)

        if response.code == '200'
            File.binwrite("result.pdf", response.body)
        else
            puts "#{response.code} #{response.body}"
        end
    end
end

def send_invoice_via_email
    # Update user_name and password with a valid gmail account
    options = { :address              => "smtp.gmail.com",
                :port                 => 587,
                :domain               => 'pdfshift.io',
                :user_name            => 'example@gmail.com',
                :password             => 'examplepassword',
                :authentication       => 'plain',
                :enable_starttls_auto => true }

    Mail.defaults do
        delivery_method :smtp, options
    end

    # Update the email fields to your needs
    Mail.deliver do
        from     'pdfshift-user@pdfshift.io'
        to       'recipient@domain.com'
        subject  'Your invoice'
        body     "Here's the invoice you requested"
        add_file 'result.pdf'
    end
end
```