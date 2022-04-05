---
title: Convert any HTML to PDF using Java
description: A guide to get started in converting your HTML documents or URLs to PDF using PDFShift and Java.
language: java
logo: java.svg
---

# How to convert HTML to PDF in Java

PDFShift provides a powerful API that let you convert any HTML documents to PDF using a simple POST request.
Java is a powerful programing language that works well with PDFShift. We will use the `org.apache.http` library to do our requests.

## Documentation

See the full documentation on [PDFShift's documentation](https://docs.pdfshift.io/).

## Installation

For this we'll use Java 11's new HttpClient. But you can use any version of Java and any HTTP library of your choice. 
We use Java 11 here to avoid adding extra level of dependency.

### Requirements

* Java 11
* org.json

If you use maven for dependency management add 

```xml
<dependency>
    <groupId>org.json</groupId>
    <artifactId>json</artifactId>
    <version>20180130</version>
</dependency>
```

If you use gradle, add

```groovy
compile "org.json:json:20180130"
```

## [Usage](#usage)

Your HTTP requests needs to be configured with your `api_key` received when creating an account.
Setting it is easy as:

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://example.com");
        jsonObject.put("sandbox", true);

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        // Save the file locally
        var targetFile = new File("src/main/resources/targetFile.pdf");
        Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }
}
```

We also highly recommend checking for errors after the conversion is made, before processing the document, in order to avoid issues later on.

The `sandbox` parameter allows you to do unlimited conversion, but will add a watermark on top of the generated document.
No credits are deduced from your account when the sandbox mode is on.

### [With a URL](#with-a-url)

Converting an URL with PDFShift is really easy. All you have to do is send a POST request with the `source` parameter set to the URL, like the following:

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://example.com");
        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```

### [With inline HTML data](#with-inline-html-data)


```java
import org.json.JSONObject;

import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        byte[] encoded = Files.readAllBytes(Paths.get("src/main/resources/example.html"));
        String documentContent = new String(encoded, Charset.defaultCharset());

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("source", documentContent);
        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```

### [Save the file to Amazon S3 and get a URL instead](#save-the-file-to-amazon-s3-and-get-a-url-instead)

By passing the `filename` parameter to your request, you will receive a JSON response instead of the binary PDF, with a `url` key that contains the path to the file stored on Amazon S3.
All files stored on Amazon S3 are kept for two days, then automatically deleted.

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("source", "https://example.com");
        jsonObject.put("filename", "result.pdf");
        
        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofFile(Paths.get("src/main/resources/body.json")))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Response body is a json string. 
            var result = new JSONObject(response.body());
            System.out.println(result.get("url"));
        } else {
            // error occurred
        }
    }
}
```


### [Custom HTTP Headers](#custom-http-headers)

You can pass custom HTTP headers, allowing you to adapt to the server handling your source. This can be a custom identification header, changing the language, or anything else.

```java
import org.json.JSONObject;

import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.Duration;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://example.com");

        var headers = new JSONObject();
        headers.put("X-Original-Header", "Awesome value");
        headers.put("user-agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0");

        jsonObject.put("headers", headers);

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        // Save the file locally
        var targetFile = new File("src/main/resources/targetFile.pdf");
        Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
    }
}
```


### [Accessing secured pages](#accessing-secured-pages)

If your `source` requires a BASIC AUTH mechanism, you can either use the custom headers part or use the `auth` parameter from the API that behaves the same.

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://httpbin.org/basic-auth/user/passwd");

        var auth = new JSONObject();
        auth.put("username", "user");
        auth.put("password", "passwd");
        
        jsonObject.put("auth", auth);

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```

### [Using cookies](#using-cookies)

Cookies might help you access unauthorized areas that aren't restricted by a simple Basic Auth mechanism. You can define as many cookies as you want.

body.json
```json
{
"source": "https://httpbin.org/cookies",
"cookies": [{"name": "session", "value": "4cb496a8-a3eb-4a7e-a704-f993cb6a4dac"}],
"sandbox": true
}
```

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;
import org.json.JSONArray;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://httpbin.org/cookies");

        var cookie = new JSONObject();
        cookie.put("name", "session");
        cookie.put("value", "4cb496a8-a3eb-4a7e-a704-f993cb6a4dac");

        var cookies = new JSONArray();
        cookies.put(cookie);

        jsonObject.put("cookies", cookies);

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```


### [Loading CSS from a URL](#loading-css-from-a-url)

By passing a `css` parameter, you will be able to modify the page with your CSS.
This allows you to customize the rendering of the page.

You can also call multiple CSS by calling a root CSS (like "print.css" in that case) that will call @import in it for each CSS files.

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://www.example.com");
        jsonObject.put("css", "https://www.example.com/public/css/print.css");

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```


### [Loading CSS from a string](#loading-css-from-a-string)

