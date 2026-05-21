---
title: "Adding a text watermark"
description: "Learn how to add text watermarks to your PDFs using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to apply text watermarks to protect your documents."
language: 'C#'
library: 'RestSharp'
property: 'watermark'
output: 'pdf'
related: ['adding-an-image-watermark', 'protecting-the-generated-pdf']
default: false
---

In this guide, we'll show you how to add text watermarks to your PDFs using C# and the RestSharp library.

When generating PDFs, you might want to add text watermarks to your documents for protection or branding purposes.

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
    // Add text watermark
    watermark = new
    {
        text = "CONFIDENTIAL",
        opacity = 0.3,
        size = "20px",
        color = "#000000"
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

This allows you to add textual protection to your documents with customizable text.