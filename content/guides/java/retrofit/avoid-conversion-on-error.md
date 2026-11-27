---
title: "Avoid conversion on error"
description: "Learn how to avoid conversion on error using Java and the Retrofit library. This guide offers detailed steps with code samples in Java and the Retrofit library, showing how to handle conversion errors gracefully."
language: 'Java'
library: 'Retrofit'
property: 'raise_for_status'
output: 'pdf'
related: ['define-a-time-limit', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how to avoid conversion on error using Java and the Retrofit library.

When converting documents to PDF, you might want to prevent conversion if certain errors occur to avoid generating invalid PDFs. With `raise_for_status` set to `true`, PDFShift won't convert the document when the source URL answers with a non-2XX status.

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
payload.addProperty("source", "https://www.example.com");
payload.addProperty("raise_for_status", true);

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

This allows you to fail fast when conversion issues occur.