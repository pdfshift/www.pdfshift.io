---
language: 'Java'
library: 'java.net'
link: 'https://cr.openjdk.org/~egahlin/jep-349/javadocs/api/java.base/java/net/package-summary.html'
---

[java.net](https://cr.openjdk.org/~egahlin/jep-349/javadocs/api/java.base/java/net/package-summary.html) is a package in the Java standard library that provides functionalities for networking operations. It includes classes and interfaces for working with URLs, establishing network connections, sending and receiving data over sockets, and handling network protocols.


```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class Convert {
    public static byte[] convert(String apiKey, JsonObject params, String endpoint) throws Exception {
        if (!"pdf".equals(endpoint) && !"png".equals(endpoint) && !"jpg".equals(endpoint) && !"webp".equals(endpoint)) {
            throw new IllegalArgumentException("Invalid endpoint.");
        }

        URL url = new URL("https://api.pdfshift.io/v3/convert/" + endpoint);
        
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("X-API-Key", apiKey);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.getOutputStream().write(params.toString().getBytes());
        
        int responseCode = conn.getResponseCode();
        if(responseCode != 200) {
            throw new RuntimeException("HTTP POST failed with error code : " + responseCode);
        }

        InputStream is = conn.getInputStream();
        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        int nRead;
        byte[] data = new byte[1024];
        while ((nRead = is.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
        }
        buffer.flush();
        
        if(params.has("filename") || params.has("webhook")) {
            return new Gson().fromJson(new String(buffer.toByteArray()), JsonObject.class).toString().getBytes();
        }

        return buffer.toByteArray();
    }
}
```

```java
public static void main(String[] args) throws Exception {
    String endpoint = "pdf";
    String apiKey = "sk_XXXXXXXXXXXXXX";
    JsonObject params = new JsonObject();
    params.addProperty("source", "https://en.wikipedia.org/wiki/REST");
    byte[] result = convert(apiKey, params, endpoint); 
    
    OutputStream outStream = new FileOutputStream("result.pdf");
    outStream.write(result);
    outStream.close();
}
```
