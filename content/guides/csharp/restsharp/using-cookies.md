---
title: "Using cookies"
description: "Learn how to use cookies when converting HTML to PDF using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to manage cookies during conversion."
language: 'C#'
library: 'RestSharp'
property: 'cookies'
output: 'pdf'
related: ['accessing-secured-pages', 'send-custom-http-headers']
default: false
---

In this guide, we'll show you how to use cookies when converting HTML to PDF using C# and the RestSharp library.

When converting HTML to PDF, you might need to send cookies to access authenticated content or maintain session state.

```csharp
using RestSharp;
using System.IO;
using System.Threading.Tasks;

// You can get an API key at https://pdfshift.io
var apiKey = "sk_xxxxxxxxxxxx";

var client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
var request = new RestRequest(Method.Post);
request.AddHeader("X-API-Key", apiKey);
request.AddHeader("Content-Type", "application/json");

var payload = new
{
    source = "https://www.example.com",
    // Send cookies with the request
    cookies = new
    {
        sessionid = "abc123",
        user = "john_doe"
    }
};

request.AddJsonBody(payload);

var response = await client.ExecuteAsync(request);

// Handle errors:
if (response.StatusCode >= System.Net.HttpStatusCode.BadRequest)
{
    throw new Exception($"Request failed with status code {response.StatusCode}");
}

File.WriteAllBytes("result.pdf", response.RawBytes);

Console.WriteLine("The PDF document was generated and saved to result.pdf");
```

This allows you to maintain session state when accessing protected content.