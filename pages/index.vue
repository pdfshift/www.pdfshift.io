<template>
    <div class="home">
        <div id="brands">
            <div class="container">
                <ul class="unstyled">
                    <li>
                        <!-- vivino.com -->
                        <img src="/images/partners/vivino.png" alt="Vivino" />
                    </li>
                    <li>
                        <!-- betterproposals.io -->
                        <img src="/images/partners/betterproposals.png" alt="Better Proposals" />
                    </li>
                    <li>
                        <!-- resumez.com -->
                        <img src="/images/partners/resumez.png" alt="Resumez" />
                    </li>
                    <li>
                        <!-- payrollcrm.com -->
                        <img src="/images/partners/payroll.png" alt="Payroll CRM" />
                    </li>
                    <li>
                        <!-- podia.com -->
                        <img src="/images/partners/podia.png" alt="Podia" />
                    </li>
                    <!--
                    <li>
                        roofstreet.io
                        <img src="/images/partners/roofstreet.png" alt="Roofstreet" />
                    </li>
                    -->
                </ul>
            </div>
        </div>

        <!--
        <div id="try-me">
            <h2>Try PDFShift for free <small>and see for yourself</small></h2>
            <div class="container">
                <form method="post">
                    <input type="url" name="source" placeholder="Enter any URL" value="https://en.wikipedia.org/wiki/PDF" required />
                    <p class="error"></p>
                    <div class="row">
                        <div class="options column six">
                            <div class="radio">
                                <input id="try-me-landscape-off" type="radio" name="landscape" value="0" checked />
                                <label for="try-me-landscape-off">Portrait</label>
                            </div>
                            <div class="radio">
                                <input id="try-me-landscape-on" type="radio" name="landscape" value="1" />
                                <label for="try-me-landscape-on">Landscape</label>
                            </div>
                        </div>
                        <div class="options column six">
                            <div class="radio">
                                <input id="try-me-use_print-off" type="radio" name="use_print" value="0" checked />
                                <label for="try-me-use_print-off">Screen</label>
                            </div>
                            <div class="radio">
                                <input id="try-me-use_print-on" type="radio" name="use_print" value="1" />
                                <label for="try-me-use_print-on">Print</label>
                            </div>
                        </div>
                    </div>
                    <div class="css">
                        <a href="javascript:;" title="Click here to add some custom CSS">Would you like to try some Custom CSS?</a>
                        <div><textarea name="css" rows="5" cols="50" placeholder="body {background-color: red !important; /* why not */}"></textarea></div>
                    </div>
                    <input type="submit" name="Try it now" value="Try in the browser now" class="button button-secondary" />
                </form>
            </div>
        </div>
        -->

        <div id="numbers">
            <div class="container">
                <h2>Rely on a leading conversion service.</h2>
                <p class="excerpt">Thousands of users trust us to quickly convert documents with a high-fidelity result</p>

                <ul class="unstyled">
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                            <g>
                                <path d="M9.18,12.3843a.5.5,0,1,1,.6406-.7686l2.6489,2.208,4.6772-4.6772a.5.5,0,0,1,.707.707l-5,5a.5.5,0,0,1-.6738.0308ZM25,20.5V23a2,2,0,0,1-2,2H6.5A2.5,2.5,0,0,1,4,22.5V1.5A1.5,1.5,0,0,1,5.5,0h16A1.5,1.5,0,0,1,23,1.5V20h1.5A.5.5,0,0,1,25,20.5ZM8.5,20H22V1.5a.5.5,0,0,0-.5-.5H5.5a.5.5,0,0,0-.5.5v21a1.5,1.5,0,0,0,3,0v-2A.5.5,0,0,1,8.5,20ZM24,21H9v1.5A2.4775,2.4775,0,0,1,8.4888,24H23a1.0007,1.0007,0,0,0,1-1Z" />
                            </g>
                        </svg>
                        <h5>{{ statistics.conversions }}</h5>
                        <span>Conversions made</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                            <g>
                                <path d="M10.3207,13.9038a5,5,0,1,0-4.6414,0A7.0067,7.0067,0,0,0,1,20.5a.5.5,0,0,0,1,0,6,6,0,0,1,12,0,.5.5,0,0,0,1,0A7.0067,7.0067,0,0,0,10.3207,13.9038ZM4,9.5a4,4,0,1,1,4,4A4.0046,4.0046,0,0,1,4,9.5Zm16.64,1.8694a4,4,0,1,0-4.2751.0024,6.5261,6.5261,0,0,0-3.2438,2.4841,8.07,8.07,0,0,1,.7368.708A5.4946,5.4946,0,0,1,24,17.5a.5.5,0,0,0,1,0A6.5059,6.5059,0,0,0,20.64,11.3694ZM18.5,11a3,3,0,1,1,3-3A3.0034,3.0034,0,0,1,18.5,11Z" />
                            </g>
                        </svg>
                        <h5>{{ statistics.users }}</h5>
                        <span>Users that trusts us</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                            <g>
                                <path d="M12.5,5A12.4809,12.4809,0,0,0,1.8379,24H23.1621A12.4809,12.4809,0,0,0,12.5,5ZM22.5859,23H2.4141a11.5,11.5,0,1,1,20.1719,0Zm-5.49-7.8032L13.1431,19.15a1.514,1.514,0,1,0,.707.707l3.9531-3.9531a.5.5,0,0,0-.707-.707ZM12.5,21a.5.5,0,1,1,.5-.5A.5.5,0,0,1,12.5,21ZM23,17.5a.5.5,0,0,1-1,0,9.5,9.5,0,0,0-19,0,.5.5,0,0,1-1,0,10.5,10.5,0,0,1,21,0Z" />
                            </g>
                        </svg>
                        <h5>1.5s</h5>
                        <span>Average conversion time</span>
                    </li>
                    <li>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                            <g>
                                <path d="M2.5,16.5h-1A1.5,1.5,0,0,0,0,18v5.5A1.5,1.5,0,0,0,1.5,25h1A1.5,1.5,0,0,0,4,23.5V18A1.5,1.5,0,0,0,2.5,16.5Zm.5,7a.5.5,0,0,1-.5.5h-1a.5007.5007,0,0,1-.5-.5V18a.5007.5007,0,0,1,.5-.5h1A.5.5,0,0,1,3,18ZM9.5,11h-1A1.5,1.5,0,0,0,7,12.5v11A1.5,1.5,0,0,0,8.5,25h1A1.5,1.5,0,0,0,11,23.5v-11A1.5,1.5,0,0,0,9.5,11ZM10,23.5a.5.5,0,0,1-.5.5h-1a.5007.5007,0,0,1-.5-.5v-11a.5007.5007,0,0,1,.5-.5h1a.5.5,0,0,1,.5.5ZM22.9118,7.218,17.8.4a1,1,0,0,0-1.6,0L11.0884,7.218A.5.5,0,0,0,11.501,8H15V23.5A1.5,1.5,0,0,0,16.5,25h1A1.5,1.5,0,0,0,19,23.5V8h3.4992A.5.5,0,0,0,22.9118,7.218ZM18,7V23.5a.5.5,0,0,1-.5.5h-1a.5007.5007,0,0,1-.5-.5V7H12.4485l4.5493-6,.0012,0,4.5522,6Z" />
                            </g>
                        </svg>
                        <h5>99.99%</h5>
                        <span>Uptime</span>
                    </li>
                </ul>
            </div>
        </div>

        <div id="code">
            <div class="container">
                <h2>Integrate PDFShift with just a simple request</h2>
                <p class="excerpt">
                    We believe that developers should focus their time on things that matter, not setting up yet another PDF library.
                    Because we eliminate needless complexity and provide an up-to-date service, you can get up and running with PDFShift in just a couple of minutes.
                </p>

                <div class="row">
                    <div class="column nine">
                        <div class="code-samples">
                            <div :class="{'visible': language == 'javascript'}">
                                <div class="code-section">
                                    <pre class="line-numbers language-javascript"><code>const fetch = require('node-fetch')

fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
        Authorization: 'Basic ' + Buffer.from('api:your_api_key').toString('base64'),
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        source: 'https://en.wikipedia.org/wiki/PDF',
        landscape: false,
        use_print: false
    })
}).then(response => {
    response.body.pipe(fs.createWriteStream('wikipedia.pdf'))
})

// You can also use Axios if you want:
// https://gist.github.com/cnicodeme/28ade69b269ca0a4af0a7c29c479b747</code></pre>
                                    <div class="copy">
                                        <a ref="copy" href="javascript:;" title="Click here to copy to clipoard" class="button" @click="copyCode">Copy to clipboard</a>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'visible': language == 'python'}">
                                <div class="code-section">
                                    <pre class="line-numbers language-python"><code>import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={"source": "https://en.wikipedia.org/wiki/PDF", "landscape": False, "use_print": False}
)

response.raise_for_status()

with open('wikipedia.pdf', 'wb') as f:
    f.write(response.content)
</code></pre>
                                    <div class="copy">
                                        <a ref="copy" href="javascript:;" title="Click here to copy to clipoard" class="button" @click="copyCode">Copy to clipboard</a>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'visible': language == 'php'}">
                                <div class="code-section">
                                    <pre class="line-numbers language-php"><code>&lt;?php
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.pdfshift.io/v3/convert/pdf",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode(array("source" => "https://en.wikipedia.org/wiki/PDF", "landscape" => false, "use_print" => false)),
    CURLOPT_HTTPHEADER => array('Content-Type:application/json'),
    CURLOPT_USERPWD => 'api:your_api_key'
));

$response = curl_exec($curl);
file_put_contents('wikipedia.pdf', $response);

// We even made a GIST for you at:
// https://gist.github.com/cnicodeme/f2c73d89ac49313d023d738b5cdb7046</code></pre>
                                    <div class="copy">
                                        <a ref="copy" href="javascript:;" title="Click here to copy to clipoard" class="button" @click="copyCode">Copy to clipboard</a>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'visible': language == 'ruby'}">
                                <div class="code-section">
                                    <pre class="line-numbers language-ruby"><code>require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://en.wikipedia.org/wiki/PDF"}

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request.basic_auth 'api', 'your_api_key'

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("wikipedia.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end</code></pre>
                                    <div class="copy">
                                        <a ref="copy" href="javascript:;" title="Click here to copy to clipoard" class="button" @click="copyCode">Copy to clipboard</a>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'visible': language == 'java'}">
                                <div class="code-section">
                                    <pre class="line-numbers language-java"><code>import java.io.File;
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
        jsonObject.put("source", "https://en.wikipedia.org/wiki/PDF");
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
            var targetFile = new File("src/main/resources/wikipedia.pdf");
            Files.copy(response.body(), targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } else {
            // error occurred
        }
    }
}</code></pre>
                                    <div class="copy">
                                        <a ref="copy" href="javascript:;" title="Click here to copy to clipoard" class="button" @click="copyCode">Copy to clipboard</a>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'visible': language == 'csharp'}">
                                <div class="code-section">
                                    <pre class="line-numbers language-csharp"><code>using System;
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
                source = "https://en.wikipedia.org/wiki/PDF"
            };
            request.AddJsonBody(json);

            IRestResponse response = client.Execute(request);
            if (!response.IsSuccessful)
            {
                // Check why status is not int 2xx.
            }
            else
            {
                File.WriteAllBytes("wikipedia.pdf", response.RawBytes);
            }
        }
    }
}</code></pre>
                                    <div class="copy">
                                        <a ref="copy" href="javascript:;" title="Click here to copy to clipoard" class="button" @click="copyCode">Copy to clipboard</a>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'visible': language == 'go'}">
                                <div class="code-section">
                                    <pre class="line-numbers language-go"><code>package main

import (
    "bytes"
    "encoding/json"
    "io/ioutil"
    "log"
    "net/http"
)

func main() {
    API_KEY := "api:your_api_key"

    message := map[string]interface{}{
        "source":  "https://en.wikipedia.org/wiki/PDF",
    }

    bytesRepresentation, err := json.Marshal(message)
    if err != nil {
        log.Fatalln(err)
    }

    client := http.Client{}
    request, err := http.NewRequest("POST", "https://api.pdfshift.io/v3/convert/pdf", bytes.NewBuffer(bytesRepresentation))
    if err != nil {
        log.Fatalln(err)
    }
    request.Header.Set("Content-Type", "application/json")
    request.Header.Set("Authorization", "Basic " + API_KEY)

    resp, err := client.Do(request)
    if err != nil {
        log.Fatalln(err)
    }

    if resp.StatusCode &gt;= 200 && resp.StatusCode &lt; 300 {
        body, err := ioutil.ReadAll(resp.Body)
        if err != nil {
            log.Fatalln(err)
        }
        // write the response to file
        ioutil.WriteFile("wikipedia.pdf", body, 0644)
    } else {
        // An error occurred
        var result map[string]interface{}

        json.NewDecoder(resp.Body).Decode(&result)

        log.Println(result)
        log.Println(result["data"])
    }
}</code></pre>
                                    <div class="copy">
                                        <a ref="copy" href="javascript:;" title="Click here to copy to clipoard" class="button" @click="copyCode">Copy to clipboard</a>
                                    </div>
                                </div>
                            </div>
                            <div :class="{'visible': language == 'bash'}">
                                <div class="code-section">
                                    <pre class="line-numbers language-bash"><code>curl \
    -u 'api:your_api_key' \
    -H 'Content-Type: application/json' \
    -d '{"source":"https://en.wikipedia.org/wiki/PDF","landscape": false, "use_print": false}' \
    https://api.pdfshift.io/v3/convert/pdf \
    -o wikipedia.pdf

