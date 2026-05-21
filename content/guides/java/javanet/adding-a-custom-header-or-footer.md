---
title: "Adding a custom header or footer"
description: "Learn how to add custom headers and footers to your PDFs using Java and the Java.net library. This guide offers detailed steps with code samples in Java and the Java.net library, showing how to customize PDF appearance with headers and footers."
language: 'Java'
library: 'Java.net'
property: 'header'
output: 'pdf'
related: ['loading-css-from-a-string', 'loading-css-from-a-url']
default: false
---

In this guide, we'll show you how to add custom headers and footers to your PDFs using Java and the Java.net library.

When generating PDFs, you might want to add custom headers and footers to your documents for branding or informational purposes.

```java
import java.net.*;
import java.io.*;

// You can get an API key at https://pdfshift.io
String apiKey = "sk_xxxxxxxxxxxx";

URL url = new URL("https://api.pdfshift.io/v3/convert/pdf");
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
connection.setRequestMethod("POST");
connection.setRequestProperty("X-API-Key", apiKey);
connection.setRequestProperty("Content-Type", "application/json");
connection.setDoOutput(true);

String payload = "{\n" +
    "  \"source\": \"https://www.example.com\",\n" +
    "  \"header\": {\n" +
    "    \"content\": \"<div style='text-align: center;'>Header Content</div>\",\n" +
    "    \"height\": \"20mm\"\n" +
    "  },\n" +
    "  \"footer\": {\n" +
    "    \"content\": \"<div style='text-align: center;'>Footer Content</div>\",\n" +
    "    \"height\": \"20mm\"\n" +
    "  }\n" +
    "}";

try (OutputStream os = connection.getOutputStream()) {
    byte[] input = payload.getBytes("utf-8");
    os.write(input, 0, input.length);
}

int responseCode = connection.getResponseCode();

// Handle errors:
if (responseCode >= 400) {
    throw new RuntimeException("Request failed with status code " + responseCode);
}

InputStream inputStream = connection.getInputStream();
FileOutputStream outputStream = new FileOutputStream("result.pdf");
byte[] buffer = new byte[1024];
int bytesRead;
while ((bytesRead = inputStream.read(buffer)) != -1) {
    outputStream.write(buffer, 0, bytesRead);
}
outputStream.close();
inputStream.close();

System.out.println("The PDF document was generated and saved to result.pdf");
```

This allows you to add consistent branding elements to all your generated PDF documents.