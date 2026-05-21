---
title: "Send custom HTTP headers"
description: "Learn how to send custom HTTP headers when converting HTML to PDF using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to customize request headers."
language: 'C#'
library: 'HttpClient'
property: 'headers'
output: 'pdf'
related: ['accessing-secured-pages', 'using-cookies']
default: false
---

In this guide, we'll show you how to send custom HTTP headers when converting HTML to PDF using C# and the HttpClient library.

When converting HTML to PDF, you might need to send custom HTTP headers to access protected resources or provide additional information.

```csharp
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

// You can get an API key at https://pdfshift.io
var apiKey = "sk_xxxxxxxxxxxx";

var client = new HttpClient();
client.DefaultRequestHeaders.Add("X-API-Key", apiKey);

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

var json = System.Text.Json.JsonSerializer.Serialize(payload);
var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

var response = await client.PostAsync("https://api.pdfshift.io/v3/convert/pdf", content);

// Handle errors:
if (response.StatusCode >= System.Net.HttpStatusCode.BadRequest)
{
    throw new Exception($"Request failed with status code {response.StatusCode}");
}

var result = await response.Content.ReadAsByteArrayAsync();

System.IO.File.WriteAllBytes("result.pdf", result);

Console.WriteLine("The PDF document was generated and saved to result.pdf");
```

This allows you to customize the HTTP requests sent to the source URL.