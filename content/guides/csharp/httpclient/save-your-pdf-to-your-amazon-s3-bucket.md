---
title: "Save your PDF to your Amazon S3 bucket"
description: "Learn how to save your PDF to your Amazon S3 bucket using C# and the HttpClient library. This guide offers detailed steps with code samples in C# and the HttpClient library, showing how to store PDFs directly in AWS S3."
language: 'C#'
library: 'HttpClient'
property: 'output'
output: 's3'
related: ['save-your-pdf-online-and-get-back-a-url', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to save your PDF to your Amazon S3 bucket using C# and the HttpClient library.

When generating PDFs, you might want to store them directly in Amazon S3 for easy access and management.

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
    // Save PDF to Amazon S3 bucket
    output = new
    {
        type = "s3",
        bucket = "your-bucket-name",
        key = "path/to/document.pdf"
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

This allows you to store PDFs directly in your AWS S3 buckets.