# That's all!</code></pre>
                                    <div class="copy">
                                        <a ref="copy" href="javascript:;" title="Click here to copy to clipoard" class="button" @click="copyCode">Copy to clipboard</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column three">
                        <ul class="unstyled code-selection">
                            <li :class="{'selected': language === 'javascript'}"><a href="javascript:;" title="View our code sample in Javascript" @click="language = 'javascript'">Javascript</a></li>
                            <li :class="{'selected': language === 'python'}"><a href="javascript:;" title="View our code sample in Python" @click="language = 'python'">Python</a></li>
                            <li :class="{'selected': language === 'php'}"><a href="javascript:;" title="View our code sample in PHP" @click="language = 'php'">PHP</a></li>
                            <li :class="{'selected': language === 'ruby'}"><a href="javascript:;" title="View our code sample in Ruby" @click="language = 'ruby'">Ruby</a></li>
                            <li :class="{'selected': language === 'java'}"><a href="javascript:;" title="View our code sample in JAVA" @click="language = 'java'">JAVA</a></li>
                            <li :class="{'selected': language === 'csharp'}"><a href="javascript:;" title="View our code sample in C#" @click="language = 'csharp'">C#</a></li>
                            <li :class="{'selected': language === 'go'}"><a href="javascript:;" title="View our code sample in GO" @click="language = 'go'">GO</a></li>
                            <li :class="{'selected': language === 'bash'}"><a href="javascript:;" title="View our code sample in cURL" @click="language = 'bash'">cURL</a></li>
                        </ul>
                        <a href="https://docs.pdfshift.io/" title="View our advanced documentation" class="button button-secondary" target="_blank">Full API Reference ➡</a>
                    </div>
                </div>
            </div>
        </div>

        <div id="features">
            <div class="container">
                <h2>Features</h2>

                <div class="row">
                    <div class="column">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                                <g>
                                    <path d="M2,17.5a.5.5,0,0,1,.5-.5h18a.5.5,0,0,1,0,1H2.5A.5.5,0,0,1,2,17.5ZM20.5,20H2.5a.5.5,0,0,0,0,1h18a.5.5,0,0,0,0-1Zm0,3H2.5a.5.5,0,0,0,0,1h18a.5.5,0,0,0,0-1ZM7.8535,5.8535,11,2.707V14.5a.5.5,0,0,0,1,0V2.707l3.1465,3.1465a.5.5,0,1,0,.707-.707l-4-4a.5.5,0,0,0-.707,0l-4,4a.5.5,0,0,0,.707.707Z" />
                                </g>
                            </svg>
                            <div>
                                <h5>Parallel conversions</h5>
                                <p>Process multiple documents in parallel to increase conversion speed.</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                                <g>
                                    <path d="M12.5,16A5.5,5.5,0,1,0,7,10.5,5.5,5.5,0,0,0,12.5,16Zm0-10A4.5,4.5,0,1,1,8,10.5,4.505,4.505,0,0,1,12.5,6Zm-.3,5.4A.5.5,0,0,1,12,11V8.5a.5.5,0,0,1,1,0v2.25l1.8,1.35a.5.5,0,1,1-.6.8ZM22.5,17H22V1.5A1.5,1.5,0,0,0,20.5,0H4.5A1.5,1.5,0,0,0,3,1.5V17H2.5A1.5,1.5,0,0,0,1,18.5v5A1.5,1.5,0,0,0,2.5,25h20A1.5,1.5,0,0,0,24,23.5v-5A1.5,1.5,0,0,0,22.5,17ZM4,1.5A.5006.5006,0,0,1,4.5,1h16a.5006.5006,0,0,1,.5.5V17H17.5A1.5,1.5,0,0,0,16,18.5v1a.5.5,0,0,1-.5.5h-6a.5.5,0,0,1-.5-.5v-1A1.5,1.5,0,0,0,7.5,17H4Zm19,22a.5.5,0,0,1-.5.5H2.5a.5.5,0,0,1-.5-.5v-5a.5.5,0,0,1,.5-.5h5a.5.5,0,0,1,.5.5v1A1.5017,1.5017,0,0,0,9.5,21h6A1.5017,1.5017,0,0,0,17,19.5v-1a.5.5,0,0,1,.5-.5h5a.5.5,0,0,1,.5.5Z" />
                                </g>
                            </svg>
                            <div>
                                <h5>Asynchronous request</h5>
                                <p>Use our powerful webhook system to be notified once a conversion is done.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                                <g>
                                    <path d="M4,14.05V.5a.5.5,0,0,0-1,0V14.05A2.5,2.5,0,0,0,3,18.95V22.5a.5.5,0,0,0,1,0V18.95A2.5,2.5,0,0,0,4,14.05ZM3.5,18A1.5,1.5,0,1,1,5,16.5,1.5016,1.5016,0,0,1,3.5,18ZM22,10.05V.5a.5.5,0,0,0-1,0v9.55A2.5,2.5,0,0,0,21,14.95V22.5a.5.5,0,0,0,1,0V14.95A2.5,2.5,0,0,0,22,10.05ZM21.5,14A1.5,1.5,0,1,1,23,12.5,1.5016,1.5016,0,0,1,21.5,14ZM13,4.05V.5a.5.5,0,0,0-1,0V4.05A2.5,2.5,0,0,0,12,8.95V22.5a.5.5,0,0,0,1,0V8.95A2.5,2.5,0,0,0,13,4.05ZM12.5,8A1.5,1.5,0,1,1,14,6.5,1.5016,1.5016,0,0,1,12.5,8Z" />
                                </g>
                            </svg>
                            <div>
                                <h5>Advanced Options</h5>
                                <p>Set custom headers and footers with pagination, inject custom CSS and javascript, encrypt your documents and many more!</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div>
                            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path d="M20.56 6.88L14.12.44A1.5 1.5 0 0 0 13.06 0H1.5C.67 0 0 .67 0 1.5v22c0 .83.67 1.5 1.5 1.5h18c.83 0 1.5-.67 1.5-1.5V7.94c0-.4-.16-.77-.44-1.06zm-1.3.12H14.5a.5.5 0 0 1-.5-.5l-.02-4.79L19.26 7zM20 23.5a.5.5 0 0 1-.5.5h-18a.5.5 0 0 1-.5-.5v-22c0-.28.22-.5.5-.5h11.47L13 6.5c0 .83.67 1.5 1.5 1.5H20v15.5z" />
                                    <path d="M8.93 18.57a.25.25 0 1 1-.36.36l-4.5-4.5a.25.25 0 0 1 0-.36l4.5-4.5a.25.25 0 1 1 .36.36L4.6 14.25l4.33 4.32zM11.57 9.93a.25.25 0 1 1 .36-.36l4.5 4.5c.1.1.1.26 0 .36l-4.5 4.5a.25.25 0 1 1-.36-.36l4.33-4.32-4.33-4.32z" />
                                </g>
                            </svg>
                            <div>
                                <h5>Raw HTML support</h5>
                                <p>No need to make your private page public. Simply send us your raw HTML data instead and we will convert it.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="column">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                                <g>
                                    <path class="cls-1" d="M18.5,3H6.5A1.5,1.5,0,0,0,5,4.5v16A1.5,1.5,0,0,0,6.5,22h12A1.5,1.5,0,0,0,20,20.5V4.5A1.5,1.5,0,0,0,18.5,3ZM19,20.5a.5.5,0,0,1-.5.5H6.5a.5.5,0,0,1-.5-.5V4.5A.5.5,0,0,1,6.5,4h12a.5.5,0,0,1,.5.5ZM8,8.5A.5.5,0,0,1,8.5,8h4a.5.5,0,0,1,0,1h-4A.5.5,0,0,1,8,8.5Zm9,4a.5.5,0,0,1-.5.5h-8a.5.5,0,0,1,0-1h8A.5.5,0,0,1,17,12.5Zm0,4a.5.5,0,0,1-.5.5h-8a.5.5,0,0,1,0-1h8A.5.5,0,0,1,17,16.5ZM3,.5v2a.5.5,0,0,1-.5.5H.5a.5.5,0,0,1,0-1H2V.5a.5.5,0,0,1,1,0Zm0,22v2a.5.5,0,0,1-1,0V23H.5a.5.5,0,0,1,0-1h2A.5.5,0,0,1,3,22.5Zm19-20V.5a.5.5,0,0,1,1,0V2h1.5a.5.5,0,0,1,0,1h-2A.5.5,0,0,1,22,2.5Zm3,20a.5.5,0,0,1-.5.5H23v1.5a.5.5,0,0,1-1,0v-2a.5.5,0,0,1,.5-.5h2A.5.5,0,0,1,25,22.5Z" />
                                </g>
                            </svg>
                            <div>
                                <h5>High-Fidelity PDF</h5>
                                <p>Generate a high-fidelity document, close to your original HTML, in a few seconds.</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25">
                                <g>
                                    <path d="M2,0V11c0,4.625,5.4375,12,10.5,12S23,15.625,23,11V0ZM22,11c0,4.2437-5.1872,11-9.5,11S3,15.2437,3,11V1H22ZM5,11.5v-8A.5.5,0,0,1,5.5,3h5a.5.5,0,0,1,0,1H6v7.5C6,14.3936,9.5493,19,12.5,19a.5.5,0,0,1,0,1C8.9507,20,5,14.9336,5,11.5Z" />
                                </g>
                            </svg>
                            <div>
                                <h5>Privacy-focused</h5>
                                <p>That's why your documents are not stored on our server (except when explicitly requested) and are not kept for more than 2 days.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="javascript:;" title="Get your API key for free and start converting now." class="button button-primary create-account" @click.prevent="$nuxt.$emit('showRegister')">Get my free API key ➡</a>
            </div>
        </div>

        <div id="testimonials">
            <div class="container">
                <h2>They trust us.</h2>
                <p class="excerpt">More than 90 positives reviews can not lie, see for yourself:</p>

                <div class="testimonials__list">
                    <div class="testimonials__list--item">
                        <img src="/images/testimonials/nomadwebdesign.jpg" alt="Nomad Web Design's profile" class="testimonials__list--avatar" />
                        <div class="testimonials__list--quote">
                            <blockquote cite="https://alternativeto.net/software/pdfshift/about/#app-comment-64326">So far this is one of the best HTML to PDF converters I have come across. I like that it's simple and does a good job. Also, their support and pricing is great!</blockquote>
                            <div class="testimonials__list--details">
                                <span class="testimonials__list--author">Nomad WebDesign (<a href="https://alternativeto.net/software/pdfshift/about/#app-comment-64326" target="_blank">AlternativeTo</a>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonials__list--item">
                        <img src="https://secure.gravatar.com/avatar/5b5de1b1555183679389a8d656f19e65?d=mm&s=96" alt="Greg's profile" class="testimonials__list--avatar" />
                        <div class="testimonials__list--quote">
                            <blockquote cite="https://www.capterra.com/p/184246/PDFShift/#reviews">Stop rolling your own PDF generator - PDFShift has done it better.</blockquote>
                            <div class="testimonials__list--details">
                                <span class="testimonials__list--author">Greg P. (<a href="https://www.capterra.com/p/184246/PDFShift/#reviews" target="_blank">Capterra</a>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonials__list--item">
                        <img src="/images/testimonials/billy.jpeg" alt="Billy's profile" class="testimonials__list--avatar" />
                        <div class="testimonials__list--quote">
                            <blockquote cite="https://www.g2.com/products/pdfshift/reviews/pdfshift-review-1353501">Perfect rendering, easy to setup and use.</blockquote>
                            <div class="testimonials__list--details">
                                <span class="testimonials__list--author">Billy B. (<a href="https://www.g2.com/products/pdfshift/reviews/pdfshift-review-1353501" target="_blank">G2</a>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonials__list--item">
                        <img src="/images/testimonials/sk.png" alt="Sky's profile" class="testimonials__list--avatar" />
                        <div class="testimonials__list--quote">
                            <blockquote cite="https://alternativeto.net/software/pdfshift/about/#app-comment-71289">Very easy to use, highly customizeable, and works just as intended. The biggest feature missing from other PDF APIs was the ability to decide where a page "breaks" and continues on to a new page. PDFShift made doing so easy with a simple CSS class.</blockquote>
                            <div class="testimonials__list--details">
                                <span class="testimonials__list--author">Skystover (<a href="https://alternativeto.net/software/pdfshift/about/#app-comment-71289" target="_blank">AlternativeTo</a>)</span>
                            </div>
                        </div>
                    </div>
                    <div class="testimonials__list--item">
                        <img src="/images/testimonials/greg.png" alt="Greg's profile" class="testimonials__list--avatar" />
                        <div class="testimonials__list--quote">
                            <blockquote cite="https://alternativeto.net/software/pdfshift/about/#app-comment-66794">PDFShift is awesome! Before I was creating PHP PDF files through fPDF and it was very time consuming and difficult. Now with PDFShift, I can just mock them up in HTML and CSS and then through a very simple and easy to use API I can create a PDF in a matter of seconds. I highly recommend PDFShift.</blockquote>
                            <div class="testimonials__list--details">
                                <span class="testimonials__list--author">Greg R. (<a href="https://alternativeto.net/software/pdfshift/about/#app-comment-66794" target="_blank">AlternativeTo</a>)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row review__sites">
                    <div>
                        <a class="review__sites--item" href="https://www.capterra.com/reviews/184246/PDFShift?utm_source=vendor&utm_medium=badge&utm_campaign=capterra_reviews_badge" title="See our reviews on Capterra" target="_blank">
                            <span class="review__sites--logo"><SvgCapterra /></span>
                            <span class="review__sites--stars"><SvgFiveStars /><SvgFiveStars /><SvgFiveStars /><SvgFiveStars /><SvgHalfStars /></span>
                            <p class="review__sites--text">Read all reviews on Capterra &gt;</p>
                        </a>
                    </div>
                    <div>
                        <a class="review__sites--item" href="https://www.g2.com/products/pdfshift/reviews#reviews" title="See our reviews on G2Crowd" target="_blank">
                            <span class="review__sites--logo"><SvgGTwo /></span>
                            <span class="review__sites--stars"><SvgFiveStars /><SvgFiveStars /><SvgFiveStars /><SvgFiveStars /><SvgHalfStars /></span>
                            <p class="review__sites--text">Read all reviews on G2Crowd &gt;</p>
                        </a>
                    </div>
                    <div>
                        <a class="review__sites--item" href="https://alternativeto.net/software/pdfshift/reviews/" title="See our reviews on AlternativeTo" target="_blank">
                            <span class="review__sites--logo"><SvgAlternativeTo /></span>
                            <span class="review__sites--stars"><SvgFiveStars /><SvgFiveStars /><SvgFiveStars /><SvgFiveStars /><SvgFiveStars /></span>
                            <p class="review__sites--text">Read all reviews on AlternativeTo &gt;</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div id="pricing">
            <h2>Pricing</h2>
            <div class="container">
                <div class="pricing">
                    <div class="pricing__intro">
                        Start with a <strong>Free 50 credits per month at up to 1Mb per PDF</strong>,<br />and upgrade to the plan that best match your needs..
                    </div>

                    <div class="pricing__switchgroup">
                        <label for="pricing-toggle-checkbox" class="pricing__switchgroup__title" :class="{'active': pricingPlan === 'monthly'}">Monthly</label>
                        <div class="pricing__toggle">
                            <label class="pricing__toggle__checkbox" for="pricing-toggle-checkbox">
                                <input id="pricing-toggle-checkbox" type="checkbox" @change="togglePricing" />
                                <div class="pricing__toggle__slider"></div>
                            </label>
                        </div>
                        <label for="pricing-toggle-checkbox" class="pricing__switchgroup__title" :class="{'active': pricingPlan === 'yearly'}">Annual</label>
                    </div>

                    <div class="pricing__cards-grid">
                        <!-- First card -->
                        <div class="pricing__card">
                            <div class="pricing__card__top">
                                <div>
                                    <div class="pricing__card__name">Startup</div>
                                    <div class="pricing__card__price fade-in from-bottom" :class="{'active': pricingPlan === 'monthly'}">$9<sup>mo</sup></div>
                                    <div class="pricing__card__price fade-in from-bottom" :class="{'active': pricingPlan === 'yearly'}">$90<sup>yr</sup></div>
                                </div>
                                <SvgPricingSmall />
                            </div>
                            <div class="pricing__card__body">
                                <ul class="pricing__card__body-list">
                                    <li>Monthly credits<span>500</span></li>
                                    <li>Overage cost<span>0.04$/conv</span></li>
                                    <li>
                                        Dynamic file size limit
                                        <div class="pricing__card__tooltip">
                                            <i class="pricing__card__tooltip-icon"><SvgPricingQuestion /></i>
                                            <div class="pricing__card__tooltip-content">A credit is counted per 5Mb chunks.<br />For instance, a 15Mb PDF will use 3 credits.</div>
                                        </div>
                                        <span>1 conv. per 5Mb</span>
                                    </li>
                                </ul>
                                <div class="pricing__card__body__sub">
                                    + Advanced Custom Header & Footer, Encryption, Watermark, Asynchronous requests, Parallel Conversion, Wait for custom elements, ...
                                </div>
                            </div>
                            <a href="javascript:;" class="button button-secondary pricing__card__button" @click="$nuxt.$emit('showRegister')">Sign up for free now</a>
                        </div>
                        <!-- Second card -->
                        <div class="pricing__card pricing__card--highlight">
                            <div class="pricing__card__top">
                                <div>
                                    <div class="pricing__card__name">Boost</div>
                                    <div class="pricing__card__price fade-in from-bottom" :class="{'active': pricingPlan === 'monthly'}">$24<sup>mo</sup></div>
                                    <div class="pricing__card__price fade-in from-bottom" :class="{'active': pricingPlan === 'yearly'}">$240<sup>yr</sup></div>
                                </div>
                                <SvgPricingMedium />
                            </div>
                            <div class="pricing__card__body">
                                <ul class="pricing__card__body-list">
                                    <li>Monthly credits<span>2,500</span></li>
                                    <li>Overage cost<span>0.03$/conv</span></li>
                                    <li>
                                        Dynamic file size limit
                                        <div class="pricing__card__tooltip">
                                            <i class="pricing__card__tooltip-icon"><SvgPricingQuestion /></i>
                                            <div class="pricing__card__tooltip-content">A credit is counted per 5Mb chunks.<br />For instance, a 15Mb PDF will use 3 credits.</div>
                                        </div>
                                        <span>1 conv. per 5Mb</span>
                                    </li>
                                </ul>
                                <div class="pricing__card__body__sub">
                                    + Advanced Custom Header & Footer, Encryption, Watermark, Asynchronous requests, Parallel Conversion, Wait for custom elements, ...
                                </div>
                            </div>
                            <a href="javascript:;" class="button button-primary pricing__card__button" @click="$nuxt.$emit('showRegister')">Sign up for free now</a>
                        </div>
                        <div class="pricing__card">
                            <div class="pricing__card__top">
                                <div>
                                    <div class="pricing__card__name">Growth</div>
                                    <div class="pricing__card__price fade-in from-bottom" :class="{'active': pricingPlan === 'monthly'}">$39<sup>mo</sup></div>
                                    <div class="pricing__card__price fade-in from-bottom" :class="{'active': pricingPlan === 'yearly'}">$390<sup>yr</sup></div>
                                </div>
                                <SvgPricingLarge />
                            </div>
                            <div class="pricing__card__body">
                                <ul class="pricing__card__body-list">
                                    <li>Monthly credits<span>5,000</span></li>
                                    <li>Overage cost<span>0.025$/conv</span></li>
                                    <li>
                                        Dynamic file size limit
                                        <div class="pricing__card__tooltip">
                                            <i class="pricing__card__tooltip-icon"><SvgPricingQuestion /></i>
                                            <div class="pricing__card__tooltip-content">A credit is counted per 5Mb chunks.<br />For instance, a 15Mb PDF will use 3 credits.</div>
                                        </div>
                                        <span>1 conv. per 5Mb</span>
                                    </li>
                                </ul>
                                <div class="pricing__card__body__sub">
                                    + Advanced Custom Header & Footer, Encryption, Watermark, Asynchronous requests, Parallel Conversion, Wait for custom elements, ...
                                </div>
                            </div>
                            <a href="javascript:;" class="button button-secondary pricing__card__button" @click="$nuxt.$emit('showRegister')">Sign up for free now</a>
                        </div>
                    </div>

                    <div class="pricing__contact">
                        <div>
                            <h3 class="pricing__contact__title">Need MORE?</h3>
                            <p>PDFShift adjusts to your need with higher plan, from <strong>25k credits (99$/m) to up to 1 Millions credits (1,000$/m)</strong>.</p>
                        </div>
                        <NuxtLink to="/contact/" title="Compare our pricing" class="button pricing__contact__button">Contact US</NuxtLink>
                    </div>
                    <div class="pricing__footer">
                        <NuxtLink to="/pricing/" title="Compare our pricing">
                            Compare all plans&nbsp;
                            <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.73438 6.53125V6.56641C6.80469 6.49609 6.83984 6.39062 6.83984 6.25C6.83984 6.14453 6.80469 6.03906 6.73438 5.93359L1.56641 0.730469C1.46094 0.660156 1.35547 0.625 1.25 0.625C1.14453 0.625 1.03906 0.660156 0.96875 0.730469L0.265625 1.43359C0.195312 1.53906 0.160156 1.64453 0.160156 1.75C0.160156 1.89062 0.195312 1.96094 0.265625 2.03125L4.44922 6.25L0.265625 10.4688C0.195312 10.5391 0.160156 10.6445 0.160156 10.75C0.160156 10.8906 0.195312 10.9961 0.265625 11.0664L0.96875 11.7695C1.03906 11.8398 1.14453 11.875 1.25 11.875C1.35547 11.875 1.46094 11.8398 1.56641 11.7344L6.73438 6.53125Z" fill="#623E98" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <div id="contact">
            <div class="container">
                <h2>Contact Our Sales Team</h2>
                <ContactForm />
            </div>
        </div>
    </div>
</template>

<script>
import Prism from '~/plugins/prism'

import SvgFiveStars from '~/assets/images/misc/5-stars.svg?inline'
import SvgHalfStars from '~/assets/images/misc/half-stars.svg?inline'

import SvgCapterra from '~/assets/images/misc/capterra.svg?inline'
import SvgGTwo from '~/assets/images/misc/g2crowd.svg?inline'
import SvgAlternativeTo from '~/assets/images/misc/alternativeto.svg?inline'

import SvgPricingSmall from '~/static/images/pricing/small.svg?inline'
import SvgPricingMedium from '~/static/images/pricing/medium.svg?inline'
import SvgPricingLarge from '~/static/images/pricing/large.svg?inline'
import SvgPricingQuestion from '~/static/images/pricing/question-circle.svg?inline'

import ContactForm from '~/components/ContactForm'

const seoTitle = 'The Leading HTML to PDF conversion API'
const seoDescription = 'An API to convert HTML/CSS documents to PDF. PDFShift is the reliable, Up-to-date and high-fidelity conversion API with no maintenance costs.'

const statistics = {
    conversions: '22+ Millions',
    users: '15,000+'
}

export default {
    components: {
        SvgFiveStars,
        SvgHalfStars,
        SvgCapterra,
        SvgGTwo,
        SvgAlternativeTo,
        SvgPricingSmall,
        SvgPricingMedium,
        SvgPricingLarge,
        SvgPricingQuestion,
        ContactForm
    },
    data () {
        return {
            pricingPlan: 'monthly',
            language: 'javascript',
            statistics
        }
    },
    head: {
        title: seoTitle + ' — PDFShift',
        meta: [
            { hid: 'description', name: 'description', content: seoDescription },
            { hid: 'twitter:title', name: 'twitter:title', content: seoTitle },
            { hid: 'og:title', name: 'og:title', content: seoTitle },
            { hid: 'twitter:description', name: 'twitter:description', content: seoDescription },
            { hid: 'og:description', name: 'og:description', content: seoDescription }
        ]
    },
    mounted () {
        Prism.highlightAll()
    },
    methods: {
        copyCode ($event) {
            const currentTarget = $event.currentTarget
            const code = document.querySelector('#code .code-samples>.visible>.code-section>pre>code')
            if (navigator.clipboard) {
                navigator.clipboard.writeText(code.innerText).then(
                    () => this.copySuccess(currentTarget),
                    () => this.copyFailure(currentTarget)
                )
            } else {
                const textArea = document.createElement('textarea')
                textArea.value = code.innerText

                // Avoid scrolling to bottom
                textArea.style.top = '0'
                textArea.style.left = '0'
                textArea.style.position = 'fixed'

                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()

                try {
                    if (!document.execCommand('copy')) {
                        throw new Error('Unable to copy')
                    }
                    this.copySuccess(currentTarget)
                } catch (err) {
                    this.copyFailure(currentTarget)
                }

                document.body.removeChild(textArea)
            }
        },
        copySuccess (target) {
            target.innerText = 'Copied!'
            target.classList.add('button-disabled')
            setTimeout(function () {
                target.innerText = 'Copy to clipboard'
                target.classList.remove('button-disabled')
            }, 5000)
        },
        copyFailure (target) {
            target.innerText = 'An error occured!'
            target.classList.add('button-disabled')
        },
        togglePricing () {
            this.pricingPlan = (this.pricingPlan === 'monthly' ? 'yearly' : 'monthly')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/_common';

main>div>div {
    padding: 60px 0;
}

main h2 {
    text-align: center;
    color: #24272a;
    position: relative;
    margin: 0 0 60px;
    padding: 0 0 40px;

    &::after {
        content: "";
        position: absolute;
        border-top: 5px solid $color-ternary;
        border-radius: 5px;
        bottom: 0px;
        left: calc(50% - 50px);
        width: 100px;
        height: 0px;
    }

    &+.excerpt {
        margin-top: -20px;
        margin-bottom: 60px;
        letter-spacing: 1px;
    }
}
</style>

<style lang="scss">
@import '@/assets/css/_common';

.home {
    #brands ul {
        display: flex;
        justify-content: space-around;
        margin: 0;

        h2 small {
            display: block;
            font-size: 0.8em;
            font-style: italic;
        }

        li img {
            width: 150px;
        }
    }

    #numbers {
        background-color: #192638;
        color: $color-white;

        h2 {
            color: $color-white;
        }

        ul {
            margin: 80px 0 0;
            padding: 0;
            display: flex;
            width: 100%;
            justify-content: space-between;

            >li {
                text-align: center;

                h5 {
                    font-size: 2rem;
                    color: $color-white;
                    margin: 20px 0 10px;
                }

                svg {
                    fill: #fbfbfb;
                    width: 64px;
                }

                span {
                    color: rgba(141, 147, 155, 0.8);
                    font-size: 1.2rem;
                    font-weight: bold;
                }
            }

        }
    }

    #code {
        background-color: $color-white;

        .row {
            .nine {
                border: solid 1px $color-light-grey;
                border-radius: 5px;

                &>div {
                    padding: 20px;
                    &>div {
                        display: none;
                        position: relative;

                        pre>code {
                            font-family: monospace;
                            font-size: 1rem;
                        }

                        pre {
                            overflow: auto;
                        }

                        &.visible {
                            display: block;
                        }

                        .copy {
                            position: absolute;
                            top: 0;
                            right: 0;
                            display: inline-block;
                            text-align: right;
                            margin: 0;
                            a {
                                background-color: $color-light-grey;
                                color: $color-text-grey;
                                opacity: 0.5;
                                transition: opacity 250ms ease-in-out;
                                padding: 10px 30px;
                                font-style: italic;

                                &.button-disabled {
                                    opacity: 0.5 !important;
                                    cursor: default;
                                    pointer-events: none;
                                    user-select: none;
                                }

                                &:hover {
                                    opacity: 1;
                                }
                            }
                        }
                    }
                }
            }

            .three {
                ul {
                    margin: 0 0 0 40px;
                    padding: 0;

                    >li {
                        padding: 0;
                        margin: 5px 0;

                        a {
                            outline: none;
                            padding: 10px 20px;
                            font-weight: bold;
                            background-color: $color-white;
                            color: #9d9d9d;
                            border-radius: 5px;
                            display: block;
                            transition: background-color 250ms ease-in-out, color 250ms ease-in-out;
                            border: solid 1px transparent;

                            &:hover {
                                background-color: fade-out(lighten($color-ternary, 20%), .7);
                                color: lighten($color-ternary, 10%);
                            }
                        }

                        &.selected>a {
                            color: $color-primary;
                            border: solid 1px $color-ternary;
                            background-color: fade-out($color-ternary, 0.8);
                        }
                    }
                }

                @include clearfix();

                &>a {
                    display: block;
                    margin: 0px 0 0 40px;
                    padding: 10px 20px;
                }
            }
        }
    }

    #features {
        border-top: solid 1px $color-light-grey;
        background-color: #fbfbfb;
        box-sizing: border-box;

        .column {
            margin-top: 20px;
            margin-right: 20px;
            margin-left: 0;
            display: flex;

            &:last-child {
                margin-right: 0;
            }

            >div {
                padding: 10px;
                margin: 0;
                display: flex;
                align-items: center;
                background-color: #fff;
                border: solid 1px $color-light-grey;
                border-radius: 5px;

                >svg {
                    flex: 0 0 25%;
                    height: 50px;
                    fill: #484848;
                }

                >div {
                    text-align: left;
                    padding: 20px 20px 20px 0;

                    flex: 1 1 75%;

                    h5 {
                        font-size: 1.2em;
                        color: $color-text-grey;
                        margin: 0 0 10px;
                        padding: 0;
                    }

                    p {
                        margin: 0;
                        padding: 0;
                        line-height: 1.2em;
                        color: #7e7e7e;
                    }
                }
            }
        }

        .container {
            text-align: center;
            >a {
                display: inline-block;
                margin: 40px 0 0;
            }
        }
    }

    #testimonials {
        border-top: solid 1px #e7e7e7;

        $purple-shadow: 0px 8px 25px rgba(130, 96, 182, 0.15);

        .testimonials__list {
            margin: 3em auto;
            max-width: 40em;

            &--item {
                display: flex;
                flex-direction: row;
                margin: 2em 0;
            }

            &--avatar {
                border-radius: 50%;
                height: 4em;
                width: 4em;
            }

            &--quote {
                border: solid 1px $color-light-grey;
                box-shadow: $purple-shadow;
                display: block;
                position: relative;
                width: 100%;
                border-radius: 5px;
                background-image: url('/images/testimonials/quote-left.svg');
                background-repeat: no-repeat;
                background-position: 1.5em 1.5em;
                padding: 1.5em 1.5em 1.5em 4.5em;
                margin-left: 1.5em;

                &:before {
                    content: "";
                    display: block;
                    height: 0.8em;
                    width: 0.8em;
                    position: absolute;
                    top: 1.7em;
                    left: -0.5em;
                    background: $color-white;
                    border-right: 1px solid $color-light-grey;
                    border-bottom: 1px solid $color-light-grey;
                    transform:rotate(135deg);
                    -moz-transform:rotate(135deg);
                    -webkit-transform:rotate(135deg);
                }

                blockquote {
                    color: $color-text-grey;
                    font-weight: 600;
                    font-size: 1em;
                    margin: 0 auto 0.5em;
                    line-height: 1.7;
                }
            }

            &--details {
                display: flex;
                flex-direction: row;
            }

            &--author {
                font-size: 0.9em;
                font-weight: 600;
                color: $color-grey;
            }

            &--stars {
                margin-left: 0.6em;
                padding-top: 2px;
                svg {
                    width: 1em;
                    height: 1em;
                    fill: #ffca00;
                }

            }
            @include media-mobiles {
                &--item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                &--quote {
                    margin-left: 0;
                    margin-top: 1em;
                    &:before {
                        top: -0.4em;
                        left: 48%;
                        transform:rotate(-135deg);
                        -moz-transform:rotate(-135deg);
                        -webkit-transform:rotate(-135deg);
                    }
                }
            }
        }

        .review__sites {
            margin: 4em 0 2em;

            &--logo svg {
                height: 60px;
                max-width: 200px;
            }

            &--stars {
                margin: 10px 0;
                svg {
                    width: 24px;
                    height: 24px;
                    fill: #ffca00;
                }
            }

            &--text {
                margin: 0;
                padding: 0;
                font-weight: 500;
                font-size: 0.9em;
                &:after {
                    content: "";
                    background-image: url('/images/testimonials/angle-right.svg');
                    display: inline-block;
                    width: 1em;
                    height: 0.7em;
                    background-repeat: no-repeat;
                    background-position: center center;
                    margin-left: 0.5em;
                }
            }

            &--item {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                border-bottom: 0;
                filter: grayscale(25%);
                transition: all 200ms ease-in-out;
                color: $color-text-grey-secondary;
                flex: 1;
                padding: 1em;
                margin: 2em 0;

                &:hover {
                    text-decoration: none;
                    filter: grayscale(0);
                    color: $color-primary;

                    .review__sites--text:after {
                        background-image: url('/images/testimonials/angle-right-purple.svg');
                    }
                }
            }
        }
    }

    #pricing {
        border-top: 1px solid #e8e8e8;
        background-color: #fbfbfb;
    }

    .pricing {
        color: $color-black;
        &__intro {
            color: $color-black;
            text-align: center;
            margin: 0 auto 3em;
            max-width: 40em;
            font-weight: 300;
        }
        &__switchgroup {
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
            &__title {
                font-size: 0.8em;
                margin: 0 0.5em;
                color: $color-grey;
                font-weight: 500;
                &.active {
                    color: $color-black;
                }
            }
        }
        &__toggle {
            &__checkbox {
                display: inline-block;
                height: 34px;
                position: relative;
                vertical-align: top;
                width: 60px;

                input {
                    display: none;

                    &:checked + .pricing__toggle__slider:before {
                        transform: translateX(26px);
                    }
                }
            }
            &__slider {
                background-color: $color-grey-purple;
                border-radius: 34px;
                bottom: 0;
                cursor: pointer;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                transition: .4s;
                &:before {
                    background-color: $color-white;
                    bottom: 4px;
                    content: "";
                    height: 26px;
                    left: 4px;
                    position: absolute;
                    transition: .4s;
                    width: 26px;
                    border-radius: 50%;
                }
            }
        }
        &__cards-grid {
            display: flex;
            margin: 2em 0;
        }
        &__card {
            box-shadow: $purple-shadow;
            border-radius: 6px;
            padding: 1.5em;
            flex: 1;
            margin-right: 1em;
            &:last-child {
                margin-right: 0;
            }
            &--highlight {
                border: 1px solid $color-primary;
            }
            &__top {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                padding-bottom: 1.5em;
                border-bottom: 1px solid rgba($color-black, 0.05);
            }
            &__name {
                font-size: 1.2em;
                font-weight: 500;
                margin-top: 0.5em;
                color: $color-text-grey-secondary;
                line-height: 1;
            }
            &__tooltip {
                display: inline-block;
                position: relative;
                margin-left: 0.2em;
                line-height: 1em;
                &-icon {
                    cursor: pointer;
                    svg {
                        height:0.9em;
                        width:0.9em;
                        display: inline-flex;
                        position: relative;
                        top: .09em;
                    }
                    &:hover + .pricing__card__tooltip-content {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                &-content {
                    position: absolute;
                    font-size: 14px;
                    width: 20rem;
                    left: -10rem;
                    top: 1.6rem;
                    background-color: rgba(0,0,0,0.75);
                    color: $color-white;
                    text-align: center;
                    padding: 0.5em;
                    border-radius: 2px;
                    transition: all 200ms ease-in-out;
                    transform: translateY(10px);
                    opacity: 0;
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        left: calc(10rem + 2px);
                        top: -6px;
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 0 5px 6px 5px;
                        border-color: transparent transparent rgba(0,0,0,0.75) transparent;
                    }
                }
            }
            &__price {
                font-size: 2.5em;
                font-weight: 500;
                line-height: 1;
                margin-top: 0.2em;
                sup {
                    vertical-align: text-top;
                    font-size: 0.3em;
                }
                display: none;
                &.active {
                    display: block;
                }
            }
            &__body {
                color: $color-text-grey;
                font-size: 0.85em;
                &__sub {
                    margin: 0.5em 0 1.5em;
                    font-size: 0.9em;
                }
            }
            &__button {
                margin: 0 auto !important;
                padding: 1.5em 0.5em!important;
                width: calc(100% - 1em);
                text-transform: uppercase;
                letter-spacing: 0 !important;
                text-align: center;
            }
            &__body-list {
                li {
                    margin: 0.3em 0 0.3em 1em !important;
                    font-weight: 600;
                    &:before {
                        content: "";
                        height: 1em;
                        background-color: rgba(255,255,255,0.7);
                        display: inline-block;
                        width: 1em;
                        margin-left: -1.2em;
                    }
                    span {
                        float: right;
                        color: $color-black;
                    }
                }
            }
        }

        &__contact {
            margin: 2.5em 0;
            padding: 1.5em;
            background-color: rgba($color-grey-purple, 0.25);
            display: flex;
            border-radius: 6px;
            justify-content: space-around;
            &__title {
                margin: 0;
                font-size: 1.1em;
                font-weight: 500;
                color: $color-black;
            }
            p {
                margin: 0.5em 0 0;
                font-weight: 300;
                color: $color-text-grey;
            }
            &__button {
                background-color: rgba($color-primary, 0.05);
                border: 1px solid rgba($color-grey-purple, 0.4) !important;
                letter-spacing: 0 !important;
                padding: 1em 0.5em !important;
                margin: 0.5em 0 0 0.5em !important;
                width: 200px;
                text-align: center;
                text-transform: uppercase;
                transition: background-color 200ms ease-in-out;
                &:hover {
                    background-color: rgba($color-primary, 0.1);
                }
            }
        }

        &__footer {
            display: flex;
            align-items: center;
            margin: .5em 0 2.5em;
            justify-content: center;
            a {
                border-bottom: none;
                line-height: 1.5rem;
                padding: 0;
                font-weight: 500;
            }
        }
    }

    // small screens
    @include media-mobiles {
        .pricing {
            &__cards-grid {
                flex-direction: column;
            }
            &__card {
                margin: 0.5em 0;
                &__button {
                    padding: 1em 0.5em !important;
                }
            }
            &__footer {
                flex-direction: column;
                text-align: center;
                &__text {
                    max-width: 100%;
                }
                &__link {
                    margin-top: 0.5em;
                }
            }
            &__contact {
                flex-direction: column;
                text-align: center;
                &__button {
                    margin: 1em auto 0 auto !important;
                }
            }
        }
    }

    @include media-tablets {
        .pricing {
            &__card {
                font-size: 0.9em;
                padding: 1em;
                &:not(:last-child) {
                    margin-right: 1em;
                }
            }
            &__footer {
                flex-direction: column;
                text-align: center;
                &__text {
                    max-width: 100%;
                }
                &__link {
                    margin-top: 0.5em;
                }
            }
        }
    }

    #contact {
        background-color: $color-secondary;
        margin-bottom: 220px;

        h2 { margin: 0 0 60px; }
        form { margin-bottom: -260px }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~ Responsive ~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // handled
    @include media-mobiles {
        #brands ul {
            display: block;

            li {
                display: block;
                text-align: center;
                margin-top: 20px;

                &:first-child {
                    margin-top: 0;
                }

                img {
                    width: 50% !important;
                }
            }
        }

        #numbers {
            ul {
                display: block !important;
                margin: 30px 0 0;

                &>li {
                    margin: 30px 0 0 0 !important;

                    &:first-child {
                        margin-top: 0 !important;
                    }
                }
            }
        }

        #code {
            .code-section {
                pre {
                    padding-top: 50px;
                }

                .copy {
                    left: 0;
                    text-align: center !important;
                }
            }
        }

        #testimonials {
            .container>div {

                >a {
                    &:first-child {
                        left: 0;
                    }
                    &:last-child {
                        right: 0;
                    }
                }
            }

            ul>li {
                flex: 0 0 100% !important;
            }
        }
    }

    // tablets
    @include media-tablets {
        #testimonials {
            .container>div {

                >a {
                    &:first-child {
                        left: 0px;
                    }
                    &:last-child {
                        right: 0px;
                    }
                }
            }
            ul>li {
                flex: 0 0 50% !important;
            }
        }
    }

    // small screen
    @include media-small {
        .home main>div {
            padding-left: 20px;
            padding-right: 20px;
        }

        body main .container-small {
            padding-left: 20px;
            padding-right: 20px;
        }

        #brands ul li {
            text-align: center;

            img {
                width: 75%;
            }
        }

        #numbers {
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin: 30px 0 0;

                &>li {
                    display: block;
                    flex: 1 0 45%;
                    min-height: 167px;
                    margin-bottom: 30px;
                }
            }
        }

        #code {
            .row .three {
                ul {
                    margin: 0px;
                }

                &>a {
                    margin: 20px 0 0;
                }
            }
        }

        #features .column>div {
            width: 100%;
        }

        .pricing {
            &__card-wrapper {
                height: 250px;
            }

            &__slider {
                display: none;
            }

            &__main {
                padding-left: 0;
            }

            &__main-input {
                display: none;
            }
        }
    }
}
</style>
