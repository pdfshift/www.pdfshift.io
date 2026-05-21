---
title: "Loading CSS from a string"
description: "Learn how to load CSS from a string when converting HTML to PDF using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to apply inline CSS styling."
language: 'C#'
library: 'HttpClient'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-url', 'adding-a-custom-header-or-footer']
default: false
---

In this guide, we'll show you how to load CSS from a string when converting HTML to PDF using C# and the HttpClient library.

When converting HTML to PDF, you might want to apply CSS styling using inline CSS rather than external stylesheets.

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
    // Load CSS from a string
    css = "body { font-family: Arial; } h1 { color: blue; }"
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

This allows you to apply custom styling directly to your PDFs.