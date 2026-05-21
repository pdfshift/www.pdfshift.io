---
title: "Adding a text watermark"
description: "Learn how to add text watermarks to your PDFs using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to apply text watermarks to protect your documents."
language: 'C#'
library: 'HttpClient'
property: 'watermark'
output: 'pdf'
related: ['adding-an-image-watermark', 'protecting-the-generated-pdf']
default: false
---

In this guide, we'll show you how to add text watermarks to your PDFs using C# and the HttpClient library.

When generating PDFs, you might want to add text watermarks to your documents for protection or branding purposes.

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
    // Add text watermark
    watermark = new
    {
        text = "CONFIDENTIAL",
        opacity = 0.3,
        size = "20px",
        color = "#000000"
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

This allows you to add textual protection to your documents with customizable text.