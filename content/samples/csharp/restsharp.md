---
language: 'CSharp'
library: 'RestSharp'
link: 'https://restsharp.dev/'
---

[RestSharp](https://restsharp.dev/) is a popular third-party library that simplifies making HTTP requests and handling responses in .NET applications. It provides an intuitive and easy-to-use API for interacting with RESTful web services, enabling developers to perform common HTTP operations such as GET, POST, PUT, DELETE, and more. RestSharp abstracts away the complexities of HTTP communication, streamlining the process of consuming web APIs and processing their responses.

```csharp
using RestSharp;
using System;
using System.IO;
using Newtonsoft.Json;
using RestSharp.Authenticators;

public class Conversion
{
    private RestClient Client;
    string api_key = "sk_XXXXXXXXXXXXXX";

    public Conversion(string api_key, string endpoint = "pdf") 
    {
        if (! (new[] {"pdf", "png", "jpg", "webp"}.Contains(endpoint))) 
        {
            throw new ArgumentException("Invalid endpoint");
        }

        Client = new RestClient("https://api.pdfshift.io/v3/convert/" + endpoint)
        this.api_key = api_key;
    }

    public byte[] Convert(dynamic parameters) 
    {
        RestRequest Request = new RestRequest(Method.POST);
        Request.AddHeader("X-API-Key", this.api_key);
        Request.AddJsonBody(parameters);
        var response = Client.Execute(Request);

        if(response.IsSuccessful)
        {
            if (parameters.ContainsKey("filename") || parameters.ContainsKey("webhook")) 
            {
                return System.Text.Encoding.Default.GetBytes(response.Content);
            }
            return response.RawBytes;
        }
        else
        {
            throw new Exception(response.ErrorMessage);
        }
    }
}
```

```csharp
Conversion conversion = new Conversion("sk_XXXXXXXXXXXXXX");
var json = new {
    source = "https://en.wikipedia.org/wiki/REST"
}

byte[] response = conversion.Convert(parameters);
File.WriteAllBytes("result.pdf", response);
```
