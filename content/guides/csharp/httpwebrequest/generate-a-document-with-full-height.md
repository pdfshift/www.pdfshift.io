---
title: "Generate a document with full height"
description: "Learn how to generate a document with full height using C# and the HTTPWebRequest library. This guide offers detailed steps with code samples in C# and the HTTPWebRequest library, showing how to create full-height PDFs."
language: 'C#'
library: 'HTTPWebRequest'
property: 'full_height'
output: 'pdf'
related: ['exporting-only-a-specific-set-of-pages', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to generate a document with full height using C# and the HTTPWebRequest library.

When converting documents to PDF, you might want to ensure the entire document height is preserved.

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
    // Generate document with full height
    full_height = true
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

This ensures the entire document content is included in the PDF.