---
title: "Define a time limit"
description: "Learn how to define a time limit for PDF conversions using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to set timeouts to prevent long-running conversions."
language: 'C#'
library: 'RestSharp'
property: 'timeout'
output: 'pdf'
related: ['avoid-conversion-on-error', 'define-a-time-limit']
default: false
---

In this guide, we'll show you how to define a time limit for PDF conversions using C# and the RestSharp library.

When converting documents to PDF, you might want to set a timeout to prevent long-running conversions from blocking your application.

```csharp
using RestSharp;
using System.IO;
using System.Threading.Tasks;

// You can get an API key at https://pdfshift.io
var apiKey = "sk_xxxxxxxxxxxx";

var client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
client.Timeout = 30000; // 30 seconds timeout
var request = new RestRequest(Method.Post);
request.AddHeader("X-API-Key", apiKey);
request.AddHeader("Content-Type", "application/json");

var payload = new
{
    source = "https://www.example.com",
    // Set a timeout in seconds
    timeout = 30
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

This allows you to control how long a conversion can take before timing out.