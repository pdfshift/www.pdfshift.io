<template>
    <div>
        <NuxtLayout name="default">
            <!-- Hero Section -->
            <PageHeader title="PDFShift + N8N">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <img src="/images/integrations/n8n.svg" alt="N8N logo" class="w-16 h-16 rounded" />
                </div>
                Convert HTML to PDF in your N8N workflows with simple HTTP requests.<br />
                Automate document generation with the power of visual workflow automation.
            </PageHeader>

            <div class="bg-gradient-to-bl from-purple-100 to-purple-100 via-white">
                <div class="container px-4 py-12 md:py-24">
                    <!-- Overview Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Overview</h2>
                        <CardLight>
                            <p class="p text-navy-700 mb-4">
                                N8N is a powerful workflow automation tool that lets you connect different services and automate tasks without writing code.
                                By integrating PDFShift with N8N, you can automatically generate PDFs from HTML as part of your workflows.
                            </p>
                            <h3 class="h3 text-navy-700 mt-6 mb-3">Why use PDFShift with N8N?</h3>
                            <ul class="list-disc list-inside space-y-2 text-navy-700">
                                <li>Automate PDF generation without code</li>
                                <li>Convert HTML, URLs, or dynamic content to PDF</li>
                                <li>Trigger PDF creation from any event in your workflow</li>
                                <li>Save generated PDFs to cloud storage or send via email</li>
                                <li>Handle high-volume document generation reliably</li>
                            </ul>
                        </CardLight>
                    </section>

                    <!-- Prerequisites Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Prerequisites</h2>
                        <CardLight>
                            <div class="space-y-4">
                                <div>
                                    <h3 class="h3 text-navy-700 mb-2">1. PDFShift API Key</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        You'll need an API key from PDFShift. If you don't have one yet:
                                    </p>
                                    <Button to="/register" :arrow="true">Register for Free</Button>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">2. N8N Account or Installation</h3>
                                    <p class="p -small text-navy-700">
                                        You can use N8N Cloud or self-host N8N on your own server. Visit
                                        <a href="https://n8n.io" target="_blank" class="text-purple-500 hover:underline">n8n.io</a> to get started.
                                    </p>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">3. Basic N8N Knowledge</h3>
                                    <p class="p -small text-navy-700">
                                        Familiarity with creating workflows and using the HTTP Request node in N8N is helpful but not required.
                                    </p>
                                </div>
                            </div>
                        </CardLight>
                    </section>

                    <!-- Step-by-Step Setup Guide -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Step-by-Step Setup Guide</h2>

                        <!-- Step 1 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Get Your PDFShift API Key</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            After registering, you'll find your API key in your dashboard. Copy it - you'll need it for authentication.
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                            <span class="text-purple-400">// Your API key format:</span><br />
                                            api:your_api_key_here
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Create a New Workflow in N8N</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Open N8N and create a new workflow. Add a trigger node (e.g., Manual Trigger, Webhook, Schedule, etc.)
                                            to start your workflow.
                                        </p>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Add an HTTP Request Node</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click the "+" button and search for "HTTP Request" node. Add it to your workflow after your trigger.
                                        </p>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 4 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        4
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Configure the HTTP Request Node</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Set up the HTTP Request node with the following configuration:
                                        </p>
                                        <div class="space-y-3">
                                            <div>
                                                <span class="font-semibold text-navy-700">Method:</span>
                                                <span class="ml-2 text-navy-700">POST</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">URL:</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">https://api.pdfshift.io/v3/convert/pdf</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Authentication:</span>
                                                <span class="ml-2 text-navy-700">Basic Auth</span>
                                            </div>
                                            <div class="ml-4">
                                                <span class="font-semibold text-navy-700">Username:</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">api</span>
                                            </div>
                                            <div class="ml-4">
                                                <span class="font-semibold text-navy-700">Password:</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">[Your API Key]</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Body Content Type:</span>
                                                <span class="ml-2 text-navy-700">JSON</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 5 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        5
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Set the Request Body</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In the "Body" section, add your JSON parameters. Here's a basic example:
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"document.pdf"</span><br />
}
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 6 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        6
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Handle the Response</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            The response from PDFShift will contain the PDF as binary data. You can:
                                        </p>
                                        <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                            <li>Save it to a file using the "Write Binary File" node</li>
                                            <li>Upload it to cloud storage (Google Drive, Dropbox, S3)</li>
                                            <li>Send it via email as an attachment</li>
                                            <li>Return it via webhook response</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Detailed Examples Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Detailed Examples</h2>

                        <!-- Example 1 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 1: Convert URL to PDF</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    The simplest way to generate a PDF is to provide a URL:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com/invoice/12345"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"invoice-12345.pdf"</span><br />
}
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 2: Convert HTML String to PDF</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    You can also send raw HTML directly:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"&lt;html&gt;&lt;body&gt;&lt;h1&gt;Hello World&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"hello.pdf"</span><br />
}
                                </div>
                                <p class="p -small text-navy-700 mt-4">
                                    <strong>Tip:</strong> You can use N8N's template system to dynamically insert data from previous nodes into your HTML.
                                </p>
                            </CardLight>
                        </div>

                        <!-- Example 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 3: Add Headers and Footers</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Customize your PDFs with headers and footers:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"document.pdf"</span>,<br />
  <span class="text-purple-400">"footer"</span>: {<br />
    <span class="text-purple-400">"source"</span>: <span class="text-green-400">"&lt;div style='text-align: center;'&gt;Page {{ page }} of {{ total }}&lt;/div&gt;"</span>,<br />
    <span class="text-purple-400">"spacing"</span>: <span class="text-yellow-400">10</span><br />
  }<br />
}
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 4 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 4: Save to Amazon S3</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Use PDFShift's S3 integration to automatically save PDFs to your bucket:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"document.pdf"</span>,<br />
  <span class="text-purple-400">"s3_destination"</span>: {<br />
    <span class="text-purple-400">"bucket"</span>: <span class="text-green-400">"my-bucket"</span>,<br />
    <span class="text-purple-400">"key"</span>: <span class="text-green-400">"documents/document.pdf"</span>,<br />
    <span class="text-purple-400">"region"</span>: <span class="text-green-400">"us-east-1"</span>,<br />
    <span class="text-purple-400">"access_key_id"</span>: <span class="text-green-400">"YOUR_ACCESS_KEY"</span>,<br />
    <span class="text-purple-400">"secret_access_key"</span>: <span class="text-green-400">"YOUR_SECRET_KEY"</span><br />
  }<br />
}
                                </div>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Use Cases Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Common Use Cases</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsClipboardTick />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Invoice Generation</h3>
                                <p class="p -small text-navy-700">
                                    Trigger PDF invoice generation when a payment is received via webhook, then email it to the customer.
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsBarGraphUp />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Automated Reports</h3>
                                <p class="p -small text-navy-700">
                                    Schedule daily/weekly reports by fetching data from your database and converting it to PDF.
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsPeople />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Contract Generation</h3>
                                <p class="p -small text-navy-700">
                                    Create personalized contracts from templates when new deals are created in your CRM.
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsTimerPaused />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Receipt Generation</h3>
                                <p class="p -small text-navy-700">
                                    Automatically generate and send receipts when orders are placed in your e-commerce system.
                                </p>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Advanced Features Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Advanced Features</h2>
                        <CardLight>
                            <div class="space-y-6">
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Webhooks for Async Processing</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        For large or complex PDFs, use webhooks to process documents asynchronously:
                                    </p>
                                    <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com/large-document"</span>,<br />
  <span class="text-purple-400">"webhook"</span>: <span class="text-green-400">"https://your-n8n-webhook-url"</span><br />
}
                                    </div>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Error Handling Best Practices</h3>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                        <li>Use N8N's error workflow feature to handle failed conversions</li>
                                        <li>Check response status codes and handle errors appropriately</li>
                                        <li>Implement retry logic for transient failures</li>
                                        <li>Log errors for debugging and monitoring</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Rate Limiting Considerations</h3>
                                    <p class="p -small text-navy-700">
                                        PDFShift enforces rate limits based on your plan. For high-volume workflows:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Use N8N's batch processing to control request rate</li>
                                        <li>Implement delays between requests if needed</li>
                                        <li>Consider upgrading your plan for higher limits</li>
                                    </ul>
                                </div>
                            </div>
                        </CardLight>
                    </section>

                    <!-- Troubleshooting/FAQ Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Troubleshooting & FAQ</h2>
                        <div class="space-y-4">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Authentication Errors (401)</h3>
                                <p class="p -small text-navy-700">
                                    Make sure you're using "api" as the username and your API key as the password in Basic Auth.
                                    Double-check that your API key is correct and active.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Timeout Issues</h3>
                                <p class="p -small text-navy-700">
                                    For large documents, increase the timeout in the HTTP Request node settings or use webhooks for async processing.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Invalid Response Format</h3>
                                <p class="p -small text-navy-700">
                                    Ensure "Response Format" is set to "File" in the HTTP Request node settings to properly receive the PDF binary data.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">CSS/JavaScript Not Loading</h3>
                                <p class="p -small text-navy-700">
                                    Make sure external resources are publicly accessible. Consider using the "wait" parameter to ensure JavaScript has time to execute.
                                </p>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Related Resources -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Related Resources</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">N8N Guides</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Check out our comprehensive guides for specific use cases and advanced techniques.
                                </p>
                                <Button to="/guides/n8n" :arrow="true">View N8N Guides</Button>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">API Documentation</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Full API reference with all parameters, options, and examples.
                                </p>
                                <Button to="/documentation" :arrow="true">View API Docs</Button>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Call to Action -->
                    <section class="max-w-4xl mx-auto">
                        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 lg:p-12 text-center">
                            <h2 class="h2 text-white mb-4">Ready to Get Started?</h2>
                            <p class="p text-white mb-8">
                                Create your free PDFShift account and start automating PDF generation in N8N today
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button to="/register" :arrow="true" :light="true">Get Your Free API Key</Button>
                                <Button to="/documentation" :arrow="true">Read the Documentation</Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
const title = 'PDFShift + N8N Integration | Convert HTML to PDF in Your Workflows';
const description = 'Learn how to integrate PDFShift with N8N to automatically convert HTML to PDF in your workflows. Step-by-step guide with examples and best practices.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
});
</script>
