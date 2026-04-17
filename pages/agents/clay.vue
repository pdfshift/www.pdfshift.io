<template>
    <div>
        <NuxtLayout name="default">
            <!-- Hero Section -->
            <PageHeader title="PDFShift + Clay">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <img src="/images/integrations/clay.svg" alt="Clay logo" class="w-16 h-16 rounded" />
                </div>
                Generate PDFs from your Clay spreadsheet data and enrichment workflows.<br />
                Automate document creation with the power of data enrichment.
            </PageHeader>

            <div class="bg-gradient-to-bl from-purple-100 to-purple-100 via-white">
                <div class="container px-4 py-12 md:py-24">
                    <!-- Overview Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Overview</h2>
                        <CardLight>
                            <p class="p text-navy-700 mb-4">
                                Clay is a powerful data enrichment and workflow automation platform that works like a spreadsheet.
                                By integrating PDFShift with Clay, you can automatically generate PDFs from enriched data,
                                create personalized documents at scale, and build sophisticated document workflows.
                            </p>
                            <h3 class="h3 text-navy-700 mt-6 mb-3">Why use PDFShift with Clay?</h3>
                            <ul class="list-disc list-inside space-y-2 text-navy-700">
                                <li>Generate PDFs from enriched prospect or customer data</li>
                                <li>Create personalized reports and documents at scale</li>
                                <li>Automate invoice and receipt generation</li>
                                <li>Build data-driven document workflows</li>
                                <li>Export Clay tables as formatted PDF reports</li>
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
                                        You'll need an API key from PDFShift:
                                    </p>
                                    <Button to="/register" :arrow="true">Register for Free</Button>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">2. Clay Account</h3>
                                    <p class="p -small text-navy-700">
                                        Sign up for Clay at
                                        <a href="https://clay.com" target="_blank" class="text-purple-500 hover:underline">clay.com</a>.
                                        You'll need access to the HTTP API enrichment feature.
                                    </p>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">3. Basic Clay Knowledge</h3>
                                    <p class="p -small text-navy-700">
                                        Familiarity with Clay tables and enrichments is helpful.
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
                                        <h3 class="h3 text-navy-700 mb-3">Create or Open a Clay Table</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In Clay, create a new table or open an existing one with the data you want to convert to PDF.
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
                                        <h3 class="h3 text-navy-700 mb-3">Add HTTP API Column</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click the "+" button to add a new column. Search for "HTTP API" and select it.
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure the HTTP API Request</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Set up the HTTP API enrichment with these settings:
                                        </p>
                                        <div class="space-y-3">
                                            <div>
                                                <span class="font-semibold text-navy-700">URL:</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">https://api.pdfshift.io/v3/convert/pdf</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Method:</span>
                                                <span class="ml-2 text-navy-700">POST</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Content-Type:</span>
                                                <span class="ml-2 text-navy-700">application/json</span>
                                            </div>
                                        </div>
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
                                        <h3 class="h3 text-navy-700 mb-3">Add Authentication Header</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In the Headers section, add:
                                        </p>
                                        <div class="space-y-2">
                                            <div>
                                                <span class="font-semibold text-navy-700">Header Name:</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">Authorization</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Header Value:</span>
                                                <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm">
                                                    Basic [base64 of "api:YOUR_API_KEY"]
                                                </div>
                                                <p class="p -small text-navy-700 mt-2">
                                                    Use an online Base64 encoder to encode "api:YOUR_API_KEY"
                                                </p>
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure Request Body</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In the Body section, add your JSON payload. You can reference columns using {{'{'}}{'{'}column_name{{'}'}}{{'}'}}:
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"{{'{'}}{'{'}Website URL{{'}'}}{{'}'}}"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"{{'{'}}{'{'}Company Name{{'}'}}{{'}'}}-report.pdf"</span><br />
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
                                        <h3 class="h3 text-navy-700 mb-3">Run the Enrichment</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click "Run" to test the enrichment on a single row. Once confirmed, run it on all rows.
                                            The PDF will be returned as binary data in the response.
                                        </p>
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
                                        <h3 class="h3 text-navy-700 mb-3">Handle the PDF Output</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Add follow-up columns to work with the generated PDF:
                                        </p>
                                        <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                            <li>Save to Google Drive</li>
                                            <li>Send via email using Clay's email integration</li>
                                            <li>Upload to Dropbox or S3</li>
                                            <li>Post to webhook for further processing</li>
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
                                <h3 class="h3 text-navy-700 mb-3">Example 1: Generate Prospect Reports</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Create personalized prospect reports from enriched data:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Columns:</strong>
                                        <ul class="list-disc list-inside text-sm text-navy-700 mt-2">
                                            <li>Company Name (from import)</li>
                                            <li>Website URL (enriched)</li>
                                            <li>Employee Count (enriched)</li>
                                            <li>Industry (enriched)</li>
                                            <li>Generate Report (HTTP API to PDFShift)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <strong>Request Body:</strong>
                                        <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"&lt;html&gt;&lt;body&gt;&lt;h1&gt;{{'{'}}{'{'}Company Name{{'}'}}{{'}'}}&lt;/h1&gt;&lt;p&gt;Industry: {{'{'}}{'{'}Industry{{'}'}}{{'}'}}&lt;/p&gt;&lt;p&gt;Employees: {{'{'}}{'{'}Employee Count{{'}'}}{{'}'}}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"{{'{'}}{'{'}Company Name{{'}'}}{{'}'}}-report.pdf"</span><br />
}
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 2: Convert Web Pages to PDF</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Archive prospect websites as PDFs:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"{{'{'}}{'{'}Website URL{{'}'}}{{'}'}}"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"{{'{'}}{'{'}Company Name{{'}'}}{{'}'}}-website.pdf"</span><br />
}
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 3: Batch Invoice Generation</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Generate invoices for a list of customers:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Table Structure:</strong>
                                        <ul class="list-disc list-inside text-sm text-navy-700 mt-2">
                                            <li>Customer Name</li>
                                            <li>Email</li>
                                            <li>Amount</li>
                                            <li>Invoice Number</li>
                                            <li>Generate Invoice (HTTP API)</li>
                                            <li>Send Email (Email action)</li>
                                        </ul>
                                    </div>
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
                                <h3 class="h3 text-navy-700 mb-2">Sales Prospecting</h3>
                                <p class="p -small text-navy-700">
                                    Enrich prospects → Generate personalized one-pagers → Send via email automatically
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsBarGraphUp />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Lead Reports</h3>
                                <p class="p -small text-navy-700">
                                    Import leads → Enrich with firmographic data → Generate company reports as PDFs
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsPeople />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Batch Invoicing</h3>
                                <p class="p -small text-navy-700">
                                    Import transactions → Generate invoices → Save to Google Drive → Email customers
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsTimerPaused />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Website Archiving</h3>
                                <p class="p -small text-navy-700">
                                    List of URLs → Convert each to PDF → Upload to cloud storage for archival
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
                                    <h3 class="h3 text-navy-700 mb-3">Using Conditional Logic</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Use Clay's conditional formulas to generate different PDFs based on data:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                        <li>Generate invoice template A for amounts > $1000</li>
                                        <li>Generate invoice template B for amounts &lt; $1000</li>
                                        <li>Only generate PDFs for companies in specific industries</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Building Dynamic HTML Templates</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Create rich HTML templates with Clay column references:
                                    </p>
                                    <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
