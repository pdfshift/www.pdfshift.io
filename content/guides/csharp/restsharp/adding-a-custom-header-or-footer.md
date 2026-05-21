---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDFs using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to customize PDF appearance with headers and footers."
language: 'C#'
library: 'RestSharp'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers and footers to your PDFs using C# and the RestSharp library.

When generating PDFs, you might want to add custom headers and footers to your documents for branding or informational purposes.

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
    // Add custom header and footer
    header = new
    {
        content = "<div style='text-align: center;'>Header Content</div>",
        height = "20mm"
    },
    footer = new
    {
        content = "<div style='text-align: center;'>Footer Content</div>",
        height = "20mm"
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

This allows you to add consistent branding elements to all your generated PDF documents.