---
title: "Convert HTML to PDF from a URL"
description: "Learn how to convert HTML from a URL to PDF using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to convert online HTML content to PDF."
language: 'C#'
library: 'HttpClient'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-raw-html', 'loading-css-from-a-url']
default: true
---

In this guide, we'll show you how to convert HTML from a URL to PDF using C# and the HttpClient library.

Converting HTML from a URL to PDF is a common requirement when you want to generate PDFs from existing web content.

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
    source = "https://www.example.com"
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

This allows you to easily convert any webpage to a PDF document.