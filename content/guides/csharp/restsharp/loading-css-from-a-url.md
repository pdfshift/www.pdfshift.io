---
title: "Loading CSS from a URL"
description: "Learn how to load CSS from a URL when converting HTML to PDF using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to reference external CSS files."
language: 'C#'
library: 'RestSharp'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-string', 'convert-html-to-pdf-from-a-url']
default: false
---

In this guide, we'll show you how to load CSS from a URL when converting HTML to PDF using C# and the RestSharp library.

When converting HTML to PDF, you might want to reference external CSS files to maintain consistent styling.

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
    // Load CSS from a URL
    css = "https://example.com/styles.css"
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

This allows you to apply external stylesheets to your PDFs.