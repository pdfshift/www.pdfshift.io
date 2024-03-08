---
title: "Save your PDF to your Amazon S3 Bucket"
description: "This guides shows you how can generate a PDF document from HTML with PDFShift's API and save it to your own Amazon S3 bucket. This allows you to generate document and automate actions once the document has been created on your bucket. This guides explains you how to do it using Node and the SuperAgent library."
language: 'Node'
library: 'SuperAgent'
property: 's3_destination'
output: 'pdf'
related: ['save-your-pdf-online-and-get-back-a-url', 'receive-a-webhook-event']
default: false
---

In this guide, we'll show you how you can generate a PDF document from HTML with PDFShift's API and save it to your own Amazon S3 bucket. This allows you to generate document and automate actions once the document has been created on your bucket.

First, you'll need to set up permissions in your bucket to allow PDFShift to write in it.

We crafted a very simple policy that only does what is required and nothing more.
You can copy/paste it and apply it on your bucket, but don't forget to change the name of your bucket:

```json
{
    "Version": "2012-10-17",
    "Statement": [{
        "Sid": "Allows PDFShift.io to write the generated PDF in this bucket.",
        "Effect": "Allow",
        "Principal": {
            "AWS": ["arn:aws:iam::804461045055:user/pdfshift"]
        },
        "Action": ["s3:PutObject"],
        "Resource": "arn:aws:s3:::DOC-EXAMPLE-BUCKET/*"
    }]
}
```

Once this is done, you can send a request to PDFShift by adding the `s3_destination` parameter. It takes the full s3 bucket as a URL.
Once the conversion will be done, PDFShift will 

```javascript
const superagent = require('superagent');

// You can get an API key at https://pdfshift.io
api_key = 'sk_xxxxxxxxxxxx'

params = {
    source: 'https://www.example.com',
    s3_destination: 's3://DOC-EXAMPLE-BUCKET/test/example.pdf'
}

let response = await superagent
    .post('https://api.pdfshift.io/v3/convert/pdf')
    .auth('api', api_key)
    .send(params);

console.log('The PDF document was generated and saved to your S3 Bucket');
```

Once the conversion is done, PDFShift will save the content to your given `s3_destination` path and will return a response with a JSON body, such as:

```json
{
    "success": true,
    "url": "https://DOC-EXAMPLE-BUCKET.s3.amazonaws.com/test/example.pdf",
    "filesize": 34980,
    "duration": 1423,
    "response": {
        "status-code": 200,
        "content-length": 0,
        "requests": 0,
        "duration": 1263.254446029663
    },
    "executed": "2024-03-06T10:13:33.154960",
    "pdf_pages": 1
}
```

In the event you haven't setup the permissions properly, PDFShift will fail with the following JSON body error:

```json
{
    "success": false,
    "error": "The S3 destination you provided can not be accessed.",
    "code": 400
}
```

This features is really interesting as it allows you to not have to write the logic once the file was generated if your intention is to backup the file (such as an invoice, a report or saving a document).

You can couple it with the `webhook` parameter to increase the speed of processing. By doing so, PDFShift will treat your conversion request asynchronously and save the document in the given path. The request made to PDFShift will be immediate.