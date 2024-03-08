---
language: 'CSharp'
library: 'HttpWebRequest'
link: 'https://docs.microsoft.com/en-us/dotnet/api/system.net.httpwebrequest?view=net-5.0'
---

[HttpWebRequest](https://docs.microsoft.com/en-us/dotnet/api/system.net.httpwebrequest?view=net-5.0) is a class provided by the .NET framework that allows developers to create and send HTTP requests to a web server and retrieve the corresponding HTTP responses. It provides a lower-level API compared to HttpClient, allowing for more fine-grained control over HTTP request parameters and headers. HttpWebRequest is suitable for scenarios where customizations beyond the capabilities of HttpClient are required, such as working with non-standard protocols or handling specific authentication methods.

```csharp
using System;
using System.IO;
using System.Net;
using System.Text;

public class ConversionAPIWrapper
{
    public static string Convert(string apiKey, string parameters, string endpoint = "pdf")
    {
        if (! (new[] {"pdf", "png", "jpg", "webp"}.Contains(endpoint))) 
        {
            throw new ArgumentException("Invalid endpoint");
        }

        string apiUrl = $"https://api.pdfshift.io/v3/convert/{endpoint}";
        string credentials = Convert.ToBase64String(Encoding.ASCII.GetBytes("api:" + apiKey));
        HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create(new Uri(apiUrl));
        request.Method = "POST";
        request.Headers["Authorization"] = "Basic " + credentials;
        request.ContentType = "application/json";
        byte[] bytes = Encoding.ASCII.GetBytes(parameters);
        using (Stream requestStream = request.GetRequestStream())
        {
            requestStream.Write(bytes, 0, bytes.Length);
        }
        using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
        {
            if (response.StatusCode == HttpStatusCode.OK)
            {
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    return reader.ReadToEnd();
                }
            }
            else
            {
                throw new Exception("API request failed: " + response.StatusCode.ToString());
            }
        }
    }
}
```

```csharp
string paramsJson = File.ReadAllText("params.json");  // Assuming parameters are stored inside a JSON file
string binaryResponse = ConversionAPIWrapper.Convert("sk_XXXXXXXXXXXXXX", paramsJson);
File.WriteAllText("result.pdf", binaryResponse);
```
