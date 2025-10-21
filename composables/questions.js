export const questions = () => [
    {
        question: 'Can I try PDFShift for free?',
        answer: `<p>Yes. <a href="/register" class="font-medium text-purple hover:underline">Follow this link</a> to create an account and get 50 credits per month for free.</p>
                <p>You won’t be charged, and you don’t need to enter credit card details to get started.</p>
                <p>Once you’ve created your account and logged in, access our API to convert up to 50 documents for free.</p>`,
        visible: false,
        home: true
    },
    {
        question: 'What can I do with PDFShift?',
        answer: `<p>PDFShift's API covers a broad range of tasks involving converting documents to PDF, grabbing screenshots, and generating Open Graph images. You can use PDFShift for invoice generation for your customers, export images from a graphics editor, and much more.</p>`,
        visible: false,
        home: true
    },
    {
        question: 'Can I try PDFShift without creating an account?',
        answer: `<p>Yes. Head to our <a href="https://playground.pdfshift.io" class="font-medium text-purple hover:underline" rel="noopener noreferrer">Playground</a> to see how you can customize your document conversion output with code samples — whether it’s an image or a PDF.</p>`,
        visible: false,
        home: true
    },
    {
        question: 'What types of content can I convert with PDFShift?',
        answer: `<p>For starters, PDFShift supports HTML documents of any kind. That means web pages from your site or anywhere else on the internet, Canvas objects like image editing output, and more. You can also work with non-HTML libraries like React, VueJS, ChartJS, D3.js, and many more.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'How do you ensure high-quality conversions and service uptime?',
        answer: `<p>PDFShift runs on Chromium, which enables perfect rendering every time. As for uptime, our server infrastructure is structured to perform at its best even under high stress, and has several redundancies built in. As a result, our customers experience 99.9% uptime. You can track our service availability on <a href="https://status.pdfshift.io/" title="Visit our Status page" class="font-medium text-purple hover:underline" rel="noopener noreferrer">our Status page</a>.</p>`,
        visible: false,
        home: true
    },
    {
        question: 'What sort of support can I expect as a PDFShift customer?',
        answer: `<p>If you face any problems running PDFShift, you can consult our extensive and simple documentation, flip through our guides for working with various programming languages, or <a href="/contact" title="Contact us" class="font-medium text-purple hover:underline">contact us directly via this form</a>.</p>
                <p>We respond to Business plan users’ requests within hours of receiving a support ticket; for all our other paid plans, we respond within 12 hours. We respond to Free plan users’ tickets within 2 days.</p>
                <p>You can track our uptime on <a href="https://status.pdfshift.io/" title="Visit our Status page" class="font-medium text-purple hover:underline" rel="noopener noreferrer">our Status page</a>.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'What about the privacy of my data?',
        answer: `<p>We take privacy seriously. We do not store requests or generated documents. As such, it's impossible for us to view the content you convert using PDFShift — so you can rest assured that your documents are entirely private.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'Is PDFShift GDPR compliant?',
        answer: `<p>Yes. You can read our <a href="/legal/dpa" title="Data Processing Agreement" class="font-medium text-purple hover:underline">Data Processing Agreement</a> along with our <a href="/legal/privacy" title="Privacy Policy" class="font-medium text-purple hover:underline">Privacy Policy</a> for more details.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'Do I need to make a page publicly available to use PDFShift?',
        answer: `<p>No, you don't need to put the page you want to convert publicly on the web. You can simply send the HTML to PDFShift instead by following this guide.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'I use Amazon S3 storage for my converted documents — how is my data privacy maintained?',
        answer: `<p>When you pass the "filename" parameter while processing HTML content, we store your resulting documents at our Amazon's S3 storage. In this case, the PDF's content is subject to Amazon's privacy policy.</p>
                <p>For increased privacy, PDFShift supports sending your documents straight to your own S3 storage. Find <a href="https://status.pdfshift.io/" title="Visit our Status page" class="font-medium text-purple hover:underline" rel="noopener noreferrer">our documentation here</a>.</p>`,
        visible: false,
        home: true
    },
    {
        question: 'How do credits work, and how are conversions counted?',
        answer: `<p>PDFShift’s free and paid plans count usage on the basis of credits; each credit is good for one conversion of up to 5MB. That means if you convert one document that generates, say, a 200KB or 2MB PDF, it’ll be count as a single credit against your quota.</p>
                <p>If you convert a document that exceeds 5MB, you’ll use additional credits towards the same document. For example, if a single document conversion works out to 9MB, that’ll count as 2 credits against your quota. Similarly, a single 14MB document will count as 3 credits.</p>`,
        visible: false,
        home: true
    },
    {
        question: 'How much does PDFShift typically cost?',
        answer: `<p>The average PDFShift customer uses 1,250 credits a month. The plan that matches this usage pattern is the Boost plan at $24 a month. This plan includes 2,500 monthly credits, as well as a low overage cost of just $0.03 per conversion.</p>
                <p>PDFShift can meet your needs with higher volume plans. <a href="/contact" title="Contact us" class="font-medium text-purple hover:underline">Contact us to</a> ask for a dedicated plan.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'Which payment methods are supported?',
        answer: `<p>We accept payments through Visa, Mastercard, American Express, Discover, JCB, and Diner's Club cards via Stripe.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'Do you offer annual plans?',
        answer: `<p>Yes, indeed. If you sign up for an annual plan, you’ll only pay for 10 months.</p>
                <p>Head to our <a href="/#pricing" title="View our pricing" class="font-medium text-purple hover:underline">Pricing page</a> to learn more.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'What happens if I exceed my API request volume?',
        answer: `<p>We will automatically notify you at 50%, 80% and 100% of your credit usage. You can also enable our overage system to not be blocked after hitting 100% of your quota.</p>`,
        visible: false,
        home: true
    },
    {
        question: 'How does your overage system work?',
        answer: `<p>Every plan has an overage cost associated with it. When you go over the plan’s limit (say, 1,000 credits in a single month), all the credits you use above that limit will be multiplied by the overage cost, and you’ll be billed for that usage specifically in a separate invoice when your subscription comes up for renewal.</p>
                <p><strong>(The overage system is disabled by default but can be enabled from your account settings.)</strong></p>
                <p>For example, let’s say you’re on the $24/month Boost plan which includes 2,500 monthly credits. If you use 2,700 credits in a given month, you’ll pay:</p>
                <ul class="px-4 py-2 list-disc list-inside">
                    <li>$24 for the 2,500 credits</li>
                    <li>200 credits x $0.03 for conversions above your credit limit, which works out to $6</li>
                </ul>
                <p>That comes to a total of $30 for that month.</p>`,
        visible: false,
        home: true
    },
    {
        question: 'I forgot to set the sandbox parameter while testing and used up all my credits. What now?',
        answer: `<p>No problem! <a href="/contact" title="Contact us" class="font-medium text-purple hover:underline">Contact us</a> and we’ll top up your account with more credits during your first month for free.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'What is the timeout for conversions?',
        answer: `<p>We wait up to 30 seconds by default for free plans, and 100 seconds for paid plans. If your document needs longer timeouts and you’re on one of PDFShift’s premium plans, <a href="/contact" title="Contact us" class="font-medium text-purple hover:underline">contact us</a> and we'll adjust it accordingly for your account.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'What happens when requests time out?',
        answer: `<p>When a conversion takes too long, PDFShift returns a JSON response along with a 408 status message to inform you that your request has timed out.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'How many parallel conversions can I run? Is it different for each plan?',
        answer: `<p>You can make up to 50 parallel conversions at the same time. This limit applies to all plans by default — but if you need more parallel conversions, <a href="/contact" title="Contact us" class="font-medium text-purple hover:underline">contact us</a> for a custom solution.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'Do I have to pass a "webhook" parameter when using parallel conversion?',
        answer: `<p>Yes. When you carry out parallel conversions, PDFShift queues up each request to be processed independently. For this reason, your POST request is treated almost instantly with a 202 status code ("Accepted"). You will then receive a POST response at your Webhook URL for **each** source that is converted.</p>`,
        visible: false,
        home: false
    },
    {
        question: 'What if I have custom requirements?',
        answer: `<p><a href="/contact" title="Contact us" class="font-medium text-purple hover:underline">Contact us</a> via our form or email us, and we’ll do our best to accommodate your needs with the most suitable implementation.</p>`,
        visible: false,
        home: true
    }
]
