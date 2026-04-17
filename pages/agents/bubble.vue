<template>
    <div>
        <NuxtLayout name="default">
            <!-- Hero Section -->
            <PageHeader title="PDFShift + Bubble">
                <div class="flex items-center justify-center gap-4 mb-4">
                    <img src="/images/integrations/bubble.svg" alt="Bubble logo" class="w-16 h-16 rounded" />
                </div>
                Add PDF generation capabilities to your Bubble no-code applications.<br />
                Create professional documents without writing code.
            </PageHeader>

            <div class="bg-gradient-to-bl from-purple-100 to-purple-100 via-white">
                <div class="container px-4 py-12 md:py-24">
                    <!-- Overview Section -->
                    <section class="max-w-4xl mx-auto mb-12">
                        <h2 class="h2 text-navy-700 mb-6">Overview</h2>
                        <CardLight>
                            <p class="p text-navy-700 mb-4">
                                Bubble is a powerful no-code platform for building web applications. By integrating PDFShift
                                with Bubble using the API Connector plugin, you can add PDF generation capabilities to your
                                applications without writing a single line of code.
                            </p>
                            <h3 class="h3 text-navy-700 mt-6 mb-3">Why use PDFShift with Bubble?</h3>
                            <ul class="list-disc list-inside space-y-2 text-navy-700">
                                <li>Generate PDFs directly from your Bubble app</li>
                                <li>Create invoices, receipts, and reports</li>
                                <li>Export user-generated content as PDFs</li>
                                <li>Build document-centric applications without code</li>
                                <li>Automate PDF delivery via workflows</li>
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
                                    <h3 class="h3 text-navy-700 mb-2">2. Bubble Account</h3>
                                    <p class="p -small text-navy-700">
                                        Sign up for Bubble at
                                        <a href="https://bubble.io" target="_blank" class="text-purple-500 hover:underline">bubble.io</a>.
                                        You'll need a paid plan to use the API Connector plugin.
                                    </p>
                                </div>
                                <div class="mt-6">
                                    <h3 class="h3 text-navy-700 mb-2">3. API Connector Plugin</h3>
                                    <p class="p -small text-navy-700">
                                        Install the API Connector plugin from the Bubble plugin marketplace (free).
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
                                        <h3 class="h3 text-navy-700 mb-3">Install API Connector Plugin</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In your Bubble editor, go to Plugins → Add plugins → Search for "API Connector" → Install
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
                                        <h3 class="h3 text-navy-700 mb-3">Open API Connector Settings</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click on the API Connector plugin in your plugins list to open its configuration.
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
                                        <h3 class="h3 text-navy-700 mb-3">Add New API</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click "Add another API" and name it "PDFShift"
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure Authentication</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            In the API configuration:
                                        </p>
                                        <div class="space-y-3">
                                            <div>
                                                <span class="font-semibold text-navy-700">Authentication:</span>
                                                <span class="ml-2 text-navy-700">HTTP Basic Auth</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Username (key):</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">api</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Password (key):</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">[Your PDFShift API Key]</span>
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
                                        <h3 class="h3 text-navy-700 mb-3">Add API Call</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click "Add another call" and configure:
                                        </p>
                                        <div class="space-y-3">
                                            <div>
                                                <span class="font-semibold text-navy-700">Name:</span>
                                                <span class="ml-2 text-navy-700">Convert to PDF</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Use as:</span>
                                                <span class="ml-2 text-navy-700">Action</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Data type:</span>
                                                <span class="ml-2 text-navy-700">File</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">Method:</span>
                                                <span class="ml-2 text-navy-700">POST</span>
                                            </div>
                                            <div>
                                                <span class="font-semibold text-navy-700">URL:</span>
                                                <span class="ml-2 font-mono text-sm text-navy-700">https://api.pdfshift.io/v3/convert/pdf</span>
                                            </div>
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
                                        <h3 class="h3 text-navy-700 mb-3">Configure Request Body</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click "Add parameter" for each field:
                                        </p>
                                        <div class="space-y-3">
                                            <div>
                                                <strong>Parameter 1:</strong>
                                                <div class="ml-4 mt-2">
                                                    <div><span class="font-semibold">Key:</span> source</div>
                                                    <div><span class="font-semibold">Value:</span> &lt;url&gt; (leave as dynamic)</div>
                                                    <div><span class="font-semibold">Check:</span> Private</div>
                                                </div>
                                            </div>
                                            <div>
                                                <strong>Parameter 2 (optional):</strong>
                                                <div class="ml-4 mt-2">
                                                    <div><span class="font-semibold">Key:</span> filename</div>
                                                    <div><span class="font-semibold">Value:</span> document.pdf</div>
                                                    <div><span class="font-semibold">Check:</span> Private</div>
                                                </div>
                                            </div>
                                        </div>
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
                                        <h3 class="h3 text-navy-700 mb-3">Initialize the Call</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Click "Initialize call" to test the API connection. Use a test URL like "https://example.com"
                                            for the source parameter.
                                        </p>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Step 8 -->
                        <div class="mb-6">
                            <CardLight>
                                <div class="flex items-start gap-4">
                                    <div class="shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                                        8
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="h3 text-navy-700 mb-3">Use in Workflows</h3>
                                        <p class="p -small text-navy-700 mb-4">
                                            Now you can use this API call in your Bubble workflows:
                                        </p>
                                        <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                            <li>Add to button click events</li>
                                            <li>Trigger from backend workflows</li>
                                            <li>Schedule for recurring PDF generation</li>
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
                                <h3 class="h3 text-navy-700 mb-3">Example 1: Generate Invoice PDF on Button Click</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Create a button that generates an invoice PDF:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Setup:</strong>
                                        <ol class="list-decimal list-inside text-sm text-navy-700 mt-2 ml-4">
                                            <li>Add a button to your page: "Download Invoice"</li>
                                            <li>In the workflow editor, add action: "PDFShift - Convert to PDF"</li>
                                            <li>Set source to: Insert dynamic data → Current Page Invoice's URL</li>
                                            <li>Add action: "Open an external website" → Result of step 1</li>
                                        </ol>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 2 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 2: Convert HTML to PDF from Text</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Generate PDFs from HTML stored in your database:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>In API Connector:</strong>
                                        <ul class="list-disc list-inside text-sm text-navy-700 mt-2 ml-4">
                                            <li>Use the same source parameter</li>
                                            <li>Pass HTML string instead of URL: Current Page Document's HTML field</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardLight>
                        </div>

                        <!-- Example 3 -->
                        <div class="mb-6">
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Example 3: Batch PDF Generation with Backend Workflow</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Generate PDFs for multiple items using a scheduled backend workflow:
                                </p>
                                <div class="space-y-3">
                                    <div>
                                        <strong>Backend Workflow:</strong>
                                        <ol class="list-decimal list-inside text-sm text-navy-700 mt-2 ml-4">
                                            <li>Create a backend workflow: "Generate Report PDFs"</li>
                                            <li>Schedule to run daily</li>
                                            <li>Add action: "Make changes to list" → Search for Documents</li>
                                            <li>For each item: Call "PDFShift - Convert to PDF"</li>
                                            <li>Store result URL in database</li>
                                        </ol>
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
                                <h3 class="h3 text-navy-700 mb-2">SaaS Invoicing</h3>
                                <p class="p -small text-navy-700">
                                    Generate invoices when payments are processed and email them to customers automatically
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsBarGraphUp />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Report Generation</h3>
                                <p class="p -small text-navy-700">
                                    Allow users to export their data as PDF reports with custom formatting
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsPeople />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Certificate Generation</h3>
                                <p class="p -small text-navy-700">
                                    Create personalized certificates for course completions or achievements
                                </p>
                            </CardLight>
                            <CardLight>
                                <div class="text-purple-500 w-10 h-10 mb-3">
                                    <IconsTimerPaused />
                                </div>
                                <h3 class="h3 text-navy-700 mb-2">Document Export</h3>
                                <p class="p -small text-navy-700">
                                    Export user-generated content (forms, applications, proposals) as PDFs
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
                                    <h3 class="h3 text-navy-700 mb-3">Adding Custom Headers and Footers</h3>
                                    <p class="p -small text-navy-700 mb-3">
                                        Add additional parameters in the API Connector:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm">
                                        <li>Add "footer" parameter with JSON value for footer configuration</li>
                                        <li>Use dynamic data from your database</li>
                                        <li>Include page numbers, dates, and custom text</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Saving PDFs to File Storage</h3>
                                    <p class="p -small text-navy-700">
                                        Store generated PDFs in Bubble's file system:
                                    </p>
                                    <ol class="list-decimal list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>After "Convert to PDF" action</li>
                                        <li>Add "Create a new thing" action</li>
                                        <li>Set file field = Result of step 1</li>
                                        <li>Store metadata (filename, date, user)</li>
                                    </ol>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Conditional PDF Generation</h3>
                                    <p class="p -small text-navy-700">
                                        Use Bubble's conditional logic:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Only generate PDF when: Current User's Plan = "Premium"</li>
                                        <li>Show/hide download button based on conditions</li>
                                        <li>Different templates for different user types</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 class="h3 text-navy-700 mb-3">Error Handling</h3>
                                    <p class="p -small text-navy-700">
                                        Add error handling to your workflows:
                                    </p>
                                    <ul class="list-disc list-inside space-y-2 text-navy-700 text-sm mt-2">
                                        <li>Check "Ignore error" checkbox on the API call action</li>
                                        <li>Add "Only when" condition: Result of step 1 is not empty</li>
                                        <li>Show custom error message if PDF generation fails</li>
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
                                <h3 class="h3 text-navy-700 mb-2">API Call Failing During Initialization</h3>
                                <p class="p -small text-navy-700">
                                    Make sure you've entered your API credentials correctly. The username should be "api"
                                    and the password should be your PDFShift API key. Check for any extra spaces.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">PDF Not Downloading</h3>
                                <p class="p -small text-navy-700">
                                    Make sure the "Data type" is set to "File" in the API Connector settings. Also verify
                                    that you're using "Open an external website" action to trigger the download.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Dynamic Data Not Appearing</h3>
                                <p class="p -small text-navy-700">
                                    Ensure your source URL or HTML includes the correct dynamic data expressions. Test the
                                    URL/HTML in preview mode first to verify the data is correct.
                                </p>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-2">Slow PDF Generation</h3>
                                <p class="p -small text-navy-700">
                                    For complex pages or large documents, consider using backend workflows to generate PDFs
                                    asynchronously. This prevents the user from waiting during the generation process.
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
                                    Complete API reference with all parameters you can use in your Bubble API calls.
                                </p>
                                <Button to="/documentation" :arrow="true">View API Docs</Button>
                            </CardLight>
                            <CardLight>
                                <h3 class="h3 text-navy-700 mb-3">Other Integrations</h3>
                                <p class="p -small text-navy-700 mb-4">
                                    Explore integrations with other automation platforms and tools.
                                </p>
                                <Button to="/agents" :arrow="true">View All Integrations</Button>
                            </CardLight>
                        </div>
                    </section>

                    <!-- Call to Action -->
                    <section class="max-w-4xl mx-auto">
                        <div class="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 lg:p-12 text-center">
                            <h2 class="h2 text-white mb-4">Power Your Bubble App with PDFs</h2>
                            <p class="p text-white mb-8">
                                Create your free PDFShift account and start adding PDF capabilities to your Bubble application
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
const title = 'PDFShift + Bubble Integration | No-Code PDF Generation for Your Apps';
const description = 'Learn how to integrate PDFShift with Bubble.io to add PDF generation to your no-code applications. Create invoices, reports, and documents without code.';

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description
});
</script>
