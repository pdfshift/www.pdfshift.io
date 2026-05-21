---
title: "Send custom HTTP headers"
description: "Learn how to send custom HTTP headers when converting HTML to PDF using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to customize request headers."
language: 'C#'
library: 'RestSharp'
property: 'headers'
output: 'pdf'
related: ['accessing-secured-pages', 'using-cookies']
default: false
---

In this guide, we'll show you how to send custom HTTP headers when converting HTML to PDF using C# and the RestSharp library.

When converting HTML to PDF, you might need to send custom HTTP headers to access protected resources or provide additional information.

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
    // Send custom HTTP headers
    headers = new
    {
        authorization = "Bearer token123",
        "user-agent" = "MyApp/1.0"
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

This allows you to customize the HTTP requests sent to the source URL.