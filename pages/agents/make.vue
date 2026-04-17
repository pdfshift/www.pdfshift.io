<template>
    <div>
        <NuxtLayout name="default">
            <!-- Hero Section -->
            <PageHeader title="PDFShift + Make">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <img src="/images/integrations/make.svg" alt="Make logo" class="w-16 h-16 rounded" />
                </div>
                Build visual scenarios that include PDF generation with drag-and-drop.<br />
                Automate document creation in powerful Make workflows.
            </PageHeader>

            <div class="bg-gradient-to-bl from-purple-100 to-purple-100 via-white">
                <div class="container px-4 py-12 md:py-24">
                    <!-- Overview Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Overview</h2>
                        <CardLight>
                            <p class="p text-navy-700 mb-4">
                                Make (formerly Integromat) is a visual platform for building complex automation scenarios.
                                By integrating PDFShift with Make, you can generate PDFs as part of sophisticated multi-step workflows
                                using an intuitive drag-and-drop interface.
                            </p>
                            <h3 class="h3 text-navy-700 mt-6 mb-3">Why use PDFShift with Make?</h3>
                            <ul class="list-disc list-inside space-y-2 text-navy-700">
                                <li>Visual workflow builder with drag-and-drop modules</li>
                                <li>Advanced routing and conditional logic</li>
                                <li>Built-in error handling and retry mechanisms</li>
                                <li>Real-time scenario monitoring and debugging</li>
                                <li>Connect to 1,500+ apps and services</li>
                                <li>Powerful data transformation capabilities</li>
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
                                    <h3 class="h3 text-navy-700 mb-2">2. Make Account</h3>
                                    <p class="p -small text-navy-700">
                                        Sign up for a Make account at
                                        <a href="https://www.make.com" target="_blank" class="text-purple-500 hover:underline">make.com</a>.
                                        The free plan includes 1,000 operations per month.
                                    </p>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">3. Basic Make Knowledge</h3>
                                    <p class="p -small text-navy-700">
                                        Familiarity with creating scenarios and using HTTP modules in Make is helpful.
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
                                        <h3 class="h3 text-navy-700 mb-3">Create a New Scenario</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Log into Make and click "Create a new scenario". Give your scenario a descriptive name
                                            like "Generate Invoice PDF".
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
                                        <h3 class="h3 text-navy-700 mb-3">Add a Trigger Module</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click the "+" button and select a trigger module. Common triggers include:
                                        </p>
                                        <ul class="list-disc list-inside space-y-1 text-navy-700 text-sm">
                                            <li>Webhooks - Watch for incoming webhooks</li>
                                            <li>Google Sheets - Watch for new rows</li>
                                            <li>HTTP - Make a request on schedule</li>
                                            <li>Airtable - Watch for new records</li>
                                            <li>Database - Watch for new entries</li>
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
                                        <h3 class="h3 text-navy-700 mb-3">Add HTTP Make a Request Module</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click the "+" after your trigger and search for "HTTP". Select "Make a request" module.
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure the HTTP Request</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Set up the HTTP module with these settings:
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
                                                <span class="font-semibold text-navy-700">Request content type:</span>
                                                <span class="ml-2 text-navy-700">JSON (application/json)</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Parse response:</span>
                                                <span class="ml-2 text-navy-700">No (to get binary PDF data)</span>
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
                                        <h3 class="h3 text-navy-700 mb-3">Set Up Basic Authentication</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In the "Headers" section, add an Authorization header:
                                        </p>
                                        <div class="space-y-3">
                                            <div>
                                                <span class="font-semibold text-navy-700">Header:</span>
                                                <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm">
                                                    <span class="text-purple-400">Key:</span> Authorization<br />
                                                    <span class="text-purple-400">Value:</span> Basic {{base64("api:YOUR_API_KEY")}}
                                                </div>
                                            </div>
                                            <p class="p -small text-navy-700 mt-3">
                                                Or use Make's built-in Basic Auth option with username "api" and your API key as password.
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure the Request Body</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In the "Body" section, add your JSON parameters:
                                        </p>
                                        <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"document.pdf"</span><br />
}
                                        </div>
                                        <p class="p -small text-navy-700 mt-3">
                                            Use Make's mapping feature to insert dynamic values from previous modules.
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
                                        <h3 class="h3 text-navy-700 mb-3">Handle the PDF Response</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Add modules after the HTTP request to process the PDF:
                                        </p>
                                        <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                            <li>Google Drive - Upload a file</li>
                                            <li>Dropbox - Upload a file</li>
                                            <li>Email - Send an email with attachment</li>
                                            <li>FTP - Upload a file</li>
                                        </ul>
                                        <p class="p -small text-navy-700 mt-3">
                                            Map the HTTP module's "Data" output as the file content.
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
                                <h3 class="h3 text-navy-700 mb-3">Example 1: Convert URL to PDF with Dynamic Data</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Generate PDFs from URLs with query parameters:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com/report?id={{'{'}}{'{'}1.id{{'}'}}{{'}'}}"</span>,<br />
  <span class="text-purple-400">"filename"</span>: <span class="text-green-400">"report-{{'{'}}{'{'}1.id{{'}'}}{{'}'}}.pdf"</span><br />
}
                                </div>
                                <p class="p -small text-navy-700 mt-3">
                                    The {{'{'}}{'{'}1.id{{'}'}}{{'}'}} syntax refers to the "id" field from module 1 (your trigger).
                                </p>
                            </CardLight>
                        </div>

                        <!-- Example 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 2: Build HTML from Template</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Use Make's text aggregator to build custom HTML:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Module 1:</strong> Trigger (e.g., Google Sheets - Watch rows)
                                    </div>
                                    <div>
                                        <strong>Module 2:</strong> Text aggregator to build HTML
                                        <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