&lt;html&gt;<br />
&lt;head&gt;&lt;style&gt;<br />
  body {{ '{' }} font-family: Arial; {{ '}' }}<br />
  .header {{ '{' }} background: #4A90E2; color: white; padding: 20px; {{ '}' }}<br />
&lt;/style&gt;&lt;/head&gt;<br />
&lt;body&gt;<br />
  &lt;div class="header"&gt;<br />
    &lt;h1&gt;{{'{'}}{'{'}Company Name{{'}'}}{{'}'}}&lt;/h1&gt;<br />
  &lt;/div&gt;<br />
  &lt;p&gt;{{'{'}}{'{'}Description{{'}'}}{{'}'}}&lt;/p&gt;<br />
&lt;/body&gt;<br />
&lt;/html&gt;
                                    </div>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Rate Limiting and Batching</h3>
                                    <p class="p -small text-navy-700">
                                        For large tables:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Process rows in batches to avoid API limits</li>
                                        <li>Use Clay's rate limiting features</li>
                                        <li>Consider upgrading PDFShift plan for higher limits</li>
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
                                <h3 class="h3 text-navy-700 mb-2">Authentication Errors (401)</h3>
                                <p class="p -small text-navy-700">
                                    Verify that your Authorization header is correctly formatted with Base64 encoding of "api:YOUR_API_KEY".
                                    Use an online Base64 encoder to verify the encoding.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Column References Not Working</h3>
                                <p class="p -small text-navy-700">
                                    Make sure you're using the exact column names with the {{'{'}}{'{'}{{'}'}}{{'}'}} syntax. Column names are case-sensitive.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">PDFs Not Generating</h3>
                                <p class="p -small text-navy-700">
                                    Check the HTTP API response in Clay for error messages. Common issues include invalid URLs,
                                    malformed HTML, or API quota exceeded.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Large Table Performance</h3>
                                <p class="p -small text-navy-700">
                                    For tables with many rows, consider processing in batches or using Clay's automation features
                                    to run enrichments incrementally rather than all at once.
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
                                    Complete API reference with all parameters you can use in Clay's HTTP API enrichment.
                                </p>
                                <Button to="/documentation" :arrow="true">View API Docs</Button>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Other Integrations</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Explore integrations with other automation platforms like Zapier, Make, and N8N.
                                </p>
                                <Button to="/agents" :arrow="true">View All Integrations</Button>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Call to Action -->
                    <section class="max-w-4xl mx-auto">
                        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 lg:p-12 text-center">
                            <h2 class="h2 text-white mb-4">Scale Your Document Generation</h2>
                            <p class="p text-white mb-8">
                                Create your free PDFShift account and start generating PDFs from Clay workflows
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
const title = 'PDFShift + Clay Integration | Generate PDFs from Enriched Data';
const description = 'Learn how to integrate PDFShift with Clay to generate PDFs from enriched spreadsheet data. Automate document creation at scale with Clay workflows.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
});
</script>
