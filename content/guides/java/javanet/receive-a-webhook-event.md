---
title: "Receive a webhook event"
description: "Learn how to receive webhook events when PDF conversion is complete using Java and the Java.net library. This guide offers detailed steps with code samples in Java and the Java.net library, showing how to handle asynchronous conversion notifications."
language: 'Java'
library: 'Java.net'
property: 'webhook'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'avoid-conversion-on-error']
default: false
---

In this guide, we'll show you how to receive webhook events when PDF conversion is complete using Java and the Java.net library.

When converting documents asynchronously, you might want to be notified when the conversion is complete via a webhook.

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
    "  \"webhook\": {\n" +
    "    \"url\": \"https://your-server.com/webhook\"\n" +
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

// PDFShift will POST a JSON body with the PDF's URL to your webhook.
String body = new String(connection.getInputStream().readAllBytes(), "utf-8");
System.out.println(body);
```

This allows you to be notified when conversions are complete without polling.