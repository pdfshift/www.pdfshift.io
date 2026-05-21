---
title: "Generate a document with full height"
description: "Learn how to generate a document with full height using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to create full-height PDFs."
language: 'C#'
library: 'HttpClient'
property: 'full_height'
output: 'pdf'
related: ['exporting-only-a-specific-set-of-pages', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to generate a document with full height using C# and the HttpClient library.

When converting documents to PDF, you might want to ensure the entire document height is preserved.

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
    // Generate document with full height
    full_height = true
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

This ensures the entire document content is included in the PDF.