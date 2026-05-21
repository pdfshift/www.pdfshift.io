---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDFs using C# and the HTTPWebRequest library. This guide offers detailed steps with code samples in C# and the HTTPWebRequest library, showing how to customize PDF appearance with headers and footers."
language: 'C#'
library: 'HTTPWebRequest'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers and footers to your PDFs using C# and the HTTPWebRequest library.

When generating PDFs, you might want to add custom headers and footers to your documents for branding or informational purposes.

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

This allows you to add consistent branding elements to all your generated PDF documents.