---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Java and the HttpClient library. This guide offers detailed steps with code samples in Java and the HttpClient library, highlighting how you can access page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Java'
library: 'HttpClient'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: true
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Java and the HttpClient library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

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
        "  \"auth\": {\n" +
        "    \"username\": \"user\",\n" +
        "    \"password\": \"password\"\n" +
        "  }\n" +
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

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.