---
language: 'CSharp'
library: 'HttpClient'
link: 'https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-5.0'
---

[HttpClient](https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-5.0) is a class provided by the .NET framework that facilitates making HTTP requests and receiving HTTP responses. It offers a simple and flexible API for performing tasks such as sending GET, POST, PUT, and DELETE requests, handling headers and content, managing cookies, and configuring timeouts and other request parameters. HttpClient is widely used in C# for consuming web services, accessing RESTful APIs, and performing web scraping and automation tasks.

```csharp
using System;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

public class PDFShiftConverter
{
    private readonly HttpClient _client;
    private readonly string _apiKey;

    public PDFShiftConverter(string apiKey)
    {
        _apiKey = apiKey;
        _client = new HttpClient();
    }

    public async Task Convert(string endpoint, object parameters, string filePath)
    {
        if (!new[] { "pdf", "png", "jpg", "webp" }.Contains(endpoint))
            throw new ArgumentException("Invalid endpoint");

        var request = new HttpRequestMessage(HttpMethod.Post, $"https://api.pdfshift.io/v3/convert/{endpoint}")
        {
            Content = new StringContent(JsonSerializer.Serialize(parameters), System.Text.Encoding.UTF8, "application/json")
        };
        request.Headers.Add("Authorization", $"Basic {Convert.ToBase64String(System.Text.Encoding.ASCII.GetBytes($"api:{_apiKey}"))}");

        var response = await _client.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var jsonResponse = await response.Content.ReadAsStringAsync();

        var dict = JsonSerializer.Deserialize<Dictionary<string,object>>(jsonResponse);
        if(dict.ContainsKey("filename") || dict.ContainsKey("webhook"))
        {
            return dict;
        }

        var binaryContent = await response.Content.ReadAsByteArrayAsync();

        await File.WriteAllBytesAsync(filePath, binaryContent);
    }
}
```

```csharp
new PDFShiftConverter("sk_XXXXXXXXXXXXXX")
    .Convert("pdf", new { source = "https://en.wikipedia.org/wiki/REST" }, "result.pdf")
    .GetAwaiter()
    .GetResult();
```
