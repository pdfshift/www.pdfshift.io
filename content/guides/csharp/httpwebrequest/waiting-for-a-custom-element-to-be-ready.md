---
title: "Waiting for a custom element to be ready"
description: "Learn how to wait for a custom element to be ready when converting HTML to PDF using C# and the HTTPWebRequest library. This guide offers detailed steps with code samples in C# and the HTTPWebRequest library, showing how to handle dynamic content."
language: 'C#'
library: 'HTTPWebRequest'
property: 'wait_for'
output: 'pdf'
related: ['loading-javascript-from-a-string', 'loading-javascript-from-a-url']
default: false
---

In this guide, we'll show you how to wait for a custom element to be ready when converting HTML to PDF using C# and the HTTPWebRequest library.

When converting HTML containing dynamic content, you might need to wait for specific elements to be rendered before generating the PDF.

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
    // Wait for a specific element to be ready
    wait_for = "#dynamic-content.loaded"
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

This allows you to ensure dynamic content is fully loaded before PDF generation.