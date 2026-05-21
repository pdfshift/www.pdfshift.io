---
title: "Loading CSS from a URL"
description: "Learn how to load CSS from a URL when converting HTML to PDF using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, showing how to reference external CSS files."
language: 'Java'
library: 'HttpClient'
property: 'css'
output: 'pdf'
related: ['loading-css-from-a-string', 'convert-html-to-pdf-from-a-url']
default: false
---

In this guide, we'll show you how to load CSS from a URL when converting HTML to PDF using Java and the HttpClient library.

When converting HTML to PDF, you might want to reference external CSS files to maintain consistent styling.

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
        "  \"css\": \"https://example.com/styles.css\"\n" +
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

This allows you to apply external stylesheets to your PDFs.