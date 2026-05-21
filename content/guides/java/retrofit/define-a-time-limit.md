---
title: "Define a time limit"
description: "Learn how to define a time limit for PDF conversions using Java and the Retrofit library. This guide offers detailed steps with code samples in Java and the Retrofit library, showing how to set timeouts to prevent long-running conversions."
language: 'Java'
library: 'Retrofit'
property: 'timeout'
output: 'pdf'
related: ['avoid-conversion-on-error', 'define-a-time-limit']
default: false
---

In this guide, we'll show you how to define a time limit for PDF conversions using Java and the Retrofit library.

When converting documents to PDF, you might want to set a timeout to prevent long-running conversions from blocking your application.

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
payload.addProperty("timeout", 30);

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

This allows you to control how long a conversion can take before timing out.