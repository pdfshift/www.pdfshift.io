---
title: "Accessing secured pages"
description: "Learn how to access secured pages using Java and the Retrofit library. This guide offers detailed steps with code samples in Java and the Retrofit library, highlighting how you can access page protected by basic authentication to convert them to PDF using PDFShift's API."
language: 'Java'
library: 'Retrofit'
property: 'auth'
output: 'pdf'
related: ['send-custom-http-headers', 'using-cookies']
default: true
---

In this guide, we'll show you how to access secured page (protected by basic authentication) using Java and the Retrofit library to convert them to PDF using PDFShift's API.

When you're converting a document, you might want to access a secured page (protected by basic authentication) to convert it to PDF. This can be done by setting the `auth` parameter to the request.

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
JsonObject auth = new JsonObject();
auth.addProperty("username", "user");
auth.addProperty("password", "password");
payload.add("auth", auth);

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

This allows you to protect your documents from any visitors while allowing PDFShift to access the page and convert it to PDF.