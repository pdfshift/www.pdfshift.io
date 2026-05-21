---
title: "Loading CSS from a string"
description: "Learn how to load CSS from a string when converting HTML to PDF using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to apply inline CSS styling."
language: 'C#'
library: 'RestSharp'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-url', 'adding-a-custom-header-or-footer']
default: false
---

In this guide, we'll show you how to load CSS from a string when converting HTML to PDF using C# and the RestSharp library.

When converting HTML to PDF, you might want to apply CSS styling using inline CSS rather than external stylesheets.

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
    // Load CSS from a string
    css = "body { font-family: Arial; } h1 { color: blue; }"
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

This allows you to apply custom styling directly to your PDFs.