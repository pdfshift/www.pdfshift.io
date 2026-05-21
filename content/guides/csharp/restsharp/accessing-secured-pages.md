---
title: "Accessing secured pages"
description: "Learn how to access secured pages using C# and the RestSharp library. This guide offers detailed steps with code samples in C# and the RestSharp library, highlighting how you can access page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'C#'
library: 'RestSharp'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: true
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using C# and the RestSharp library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

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
    // You can set a basic authentication by passing the "auth" property which contains a username and password
    auth = new
    {
        username = "user",
        password = "password"
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

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.