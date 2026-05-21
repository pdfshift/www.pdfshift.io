---
title: "Exporting only a specific set of pages"
description: "Learn how to export only specific pages from a document when converting to PDF using Java and the Java.net library. This guide offers detailed steps with code samples in Java and the Java.net library, showing how to select specific pages for export."
language: 'Java'
library: 'Java.net'
property: 'pages'
output: 'pdf'
related: ['generate-a-document-with-full-height', 'save-your-pdf-online-and-get-back-a-url']
default: false
---

In this guide, we'll show you how to export only specific pages from a document when converting to PDF using Java and the Java.net library.

When converting documents, you might want to export only a specific range of pages rather than the entire document.

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
    "  \"pages\": \"1-3\"\n" +
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

This allows you to selectively export pages from multi-page documents.