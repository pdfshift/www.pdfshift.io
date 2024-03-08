---
language: 'Java'
library: 'Retrofit'
link: 'https://square.github.io/retrofit/'
---

[Retrofit](https://square.github.io/retrofit/) is a type-safe HTTP client library for Java and Android. It simplifies the process of consuming RESTful web services by generating Java interface definitions based on RESTful API endpoints. Retrofit handles the boilerplate code for making HTTP requests and parsing responses, making it easy to work with web APIs in Java applications.

```java
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import org.json.JSONObject;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class PDFConverter {

    private static final MediaType JSON
            = MediaType.get("application/json; charset=utf-8");

    private static OkHttpClient client = new OkHttpClient();

    static byte[] convert(String apiKey, JSONObject params, String endpoint) throws IOException {
        if (!endpoint.equals("pdf") && !endpoint.equals("png") && !endpoint.equals("jpg") && !endpoint.equals("webp")) {
            throw new IllegalArgumentException("Invalid endpoint");
        }

        String url = "https://api.pdfshift.io/v3/convert/" + endpoint;

        RequestBody body = RequestBody.create(params.toString(), JSON);
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("Authorization", "Basic " + java.util.Base64.getEncoder().encodeToString(("api:" + apiKey).getBytes()))
                .build();
        Response response = client.newCall(request).execute();

        if (!response.isSuccessful()) {
            throw new IOException("Unexpected code " + response);
        }

        if (params.has("filename") || params.has("webhook")) {
            // Return in JSON in this case
            return new Gson().fromJson(new String(response.body().bytes()), JsonObject.class).toString().getBytes();
        }

        // Returns the bytes
        return response.body().bytes();
    }
}
```

```java
public static void main(String[] args) throws IOException {
    JSONObject params = new JSONObject();
    params.put("source", "https://en.wikipedia.org/wiki/REST");
    byte[] binary = convert("sk_XXXXXXXXXXXXXX", params, "pdf");
    Files.write(Paths.get("result.pdf"), binary);
}
```
