---
title: "Loading JavaScript from a string"
description: "Learn how to load JavaScript from a string when converting HTML to PDF using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to include inline JavaScript."
language: 'C#'
library: 'HttpClient'
property: 'javascript'
output: 'pdf'
related: ['loading-javascript-from-a-url', 'waiting-for-a-custom-element-to-be-ready']
default: false
---

In this guide, we'll show you how to load JavaScript from a string when converting HTML to PDF using C# and the HttpClient library.

When converting HTML to PDF, you might want to include JavaScript functionality using inline code.

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
    // Load JavaScript from a string
    javascript = "document.body.style.backgroundColor = 'red';"
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

This enables dynamic behavior in your PDFs.