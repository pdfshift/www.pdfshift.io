# PDFShift FAQ

## Trying PDFShift

**Can I try PDFShift for free?**

Yes. Follow this link to create an account and get 50 credits per month for free. You won’t be charged, and you don’t need to enter credit card details to get started. Once you’ve created your account and logged in, access our API to convert up to 50 documents for free.

**What can I do with PDFShift?**

This covers a broad range of tasks involving converting documents to PDF, grabbing screenshots, and generating Open Graph images. You can use PDFShift for invoice generation for your customers, export images from a graphics editor, and much more.

**Can I try PDFShift without creating an account?**

Yes. Head to our Playground to see how you can customize your document conversion output with code samples — whether it’s an image or a PDF.

## Using PDFShift

**What types of content can I convert with PDFShift?**

For starters, PDFShift supports HTML documents of any kind. That means web pages from your site or anywhere else on the internet, Canvas objects like image editing output, and more. You can also work with non-HTML libraries like React, VueJS, ChartJS, D3.js, and many more.

**How do you ensure high-quality conversions and service uptime?**

PDFShift runs on Chromium, which enables perfect rendering every time. As for uptime, our server infrastructure is structured to perform at its best even under high stress, and has several redundancies built in. As a result, our customers experience 99.9% uptime. You can track our service availability on [our Status page](https://status.pdfshift.io/).

**What sort of support can I expect as a PDFShift customer?**

If you face any problems running PDFShift, you can consult our extensive and simple documentation, flip through our guides for working with various programming languages, or contact us directly via this form. 

We respond to Business plan users’ requests within hours of receiving a support ticket; for all our other paid plans, we respond within 12 hours. We respond to Free plan users’ tickets within 2 days.

You can track our uptime on [our Status page](https://status.pdfshift.io/).

**What if I have custom requirements?**

Contact us via our form or email us, and we’ll do our best to accommodate your needs with the most suitable implementation.

**What about the privacy of my data?**

We take privacy seriously. We do not store requests or generated documents. As such, it's impossible for us to view the content you convert using PDFShift — so you can rest assured that your documents are entirely private.

**Is PDFShift GDPR compliant?**

Yes. You can read our [Data Processing Agreement](https://pdfshift.io/legal/dpa) along with our [Privacy Policy](https://pdfshift.io/legal/privacy) for more details.

## Pricing and payments

**How do credits work, and how are conversions counted?**

PDFShift’s free and paid plans count usage on the basis of credits; each credit is good for one conversion of up to 5MB. That means if you convert one document that generates, say, a 200KB or 2MB PDF, it’ll be count as a single credit against your quota.

If you convert a document that exceeds 5MB, you’ll use additional credits towards the same document. For example, if a single document conversion works out to 9MB, that’ll count as 2 credits against your quota. Similarly, a single 14MB document will count as 3 credits.

**How much does PDFShift typically cost?**

The average PDFShift customer uses 1,300 credits a month. The plan that matches this usage pattern is the Boost plan at $24 a month. This plan includes 2,500 monthly credits, as well as a low overage cost of just $0.03 per conversion.

PDFShift can meet your needs with higher volume plans. Contact us to ask for a dedicated plan.

**Which payment methods are supported?**

We accept payments through Visa, Mastercard, American Express, Discover, JCB, and Diner's Club cards via Stripe.

**Do you offer annual plans?**

Yes, indeed. If you sign up for an annual plan, you’ll only pay for 10 months. 

Head to our Pricing page to learn more.

**What happens if I exceed my API request volume?**

We will automatically notify you at 50%, 80% and 100% of your credit usage. You can also enable our overage system to not be blocked after hitting 100% of your quota.

**How does your API request overage system work?**

Every plan has an ‘overage’ cost associated with it. When you go over the plan’s limit (say, 1,000 credits in a single month), all the credits you use above that limit will be multiplied by the overage cost, and you’ll be billed for that usage specifically in a separate invoice when your subscription comes up for renewal.

For example, let’s say you’re on the $24/month Boost plan which includes 2,500 monthly credits. If you use 2,700 credits in a given month, you’ll pay:

- $24 for the 2,500 credits
- 200 credits x $0.03 for conversions above your credit limit, which works out to $6

That comes to a total of $30 for that month.

## Integrating and implementing PDFShift

**Do I need to make a page publicly available to use PDFShift?**

No, you don't need to put the page you want to convert publicly on the web. You can simply send the HTML to PDFShift instead by following this guide. 

## I forgot to set the `sandbox` parameter while testing and used up all my credits. What now?

No problem! [Contact us](/contact) and we’ll top up your account with more credits during your first month for free.

**What is the timeout for conversions?**

We wait up to 30 seconds by default for free plans, and 100 seconds for paid plans. If your document needs longer timeouts and you’re on one of PDFShift’s premium plans, contact us and we'll adjust it accordingly for your account.

**What happens when requests time out?**

When a conversion takes too long, PDFShift returns a JSON response along with a 408 status message to inform you that your request has timed out.

**How many parallel conversions can I run? Is it different for each plan?**

You can make up to 50 parallel conversions at the same time. This limit applies to all plans by default — but if you need more parallel conversions, contact us for a custom solution.

**Do I have to pass a "webhook" parameter when using parallel conversion?**

Yes. When you carry out parallel conversions, PDFShift queues up each request to be processed independently. For this reason, your POST request is treated almost instantly with a 202 status code (’Accepted’). You will then receive a POST response at your Webhook URL for **each** source that is converted.

**I use Amazon S3 storage for my converted documents — how is my data privacy maintained?**

When you pass the "filename" parameter while processing HTML content, we store your resulting documents at our Amazon's S3 storage. In this case, the PDF's content is subject to Amazon's privacy policy.

For increased privacy, PDFShift supports sending your documents straight to your own S3 storage. Find our documentation here.

**What if I have other questions?**

Feel free to [reach out to us via email](/contact), and we'll be happy to answer to all your questions.