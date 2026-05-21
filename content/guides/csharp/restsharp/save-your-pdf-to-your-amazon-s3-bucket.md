---
title: "Save your PDF to your Amazon S3 bucket"
description: "Learn how to save your PDF to your Amazon S3 bucket using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to store PDFs directly in AWS S3."
language: 'C#'
library: 'RestSharp'
property: 'output'
output: 's3'
related: ['save-your-pdf-online-and-get-back-a-url', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to save your PDF to your Amazon S3 bucket using C# and the RestSharp library.

When generating PDFs, you might want to store them directly in Amazon S3 for easy access and management.

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
    // Save PDF to Amazon S3 bucket
    output = new
    {
        type = "s3",
        bucket = "your-bucket-name",
        key = "path/to/document.pdf"
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

This allows you to store PDFs directly in your AWS S3 buckets.