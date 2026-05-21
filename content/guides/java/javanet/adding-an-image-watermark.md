---
title: "Adding an image watermark"
description: "Learn how to add image watermarks to your PDFs using Java and the Java.net library. This guide offers detailed steps with code samples in Java and the Java.net library, showing how to apply image watermarks to protect your documents."
language: 'Java'
library: 'Java.net'
property: 'watermark'
output: 'pdf'
related: ['adding-a-text-watermark', 'protecting-the-generated-pdf']
default: false
---

In this guide, we'll show you how to add image watermarks to your PDFs using Java and the Java.net library.

When generating PDFs, you might want to add image watermarks to your documents for protection or branding purposes.

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
    "  \"watermark\": {\n" +
    "    \"image\": \"https://example.com/watermark.png\",\n" +
    "    \"opacity\": 0.5,\n" +
    "    \"position\": \"center\"\n" +
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

This allows you to add visual protection to your documents with custom images.