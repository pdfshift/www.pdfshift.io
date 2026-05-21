---
title: "Generate a document with full height"
description: "Learn how to generate a document with full height using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to create full-height PDFs."
language: 'C#'
library: 'RestSharp'
property: 'full_height'
output: 'pdf'
related: ['exporting-only-a-specific-set-of-pages', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to generate a document with full height using C# and the RestSharp library.

When converting documents to PDF, you might want to ensure the entire document height is preserved.

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
    // Generate document with full height
    full_height = true
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

This ensures the entire document content is included in the PDF.