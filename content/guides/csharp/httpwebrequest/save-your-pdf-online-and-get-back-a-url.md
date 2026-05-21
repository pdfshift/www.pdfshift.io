---
title: "Save your PDF online and get back a URL"
description: "Learn how to save your PDF online and get back a URL using C# and the HTTPWebRequest library. This guide offers detailed steps with code samples in C# and the HTTPWebRequest library, showing how to store PDFs in cloud storage and retrieve URLs."
language: 'C#'
library: 'HTTPWebRequest'
property: 'output'
output: 'url'
related: ['save-your-pdf-to-your-amazon-s3-bucket', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to save your PDF online and get back a URL using C# and the HTTPWebRequest library.

When generating PDFs, you might want to store them in cloud storage and get a URL to access them later.

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
    // Save PDF to cloud storage and get URL
    output = new
    {
        type = "url",
        url = "https://your-storage.com/"
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

This allows you to store PDFs in cloud storage and access them via URLs.