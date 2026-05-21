---
title: "Save your PDF online and get back a URL"
description: "Learn how to save your PDF online and get back a URL using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to store PDFs in cloud storage and retrieve URLs."
language: 'C#'
library: 'RestSharp'
property: 'output'
output: 'url'
related: ['save-your-pdf-to-your-amazon-s3-bucket', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to save your PDF online and get back a URL using C# and the RestSharp library.

When generating PDFs, you might want to store them in cloud storage and get a URL to access them later.

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
    // Save PDF to cloud storage and get URL
    output = new
    {
        type = "url",
        url = "https://your-storage.com/"
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

This allows you to store PDFs in cloud storage and access them via URLs.