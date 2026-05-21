---
title: "Receive a webhook event"
description: "Learn how to receive webhook events when PDF conversion is complete using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, showing how to handle asynchronous conversion notifications."
language: 'C#'
library: 'RestSharp'
property: 'webhook'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to receive webhook events when PDF conversion is complete using C# and the RestSharp library.

When converting documents asynchronously, you might want to be notified when the conversion is complete via a webhook.

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
    // Set up webhook notification
    webhook = new
    {
        url = "https://your-server.com/webhook",
        secret = "your-secret-key"
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

This allows you to be notified when conversions are complete without polling.