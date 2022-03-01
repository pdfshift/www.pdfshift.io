---
title: Convert any HTML to PDF using C&#35;
description: A guide to get started in converting your HTML documents or URLs to PDF using PDFShift and C&#35;.
language: csharp
---

# How to convert HTML to PDF in C&#35;

Converting an HTML document to PDF with PDFShift is easy in C#. This guide show you how.

## [Documentation](#documentation)

See the full documentation on [PDFShift's documentation](https://docs.pdfshift.io/).

## [Requirements](#requirements)

* .Net framework v4.7.2
* RestSharp (tested with version 106.6.7)
* NewtonsoftJson (tested with version 12.0.1)

## [Usage](#usage)

Using C&#35; `RestClient` package, you can send a POST request toward PDFShift's API by simply passing your `api_key` as the user parameter of a basic authentication.
The `api_key` is the one you received by email when creating your account, or any you created from your dashboard.
Setting it is easy as:

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://www.example.com",
                sandbox = true
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

We also highly recommend checking for errors after the conversion is made, before processing the document, in order to avoid issues later on.

The `sandbox` parameter allows you to do unlimited conversion, but will add a watermark on top of the generated document.
No credits are deduced from your account when the sandbox mode is on.

### [With a URL](#with-a-url)

Converting an URL with PDFShift is really easy. All you have to do is send a POST request with the `source` parameter set to the URL, like the following:

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://www.example.com"
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [With inline HTML data](#with-inline-html-data)

To convert a raw HTML data with PDFShift, simply send the raw string in the `source` parameter:

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            string documentContent = File.ReadAllText("document.html");
            var json = new
            {
                source = documentContent
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [Save the file to Amazon S3 and get an URL instead](#save-file-to-amazon-s3)

By passing the `filename` parameter to your request, you will receive a JSON response instead of the binary PDF, with a `url` key that contains the path to the file stored on Amazon S3.
All files stored on Amazon S3 are kept for two days, then automatically deleted.

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://www.example.com",
                filename = "result.pdf"
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                var jObject = JObject.Parse(response.Content);
                Console.WriteLine(jObject["url"].Value<string>());
            }
        }
    }
}
```

### [Custom HTTP Headers](#custom-http-headers)

You can pass custom HTTP headers, allowing you to adapt to the server handling your source. This can be a custom identification header, changing the language, or anything else.

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            Dictionary<string, object> dict = new Dictionary<string, object>();
            dict.Add("source", "https://httpbin.org/headers");
            dict.Add("http_headers", new Dictionary<string, string>() { { "X-Original-Header", "Awesome value" },{ "user-agent", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0" } });

            request.AddJsonBody(dict);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [Accessing secured pages](#accessing-secured-pages)

If your `source` requires a BASIC AUTH mechanism, you can either use the custom headers part or use the `auth` parameter from the API that behaves the same.

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://httpbin.org/basic-auth/user/passwd",
                auth = new { username = "user", password = "passwd" }
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [Using cookies](#using-cookies)

Cookies might help you access unauthorized areas that aren't restricted by a simple Basic Auth mechanism. You can define as many cookies as you want.

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://httpbin.org/cookies",
                cookies = new object[] { new { name = "Session", value = "4cb496a8-a3eb-4a7e-a704-f993cb6a4dac" } }
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```


### [Loading CSS from a URL](#loading-css-from-url)

By passing a `css` parameter, you will be able to modify the page with your CSS.
This allows you to customize the rendering of the page.

You can also call multiple CSS by calling a root CSS (like "print.css" in that case) that will call @import in it for each CSS files.

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://www.example.com",
                css = "https://pdfshift-dev.netlify.com/css/general.css"
            };
            request.AddJsonBody(json);


            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [Loading CSS from a string](#loading-css-from-string)

Like for the `source` parameter, you can pass a raw set of CSS rules to the `css` parameter and they will be injected to the loaded document.

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://www.example.com",
                css = "p {text-decorathhion: underline; color: red}"
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [Adding Watermark](#adding-watermark)

Some documents that you share need a watermark to clearly identify your brand. That's easy with PDFShift:

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://www.example.com",
                watermark = new { image = "https://pdfshift-dev.netlify.com/images/logo/logo-violet.png", offset_x = 50, offset_y = "100px", rotate = 45 }

            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [Custom Header (or Footer)](#custom-header-footer)

You can add some custom header or footer to your generated document. These are often used to indicate the current page, or show the logo of your company on every page.

Note that the header and footer **are not related to the body**. For this reason, the CSS in your body doesn't apply to your header/footer.
By default, the font-size will be really small. You will have to set it manually, like in the following example:

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);

            var json = new
            {
                source = "https://www.example.com",
                footer = new { source = "<div style=\"font-size: 12px\">Page {{ "{{page}}" }} of {{ "{{total}}" }}</div>", spacing = "50px" }
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [Protecting the generated PDF](#protecting-the-pdf)

Protecting your document is easy with PDFShift. You can specify a password for the user and for the owner.
(The owner will have full rights access while the user will have limited access based on your choice).

Please keep in mind that some PDF reader doesn't respect the rights as long as the user is authenticated.
This means that if you set an empty password for the user, with no rights to print or copy, some PDF reader will ignore this and still allow printing and copying.

This is outside of our capabilities here at PDFShift as we can't enforce a reader to respect PDF's standard.

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);
            var json = new
            {
                source = "https://www.example.com",
                protection = new { user_password = "user", owner_password = "owner", no_print = true }
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("result.pdf", response.RawBytes);
            }
        }
    }
}
```

### [Real life example - Sending an invoice by email](#real-life-example)

One frequent use of PDFShift is to generate an invoice when receiving a payment, and sending that invoice - in PDF format - by email, to the customer.

This can be done really easily and quickly, with the following lines:

```c-sharp
using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
using RestSharp.Authenticators;
using RestSharp.Serialization;
using System.Net.Mail;
using System.Net;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace PDFShiftExample
{
    class Program
    {
        static void Main(string[] args)
        {
            IRestClient client = new RestClient("https://api.pdfshift.io/v3/convert/pdf");
            client.Authenticator = new HttpBasicAuthenticator("api", "your_api_key");

            IRestRequest request = new RestRequest(Method.POST);
            string document_content = File.ReadAllText("invoice.html");
            var json = new
            {
                source = document_content,
                sandbox = true,
            };
            request.AddJsonBody(json);
            IRestResponse response = client.Execute(request);

            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }

            SmtpClient smtpClient = new SmtpClient();
            smtpClient.EnableSsl = true;
            NetworkCredential basicCredential = new NetworkCredential("YourMail", "YourPassword");
            MailMessage message = new MailMessage();
            MailAddress fromAddress = new MailAddress("billing@your-site.tld");

            // setup up the host, increase the timeout to 5 minutes
            smtpClient.Host = "smtp.gmail.com";
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = basicCredential;
            smtpClient.Timeout = (60 * 5 * 1000);

            message.From = fromAddress;
            message.Subject = "Thank you for your purchase";
            message.IsBodyHtml = false;
            message.Body = File.ReadAllText("templates/emails/invoice.html");
            message.To.Add("customer@gmail.com");

            Attachment attachment;
            using (MemoryStream stream = new MemoryStream(response.RawBytes))
            {
                attachment = new Attachment(stream, "invoice.pdf");
                message.Attachments.Add(attachment);
            }

            smtpClient.Send(message);
        }
    }
}
```