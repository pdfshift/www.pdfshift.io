---
title: "Loading JavaScript from a URL"
description: "Learn how to load JavaScript from a URL when converting HTML to PDF using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to reference external JavaScript files."
language: 'Java'
library: 'HttpClient'
property: 'javascript'
output: 'pdf'
related: ['loading-javascript-from-a-string', 'waiting-for-a-custom-element-to-be-ready']
default: false
---

In this guide, we'll show you how to load JavaScript from a URL when converting HTML to PDF using Java and the HttpClient library.

When converting HTML to PDF, you might want to reference external JavaScript files to include dynamic functionality.

```java
import java.net.http.*;
import java.net.URI;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
    .header("X-API-Key", apiKey)
    .header("Content-Type", "application/json")
    .POST(BodyPublishers.ofString("{\n" +
        "  \"source\": \"https://www.example.com\",\n" +
        "  \"javascript\": \"https://example.com/script.js\"\n" +
        "}"))
    .build();

HttpResponse<byte[]> response = client.send(request, BodyHandlers.ofByteArray());

// Handle errors:
if (response.statusCode() >= 400) {
    throw new RuntimeException("Request failed with status code " + response.statusCode());
}

java.nio.file.Files.write(java.nio.file.Paths.get("result.pdf"), response.body());

System.out.println("The PDF document was generated and saved to result.pdf");
```

This allows you to include external JavaScript libraries in your PDFs.