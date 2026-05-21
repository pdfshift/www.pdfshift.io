---
title: "Convert HTML to PDF from raw HTML"
description: "Learn how to convert raw HTML to PDF using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to convert HTML content directly to PDF."
language: 'C#'
library: 'RestSharp'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url', 'loading-css-from-a-string']
default: true
---

In this guide, we'll show you how to convert raw HTML to PDF using C# and the RestSharp library.

Converting raw HTML content to PDF is useful when you have HTML content that isn't hosted on a web server.

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
    source = "<html><body><h1>Hello World</h1></body></html>"
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

This allows you to convert HTML content directly to PDF without needing a URL.