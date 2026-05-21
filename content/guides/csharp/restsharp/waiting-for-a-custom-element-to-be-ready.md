---
title: "Waiting for a custom element to be ready"
description: "Learn how to wait for a custom element to be ready when converting HTML to PDF using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to handle dynamic content."
language: 'C#'
library: 'RestSharp'
property: 'wait_for'
output: 'pdf'
related: ['loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to wait for a custom element to be ready when converting HTML to PDF using C# and the RestSharp library.

When converting HTML containing dynamic content, you might need to wait for specific elements to be rendered before generating the PDF.

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
    // Wait for a specific element to be ready
    wait_for = "#dynamic-content.loaded"
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

This allows you to ensure dynamic content is fully loaded before PDF generation.