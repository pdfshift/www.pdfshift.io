<template>
    <div>
        <NuxtLayout name="default">
            <!-- Hero Section -->
            <PageHeader title="PDFShift + Zapier">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <img src="/images/integrations/zapier.svg" alt="Zapier logo" class="w-16 h-16 rounded" />
                </div>
                Create Zaps that automatically generate PDFs from your triggers and data.<br />
                Connect 6,000+ apps and automate document generation without code.
            </PageHeader>

            <div class="bg-gradient-to-bl from-purple-100 to-purple-100 via-white">
                <div class="container px-4 py-12 md:py-24">
                    <!-- Overview Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Overview</h2>
                        <CardLight>
                            <p class="p text-navy-700 mb-4">
                                Zapier is the leading automation platform that connects over 6,000 apps. By integrating PDFShift with Zapier,
                                you can automatically generate PDFs as part of your automated workflows, triggered by events from any connected app.
                            </p>
                            <h3 class="h3 text-navy-700 mt-6 mb-3">Why use PDFShift with Zapier?</h3>
                            <ul class="list-disc list-inside space-y-2 text-navy-700">
                                <li>Connect PDF generation to 6,000+ apps without code</li>
                                <li>Trigger PDF creation from form submissions, payments, CRM updates, and more</li>
                                <li>Generate invoices, receipts, reports, and contracts automatically</li>
                                <li>Send PDFs via email, save to cloud storage, or post to webhooks</li>
                                <li>Build complex multi-step workflows with PDF generation</li>
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
                                    <h3 class="h3 text-navy-700 mb-2">2. Zapier Account</h3>
                                    <p class="p -small text-navy-700">
                                        Sign up for a free Zapier account at
                                        <a href="https://zapier.com" target="_blank" class="text-purple-500 hover:underline">zapier.com</a>.
                                        The free plan supports basic automations.
                                    </p>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">3. Connected Apps</h3>
                                    <p class="p -small text-navy-700">
                                        Connect the apps you want to trigger PDF generation (e.g., Google Forms, Stripe, Salesforce, etc.).
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
                                        <h3 class="h3 text-navy-700 mb-3">Create a New Zap</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Log into Zapier and click "Create Zap". Give your Zap a descriptive name like "Generate Invoice PDF on Payment".
                                        </p>
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
                                        <h3 class="h3 text-navy-700 mb-3">Set Up Your Trigger</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Choose the app and event that should trigger PDF generation. Common triggers include:
                                        </p>
                                        <ul class="list-disc list-inside space-y-1 text-navy-700 text-sm">
                                            <li>New form submission (Google Forms, Typeform)</li>
                                            <li>New payment (Stripe, PayPal)</li>
                                            <li>New row in spreadsheet (Google Sheets, Airtable)</li>
                                            <li>New deal (Salesforce, HubSpot)</li>
                                            <li>New order (Shopify, WooCommerce)</li>
                                        </ul>
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
                                        <h3 class="h3 text-navy-700 mb-3">Add a Webhooks by Zapier Action</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click the "+" button to add an action step. Search for "Webhooks by Zapier" and select it.
                                            Choose "POST" as the action event.
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure the Webhook Request</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Set up the webhook with these settings:
                                        </p>
                                        <div class="space-y-3">
                                            <div>
                                                <span class="font-semibold text-navy-700">URL:</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">https://api.pdfshift.io/v3/convert/pdf</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Payload Type:</span>
                                                <span class="ml-2 text-navy-700">JSON</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Data:</span>
                                                <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com"</span><br />
}
                                                </div>
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
                                        <h3 class="h3 text-navy-700 mb-3">Add Authentication</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Scroll down to the "Headers" section and add:
                                        </p>
                                        <div class="space-y-2">
                                            <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm">
                                                <span class="text-purple-400">Authorization</span>: Basic <span class="text-green-400">{base64(api:YOUR_API_KEY)}</span>
                                            </div>
                                            <p class="p -small text-navy-700 mt-3">
                                                Or use Zapier's Basic Auth option with username "api" and your API key as the password.
                                            </p>
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
                                        <h3 class="h3 text-navy-700 mb-3">Add Actions for the PDF</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            After the webhook action, add steps to handle the generated PDF:
                                        </p>
                                        <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                            <li>Send via Email (Gmail, Outlook)</li>
                                            <li>Upload to cloud storage (Google Drive, Dropbox, OneDrive)</li>
                                            <li>Attach to CRM record (Salesforce, HubSpot)</li>
                                            <li>Post to Slack or Teams</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 7 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        7
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Test and Activate</h3>
                                        <p class="p -small text-navy-700">
                                            Click "Test" to verify your Zap works correctly. Once successful, turn on your Zap!
                                        </p>
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
                                <h3 class="h3 text-navy-700 mb-3">Example 1: Generate Invoice from Stripe Payment</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Automatically create and email an invoice when a payment is received:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Trigger:</strong> New payment in Stripe
                                    </div>
                                    <div>
                                        <strong>Action 1:</strong> Webhooks by Zapier - POST to PDFShift
                                        <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://yoursite.com/invoice?id={{'{'}}{'{'}Charge ID{{'}'}}{{'}'}}"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"invoice-{{'{'}}{'{'}Charge ID{{'}'}}{{'}'}}.pdf"</span><br />
}
                                        </div>
                                    </div>
                                    <div>
                                        <strong>Action 2:</strong> Gmail - Send Email with PDF attachment
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 2: Convert HTML from Google Sheets</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Generate PDFs from HTML stored in a Google Sheet:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"{{'{'}}{'{'}HTML Column{{'}'}}{{'}'}}"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"{{'{'}}{'{'}Name Column{{'}'}}{{'}'}}.pdf"</span><br />
}
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 3: Add Watermark and Save to Google Drive</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Generate branded PDFs with watermarks:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com"</span>,<br />
  <span class="text-purple-400">"watermark"</span>: {<br />
    <span class="text-purple-400">"text"</span>: <span class="text-green-400">"CONFIDENTIAL"</span>,<br />
    <span class="text-purple-400">"opacity"</span>: <span class="text-yellow-400">0.3</span><br />
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
                                <h3 class="h3 text-navy-700 mb-2">Automated Invoicing</h3>
                                <p class="p -small text-navy-700">
                                    Stripe payment → Generate invoice PDF → Email to customer → Save to Google Drive
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsBarGraphUp />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Form Responses to PDF</h3>
                                <p class="p -small text-navy-700">
                                    Google Forms submission → Generate formatted PDF → Save to Dropbox → Notify team in Slack
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsPeople />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Contract Generation</h3>
                                <p class="p -small text-navy-700">
                                    New Salesforce deal → Generate contract from template → Attach to opportunity → Send for signature
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsTimerPaused />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Weekly Reports</h3>
                                <p class="p -small text-navy-700">
                                    Schedule trigger → Fetch data from Airtable → Generate report PDF → Email to stakeholders
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
                                    <h3 class="h3 text-navy-700 mb-3">Using Dynamic Data in URLs</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Insert data from your trigger directly into the source URL:
                                    </p>
                                    <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
https://yoursite.com/invoice?customer={{'{'}}{'{'}Customer ID{{'}'}}{{'}'}}&total={{'{'}}{'{'}Amount{{'}'}}{{'}'}}
                                    </div>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Multi-Step Zaps</h3>
                                    <p class="p -small text-navy-700">
                                        Build complex workflows:
                                    </p>
                                    <ul class="list-decimal list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Trigger: New Typeform submission</li>
                                        <li>Filter: Only continue if "Generate PDF" = Yes</li>
                                        <li>Formatter: Build custom HTML from form data</li>
                                        <li>Webhooks: Generate PDF with PDFShift</li>
                                        <li>Google Drive: Upload PDF</li>
                                        <li>Gmail: Send notification with link</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Error Handling</h3>
                                    <p class="p -small text-navy-700">
                                        Use Zapier's error handling features:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Add a Filter step to check if the webhook was successful</li>
                                        <li>Use Paths to handle success/failure scenarios differently</li>
                                        <li>Set up email notifications for failed Zaps</li>
                                        <li>Enable automatic retries in Zapier settings</li>
                                    </ul>
                                </div>
                            </div>
                        </CardLight>
                    </section>

                    <!-- Troubleshooting Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Troubleshooting & FAQ</h2>
                        <div class="space-y-4">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Authentication Errors</h3>
                                <p class="p -small text-navy-700">
                                    Make sure you're using Basic Auth with username "api" and your PDFShift API key as the password.
                                    Check that your API key is active and has sufficient credits.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">PDF Not Generating</h3>
                                <p class="p -small text-navy-700">
                                    Verify that your source URL is publicly accessible. Test the URL in a browser first.
                                    Check Zapier's task history for error messages from the webhook response.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Handling Large Files</h3>
                                <p class="p -small text-navy-700">
                                    For large PDFs, use PDFShift's webhook feature for async processing.
                                    Add a second Zap with a webhook trigger to receive the completed PDF.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Dynamic HTML Content</h3>
                                <p class="p -small text-navy-700">
                                    Use Zapier's Formatter to build HTML strings from your data, or use a Code step
                                    (Python/JavaScript) for complex HTML generation.
                                </p>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Related Resources -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Related Resources</h2>
                        <div class="grid md:grid-cols-2 gap-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">API Documentation</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Full API reference with all parameters and options you can use in your Zaps.
                                </p>
                                <Button to="/documentation" :arrow="true">View API Docs</Button>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Other Integrations</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Explore integrations with N8N, Make, and other automation platforms.
                                </p>
                                <Button to="/agents" :arrow="true">View All Integrations</Button>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Call to Action -->
                    <section class="max-w-4xl mx-auto">
                        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 lg:p-12 text-center">
                            <h2 class="h2 text-white mb-4">Ready to Automate?</h2>
                            <p class="p text-white mb-8">
                                Create your free PDFShift account and start building Zaps that generate PDFs automatically
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
const title = 'PDFShift + Zapier Integration | Automate PDF Generation in Zaps';
const description = 'Learn how to integrate PDFShift with Zapier to automatically generate PDFs in your Zaps. Connect 6,000+ apps and automate document generation without code.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
});
</script>
