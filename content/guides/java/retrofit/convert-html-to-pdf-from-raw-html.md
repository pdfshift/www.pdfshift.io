---
title: "Convert HTML to PDF from raw HTML"
description: "Learn how to convert raw HTML to PDF using Java and the Retrofit library. This guide offers detailed steps with code samples in Java and the Retrofit library, showing how to convert HTML content directly to PDF."
language: 'Java'
library: 'Retrofit'
property: 'source'
output: 'pdf'
related: ['convert-html-to-pdf-from-a-url', 'loading-css-from-a-string']
default: true
---

In this guide, we'll show you how to convert raw HTML to PDF using Java and the Retrofit library.

Converting raw HTML content to PDF is useful when you have HTML content that isn't hosted on a web server.

```java
import retrofit2.*;
import retrofit2.converter.gson.GsonConverterFactory;
import com.google.gson.*;
import java.io.IOException;

// You can get an API key at https://pdfshift.io
public interface PdfShiftApi {
    @POST("v3/convert/pdf")
    Call<ResponseBody> convertToPdf(
        @Header("X-API-Key") String apiKey,
        @Body JsonObject body
    );
}

// Usage
Gson gson = new GsonBuilder().create();
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.pdfshift.io/")
    .addConverterFactory(GsonConverterFactory.create(gson))
    .build();

PdfShiftApi api = retrofit.create(PdfShiftApi.class);

JsonObject payload = new JsonObject();
payload.addProperty("source", "<html><body><h1>Hello World</h1></body></html>");

Call<ResponseBody> call = api.convertToPdf("sk_xxxxxxxxxxxx", payload);
Response<ResponseBody> response = call.execute();

// Handle errors:
if (!response.isSuccessful()) {
    throw new IOException("Request failed with status code " + response.code());
}

ResponseBody responseBody = response.body();
if (responseBody != null) {
    java.nio.file.Files.write(
        java.nio.file.Paths.get("result.pdf"), 
        responseBody.bytes()
    );
}

System.out.println("The PDF document was generated and saved to result.pdf");
```

This allows you to convert HTML content directly to PDF without needing a URL.