---
language: 'Ruby'
library: 'Net::HTTP'
link: 'https://ruby-doc.org/stdlib-2.7.0/libdoc/net/http/rdoc/Net/HTTP.html'
---

[Net::HTTP](https://ruby-doc.org/stdlib-2.7.0/libdoc/net/http/rdoc/Net/HTTP.html) is a built-in HTTP client library for Ruby that provides basic functionality for making HTTP requests and handling responses. It is part of the Ruby standard library and offers a simple API for sending requests and receiving responses from web servers.

```ruby
require 'net/http'
require 'uri'
require 'json'

def convert(api_key, params, endpoint = 'pdf')
  # Ensure the endpoint is valid
  unless %w[pdf png jpg webp].include?(endpoint)
    raise ArgumentError, 'Invalid endpoint specified'
  end

  # Set the API URL
  url = URI("https://api.pdfshift.io/v3/convert/#{endpoint}")

  # Create a Net::HTTP instance
  http = Net::HTTP.new(url.host, url.port)
  http.use_ssl = true

  # Create the request
  request = Net::HTTP::Post.new(url)
  request['Content-Type'] = 'application/json'
  request['X-API-Key'] = api_key
  request.body = params.to_json

  # Send the request and handle the response
  response = http.request(request)

  # Check for successful response
  unless response.is_a?(Net::HTTPSuccess)
    raise "Request failed with status code #{response.code}: #{response.body}"
  end

  # Return the response based on the presence of filename or webhook
  response_body.key?('filename') || response_body.key?('webhook') ? JSON.parse(response.body) : response.body
end
```

```ruby
begin
  result = convert('sk_XXXXXXXXXXXXXX', {'source' => 'https://en.wikipedia.org/wiki/REST'})
  puts result
rescue StandardError => e
  puts "Error: #{e.message}"
end
```
