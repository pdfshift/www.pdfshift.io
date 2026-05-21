---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDFs using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to customize PDF appearance with headers and footers."
language: 'C#'
library: 'HttpClient'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers and footers to your PDFs using C# and the HttpClient library.

When generating PDFs, you might want to add custom headers and footers to your documents for branding or informational purposes.

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
    // Add custom header and footer
    header = new
    {
        content = "<div style='text-align: center;'>Header Content</div>",
        height = "20mm"
    },
    footer = new
    {
        content = "<div style='text-align: center;'>Footer Content</div>",
        height = "20mm"
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

This allows you to add consistent branding elements to all your generated PDF documents.