&lt;html&gt;&lt;body&gt;&lt;h1&gt;{{'{'}}{'{'}1.title{{'}'}}{{'}'}}&lt;/h1&gt;&lt;p&gt;{{'{'}}{'{'}1.content{{'}'}}{{'}'}}&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;
                                        </div>
                                    </div>
                                    <div>
                                        <strong>Module 3:</strong> HTTP request to PDFShift
                                        <div class="mt-2 bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"{{'{'}}{'{'}2.text{{'}'}}{{'}'}}"</span><br />
}
                                        </div>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 3: Add Custom Headers and Footers</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Create professional documents with headers and footers:
                                </p>
                                <div class="bg-navy-900 text-white p-4 rounded-lg font-mono text-sm overflow-x-auto">
{<br />
  <span class="text-purple-400">"source"</span>: <span class="text-green-400">"https://example.com"</span>,<br />
  <span class="text-purple-400">"footer"</span>: {<br />
    <span class="text-purple-400">"source"</span>: <span class="text-green-400">"&lt;div style='text-align: center;'&gt;Page {{ page }} of {{ total }}&lt;/div&gt;"</span>,<br />
    <span class="text-purple-400">"spacing"</span>: <span class="text-yellow-400">10</span><br />
  },<br />
  <span class="text-purple-400">"header"</span>: {<br />
    <span class="text-purple-400">"source"</span>: <span class="text-green-400">"&lt;div style='text-align: right;'&gt;{{'{'}}{'{'}1.company_name{{'}'}}{{'}'}}&lt;/div&gt;"</span><br />
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
                                <h3 class="h3 text-navy-700 mb-2">Database to PDF Reports</h3>
                                <p class="p -small text-navy-700">
                                    Schedule: Fetch data from database → Build HTML report → Generate PDF → Email to team
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsBarGraphUp />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Multi-Page Documents</h3>
                                <p class="p -small text-navy-700">
                                    Iterate through records → Generate page for each → Combine into single PDF
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsPeople />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Conditional PDF Generation</h3>
                                <p class="p -small text-navy-700">
                                    Use Router to generate different PDFs based on conditions and data values
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsTimerPaused />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Batch Processing</h3>
                                <p class="p -small text-navy-700">
                                    Process multiple records → Generate PDF for each → Upload all to cloud storage
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
                                    <h3 class="h3 text-navy-700 mb-3">Using Routers for Conditional Logic</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Add a Router module after your trigger to generate different PDFs based on conditions:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                        <li>Route 1: If type = "invoice" → Generate invoice PDF</li>
                                        <li>Route 2: If type = "receipt" → Generate receipt PDF</li>
                                        <li>Route 3: Otherwise → Generate generic PDF</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Error Handling with Error Handlers</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Right-click any module and add an error handler route to handle failures:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                        <li>Retry the request automatically</li>
                                        <li>Send notification to Slack/email</li>
                                        <li>Log error to database</li>
                                        <li>Use fallback source URL</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Iterators for Batch Processing</h3>
                                    <p class="p -small text-navy-700">
                                        Use the Iterator module to process multiple items:
                                    </p>
                                    <ol class="list-decimal list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Trigger returns array of items</li>
                                        <li>Iterator splits array into individual items</li>
                                        <li>HTTP module generates PDF for each item</li>
                                        <li>Aggregator combines results if needed</li>
                                    </ol>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Data Stores for Tracking</h3>
                                    <p class="p -small text-navy-700">
                                        Use Make's Data Store to track generated PDFs:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Store PDF metadata (filename, timestamp, URL)</li>
                                        <li>Check if PDF was already generated</li>
                                        <li>Track generation status and errors</li>
                                        <li>Build audit logs</li>
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
                                    Verify your Authorization header is correctly formatted. Use Make's base64 function:
                                    {{base64("api:YOUR_API_KEY")}}
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">PDF Response Not Recognized</h3>
                                <p class="p -small text-navy-700">
                                    Make sure "Parse response" is set to "No" in the HTTP module settings. The PDF is binary data
                                    that shouldn't be parsed as JSON.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Scenario Execution Limits</h3>
                                <p class="p -small text-navy-700">
                                    Make enforces execution time limits. For large PDFs, use PDFShift's webhook feature
                                    with a separate webhook scenario to receive the completed PDF.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Dynamic HTML Not Rendering</h3>
                                <p class="p -small text-navy-700">
                                    Ensure special characters in HTML are properly escaped. Use Make's escape function
                                    or the Text parser module to handle complex HTML.
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
                                    Complete API reference with all parameters you can use in your Make scenarios.
                                </p>
                                <Button to="/documentation" :arrow="true">View API Docs</Button>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Other Integrations</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Explore integrations with N8N, Zapier, and other automation platforms.
                                </p>
                                <Button to="/agents" :arrow="true">View All Integrations</Button>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Call to Action -->
                    <section class="max-w-4xl mx-auto">
                        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 lg:p-12 text-center">
                            <h2 class="h2 text-white mb-4">Ready to Build Scenarios?</h2>
                            <p class="p text-white mb-8">
                                Create your free PDFShift account and start building Make scenarios with PDF generation
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
const title = 'PDFShift + Make Integration | Visual PDF Automation Workflows';
const description = 'Learn how to integrate PDFShift with Make to generate PDFs in visual automation scenarios. Build powerful workflows with drag-and-drop modules.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
});
</script>
