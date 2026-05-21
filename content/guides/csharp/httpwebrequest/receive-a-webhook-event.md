---
title: "Receive a webhook event"
description: "Learn how to receive webhook events when PDF conversion is complete using C# and the HTTPWebRequest library. This guide offers detailed steps with code samples in C# and the HTTPWebRequest library, showing how to handle asynchronous conversion notifications."
language: 'C#'
library: 'HTTPWebRequest'
property: 'webhook'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to receive webhook events when PDF conversion is complete using C# and the HTTPWebRequest library.

When converting documents asynchronously, you might want to be notified when the conversion is complete via a webhook.

```csharp
using System;
using System.Net;
using System.Text;
using System.IO;
using System.Threading.Tasks;

// You can get an API key at https://pdfshift.io
var apiKey = "sk_xxxxxxxxxxxx";

var request = (HttpWebRequest)WebRequest.Create("https://api.pdfshift.io/v3/convert/pdf");
request.Method = "POST";
request.ContentType = "application/json";
request.Headers.Add("X-API-Key", apiKey);

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

var json = System.Text.Json.JsonSerializer.Serialize(payload);
byte[] data = Encoding.UTF8.GetBytes(json);
request.ContentLength = data.Length;

using (var stream = request.GetRequestStream())
{
    stream.Write(data, 0, data.Length);
}

try
{
    var response = (HttpWebResponse)request.GetResponse();
    
    // Handle errors:
    if (response.StatusCode >= HttpStatusCode.BadRequest)
    {
        throw new Exception($"Request failed with status code {response.StatusCode}");
    }

    using (var reader = new StreamReader(response.GetResponseStream()))
    {
        var result = reader.ReadToEnd();
        File.WriteAllText("result.pdf", result);
    }

    Console.WriteLine("The PDF document was generated and saved to result.pdf");
}
catch (WebException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

This allows you to be notified when conversions are complete without polling.