Like for the `source` parameter, you can pass a raw set of CSS rules to the `css` parameter and they will be injected to the loaded document.

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://www.example.com");
        jsonObject.put("css", "a {text-decoration: underline; color: blue}");

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```

### [Adding Watermark](#adding-watermark)

Some documents that you share need a watermark to clearly identify your brand. That's easy with PDFShift:

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://www.example.com");
        
        var watermark = new JSONObject();
        watermark.put("image", "https://pdfshift.io/static/img/logo.png");
        watermark.put("offset_x", 50);
        watermark.put("offset_y", "100px");
        watermark.put("rotate", 45);

        jsonObject.put("watermark", watermark);

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```

### [Custom Header or Footer](#custom-header-or-footer)

You can add some custom header or footer to your generated document. These are often used to indicate the current page, or show the logo of your company on every page.

Note that the header and footer **are not related to the body**. For this reason, the CSS in your body doesn't apply to your header/footer.
By default, the font-size will be really small. You will have to set it manually, like in the following example:

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://www.example.com");

        var footer = new JSONObject();
        footer.put("source", "<div style='font-size: 12px'>Page {{ "{{page}}" }} of {{ "{{total}}" }}</div>");
        footer.put("spacing", "50px");

        jsonObject.put("footer", footer);

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```

### [Protecting the generated PDF](#protecting-the-generated-pdf)

Protecting your document is easy with PDFShift. You can specify a password for the user and for the owner.
(The owner will have full rights access while the user will have limited access based on your choice).

Please keep in mind that some PDF reader doesn't respect the rights as long as the user is authenticated.
This means that if you set an empty password for the user, with no rights to print or copy, some PDF reader will ignore this and still allow printing and copying.

This is outside of our capabilities here at PDFShift as we can't enforce a reader to respect PDF's standard.

```java
import java.io.File;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import org.json.JSONObject;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        var jsonObject = new JSONObject();
        jsonObject.put("source", "https://www.example.com");

        var protection = new JSONObject();
        protection.put("user_password", "user");
        protection.put("owner_password", "owner");
        protection.put("no_print", true);

        jsonObject.put("protection", protection);

        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(20))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();

        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // Save the file locally
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}
```


### [Real life example - Sending an invoice by email](#real-life-example)

One frequent use of PDFShift is to generate an invoice when receiving a payment, and sending that invoice - in PDF format - by email, to the customer.

For this, we’re going to look at sending an email with attachments – using the core Java mail library. You will need the Java mail library in your path.
If your project is a maven project, add the following lines in your pom.xml

```xml
<dependency>
    <groupId>javax.mail</groupId>
    <artifactId>mail</artifactId>
    <version>1.5.0-b01</version>
</dependency>
```

If it's a gradle project then add this to your dependencies

```groovy
    compile 'javax.mail:mail:1.5.0-b01'
```

For this tutorial I'll use this email service https://mailtrap.io. It's a fake email service provider used for development purposes.
Create a free account on https://mailtrap.io and you'll get a username and password to use here. You can convert and send email using the code below

```java
import org.json.JSONObject;

import javax.mail.*;
import java.io.File;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.util.Properties;

public class Application {

    private static final String API_KEY = "api:your_api_key";

    public static void main(String... args) throws Exception {
        byte[] encoded = Files.readAllBytes(Paths.get("src/main/resources/example.html"));
        String documentContent = new String(encoded, Charset.defaultCharset());
    
        var jsonObject = new JSONObject();
        jsonObject.put("source", documentContent);
        
        var httpRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.pdfshift.io/v3/convert/pdf"))
                .timeout(Duration.ofSeconds(10))
                .header("Content-Type", "application/json")
                .header("Authentication", "Basic " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonObject.toString()))
                .build();

        var httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();
        var response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofInputStream());

        var statusCode = response.statusCode();
        if (statusCode == 200 || statusCode == 201) {
            // save pdf to file targetFile.pdf
            var targetFile = new File("src/main/resources/targetFile.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

            // Send pdf as email attachment
            var prop = new Properties();
            prop.put("mail.smtp.auth", true);
            prop.put("mail.smtp.starttls.enable", "true");
            prop.put("mail.smtp.host", "smtp.mailtrap.io");
            prop.put("mail.smtp.port", "25");
            prop.put("mail.smtp.ssl.trus", "smtp.mailtrap.io");

            var username = "get username from mailtrap.io";
            var password = "get password from mailtrap.io";

            var session = Session.getInstance(prop, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(username, password);
                }
            });

            var message = new MimeMessage(session);
            message.setFrom(new InternetAddress("from@gmail.com"));
            message.setRecipients(
                    Message.RecipientType.TO, InternetAddress.parse("to@gmail.com")
            );
            message.setSubject("Mail Subject");

            var attachment = new File("src/main/resources/targetFile.pdf");

            var mimeBodyPart = new MimeBodyPart();
            mimeBodyPart.setContent("Just ignore this message", "text/plain");
            mimeBodyPart.attachFile(attachment);

            var multipart = new MimeMultipart();
            multipart.addBodyPart(mimeBodyPart);

            message.setContent(multipart);

            Transport.send(message);
        } else {
            System.out.println("Error occured");
        }
    }
}
```