---
title: "Protecting the generated PDF"
description: "Learn how to protect generated PDFs with passwords using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to secure your PDF documents."
language: 'C#'
library: 'RestSharp'
property: 'protection'
output: 'pdf'
related: ['adding-an-image-watermark', 'adding-a-text-watermark']
default: false
---

In this guide, we'll show you how to protect generated PDFs with passwords using C# and the RestSharp library.

When generating PDFs, you might want to add password protection to restrict access.

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
    // Protect the PDF with a password
    protection = new
    {
        user_password = "user123",
        owner_password = "owner123"
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

This allows you to secure your PDF documents with passwords.