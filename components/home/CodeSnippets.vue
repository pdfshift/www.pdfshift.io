<template>
    <div class="rounded-lg bg-gradient-radial bg-navy-700 border-purple border shadow-lg max-w-xl mx-auto lg:max-w-none">
        <div>
            <div class="flex items-center gap-2 p-4">
                <span class="rounded-full w-2.5 h-2.5 bg-green-300"></span>
                <span class="rounded-full w-2.5 h-2.5 bg-yellow-400"></span>
                <span class="rounded-full w-2.5 h-2.5 bg-red-500"></span>
            </div>
            <ul class="flex gap-3 lg:gap-6 px-2 relative top-0.5">
                <template v-for="(tab, key) in tabs" :key="tab.language">
                    <li class="px-2 py-3 cursor-pointer text-sm lg:text-base" @click="selectLanguage(tab)" :class="{
                        'border-b-purple-400 border-b-2 text-white font-extrabold': (currentTab.language === tab.language),
                        'text-purple-400': (currentTab.language !== tab.language),
                        'hidden sm:block': (key > 3),
                        'hidden lg:block': (key > 5),
                    }">
                        {{ tab.label }}
                    </li>
                </template>
            </ul>
        </div>
        <div class="lg:px-4 py-3 border-t-2 border-purple text-xs md:text-base overflow-x-auto">
            <ContentProsePre :language="currentTab.language" :code="currentTab.content" />
        </div>
    </div>
</template>

<script setup>
import ContentProsePre from '~/components/content/ProsePre.vue'

// Missing: Java & Go
const tabs = ref([
    {
        label: 'Python',
        language: 'python',
        content: `import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    headers={
        'X-API-Key': 'sk_XXXXXXXXXX'
    },
    json={"source": "https://en.wikipedia.org/wiki/PDF"}
)

response.raise_for_status()

with open('wikipedia.pdf', 'wb') as f:
    f.write(response.content)
`
    },
    {
        label: 'NodeJS',
        language: 'javascript',
        content: `const fetch = require('node-fetch')

const response = await fetch(
    'https://api.pdfshift.io/v3/convert/pdf',
    {
        method: 'POST',
        headers: {
            'X-API-Key': 'sk_XXXXXXXXXX',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            source: 'https://en.wikipedia.org/wiki/PDF'
        }
    )
})

response.body.pipe(fs.createWriteStream('wikipedia.pdf'))

// You can also use Axios if you want:
// https://gist.github.com/cnicodeme/28ade69b269ca0a4af0a7c29c479b747
`
    },
    {
        label: 'PHP',
        language: 'php',
        content: `<?php
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.pdfshift.io/v3/convert/pdf",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode(array("source" => "https://en.wikipedia.org/wiki/PDF")),
    CURLOPT_HTTPHEADER => array(
        'Content-Type:application/json',
        'X-API-Key:sk_XXXXXXXXXX'
    )
));

$response = curl_exec($curl);
file_put_contents('wikipedia.pdf', $response);

// We even made a GIST for you at:
// https://gist.github.com/cnicodeme/f2c73d89ac49313d023d738b5cdb7046`
    },
    {
        label: 'Ruby',
        language: 'ruby',
        content: `require 'uri'
require 'net/https'
require 'json' # for hash to_json conversion

uri = URI("https://api.pdfshift.io/v3/convert/pdf")
data = {"source" => "https://en.wikipedia.org/wiki/PDF"}

Net::HTTP.start(uri.host, uri.port, :use_ssl => true) do |http|
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = data.to_json
    request["Content-Type"] = "application/json"
    request["X-API-Key"] = "sk_XXXXXXXXXX"

    response = http.request(request)

    if response.code == '200'
        # Since Ruby 1.9.1 only:
        File.binwrite("wikipedia.pdf", response.body)
    else
        # Handle other codes here
        puts "#{response.code} #{response.body}"
    end
end`
    },
    {
        label: 'C#',
        language: 'csharp',
        content: `using System;
using RestSharp;
using Newtonsoft.Json;
using System.IO;
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
            client.AddDefaultHeader("X-API-Key", "sk_XXXXXXXXXX");

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
}`
    },
    {
        label: 'cURL',
        language: 'bash',
        content: `curl 
    -H 'Content-Type: application/json' 
    -H 'X-API-Key: sk_XXXXXXXXXX'
    -d '{"source":"https://en.wikipedia.org/wiki/PDF"}' 
    "https://api.pdfshift.io/v3/convert/pdf" 
    -o wikipedia.pdf

# That's all!`
    }
]);

const currentTab = ref(tabs.value[0]);
/*
onMounted(() => {
    const storage = useStorage()
    if (storage.get('language')) {
        const language = storage.get('language');
        currentTab.value = tabs.value.find(tab => tab.language === language);
    }
    visible.value = true
})
*/

function selectLanguage (tab) {
    currentTab.value = tab;
    useStorage().set('language', tab.language)
}
</script>

<style>
.hljs {
    background: transparent;
}
</style>
