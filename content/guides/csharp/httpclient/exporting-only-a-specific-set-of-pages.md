---
title: "Exporting only a specific set of pages"
description: "Learn how to export only specific pages from a document when converting to PDF using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to select specific pages for export."
language: 'C#'
library: 'HttpClient'
property: 'pages'
output: 'pdf'
related: ['generate-a-document-with-full-height', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to export only specific pages from a document when converting to PDF using C# and the HttpClient library.

When converting documents, you might want to export only a specific range of pages rather than the entire document.

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
    // Export only pages 1-3
    pages = "1-3"
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

This allows you to selectively export pages from multi-page documents.