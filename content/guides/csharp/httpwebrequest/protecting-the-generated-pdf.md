---
title: "Protecting the generated PDF"
description: "Learn how to protect generated PDFs with passwords using C# and the HTTPWebRequest library. This guide offers detailed steps with code samples in C# and the HTTPWebRequest library, showing how to secure your PDF documents."
language: 'C#'
library: 'HTTPWebRequest'
property: 'protection'
output: 'pdf'
related: ['adding-an-image-watermark', 'adding-a-text-watermark']
default: false
---

In this guide, we'll show you how to protect generated PDFs with passwords using C# and the HTTPWebRequest library.

When generating PDFs, you might want to add password protection to restrict access.

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
    // Protect the PDF with a password
    protection = new
    {
        user_password = "user123",
        owner_password = "owner123"
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

This allows you to secure your PDF documents with passwords.