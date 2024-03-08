<template>
  <section class="api fade-slide">
    <div class="api__holder">
      <div class="api__nav">
        <button 
          :class="['api__btn', {'api__btn--active': currentTab.label === tab.label }]"
          v-for="tab in tabs"
          :key="tab.label"
          @click="changeTab(tab)"
        >
          <img :src="tab.icon" :alt="tab.label">
        </button>
      </div><!-- / nav -->
      <div class="api__content">
        <!-- {{ activeContent }} -->
        <div>
          <pre 
            v-highlight
            :key="currentTab.label"
          >
            <code :class="currentTab.label.toLowerCase()">{{ currentTab.content }}</code>
          </pre>
        </div>
      </div><!-- / content -->
      <div>
      </div>
      <div class="api__footer">
        <button @click="copyToClipboard" class="api__link">
          <img src="~/assets/images/icons/ico-copy.svg" alt="copy">
          {{ buttonText }}
        </button>
        <NuxtLink :to="currentTab.githubURL" target="_blank" class="api__link">
          <img src="~/assets/images/icons/ico-github.svg" alt="GitHub">
          View on Github
        </NuxtLink>
        <NuxtLink to="https://docs.pdfshift.io/" target="_blank" class="api__link">
          Full API References
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_67_1435" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
              <rect width="16" height="16" fill="#A2A1B7"/>
            </mask>
            <g mask="url(#mask0_67_1435)">
              <path d="M9.33317 12L8.39984 11.0333L10.7665 8.66667H2.6665V7.33333H10.7665L8.39984 4.96667L9.33317 4L13.3332 8L9.33317 12Z" fill="#A2A1B7"/>
            </g>
          </svg>
        </NuxtLink>
      </div><!-- / footer -->
    </div><!-- / holder -->
  </section><!-- / api -->
</template>

<script setup>
import 'highlight.js/styles/atom-one-dark.css';
import '~/assets/scss/_highlight.scss';
import { ref, onMounted } from 'vue';

//code previews
const code = ref();

//tabs lables settings
const tabs = ref([
  {
    label: 'Python',
    icon: 'images/icons/ico-python.svg',
    githubURL: 'https://gist.github.com/discover',  
    content:
`import requests

response = requests.post(
    'https://api.pdfshift.io/v3/convert/pdf',
    auth=('api', 'your_api_key'),
    json={"source": "https://en.wikipedia.org/wiki/PDF", "landscape": False, "use_print": False}
)

response.raise_for_status()

with open('wikipedia.pdf', 'wb') as f:
    f.write(response.content)
`
  },
  {
    label: 'NodeJS',
    icon: 'images/icons/ico-node.svg',
    githubURL: 'https://gist.github.com/discover',
    content: 
`const fetch = require('node-fetch')

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
// https://gist.github.com/cnicodeme/28ade69b269ca0a4af0a7c29c479b747
`
  },
  {
    label: 'PHP',
    icon: 'images/icons/ico-php.svg',
    githubURL: 'https://gist.github.com/discover',
    content: 
`<?php
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
// https://gist.github.com/cnicodeme/f2c73d89ac49313d023d738b5cdb7046`
  },
  {
    label: 'Ruby',
    icon: 'images/icons/ico-ruby.svg',
    githubURL: 'https://gist.github.com/discover',
    content:
`require 'uri'
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
end`
  },
  {
    label: 'C#',
    icon: 'images/icons/ico-csharp.svg',
    githubURL: 'https://gist.github.com/discover',
    content: 
`using System;
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
}`
  },
  {
    label: 'bash',
    icon: 'images/icons/ico-curl.svg',
    githubURL: 'https://gist.github.com/discover',
    content:
`curl 
    -u 'api:your_api_key' 
    -H 'Content-Type: application/json' 
    -d '{"source":"https://en.wikipedia.org/wiki/PDF","landscape": false, "use_print": false}' 
    "https://api.pdfshift.io/v3/convert/pdf" 
    -o wikipedia.pdf

# That's all!`
  }
]);

const currentTab = ref(tabs.value[0]);
const buttonText = ref('Copy to Clipboard');

const changeTab = (tab) => {
  currentTab.value = tab;
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(currentTab.value.content).then(() => {
    buttonText.value = 'Copied!';
    setTimeout(() => {
      buttonText.value = 'Copy to Clipboard';
    }, 4000);
  });
};
</script>

<style lang="scss" scoped>
.api {
  max-width: var(--width-main);
  margin: 0 auto 3.9375rem;
  overflow: hidden;
  border-radius: 1rem;
  background: rgba(4,1,21,0.6);
  padding: 0.6525rem;
  border: 1px solid rgba(255,255,255,0.1);
  animation: fade-slide 1s ease-out 2s forwards;

  &__holder {
    border-radius: 0.75rem;
    border: 1px solid #221C43;
    box-shadow: 0 0 0 1rem rgba(255,255,255,0.05);
  }

  &__nav {
    display: flex;
    align-items: center;
    padding: 0.875rem 1.4375rem;
    border-bottom: 1px solid #342C6C;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: var(--bg-btn-primary);
    border: 1px solid var(--stroke-btn-primary);
    border-radius: 0.5rem;
    margin-left: 1.5rem;
    cursor: pointer;
    transition: 0.3s;

    &:first-child {
      margin-left: 0;
    }

    &:hover {
      box-shadow: 
        0 28px 8px rgba(127,115,211,0),
        0 18px 7px rgba(127,115,211,0.03),
        0 10px 6px rgba(127,115,211,0.11),
        0 4px 4px rgba(127,115,211,0.19),
        0 1px 2px rgba(127,115,211,0.22),
        0 0 0 rgba(127,115,211,0.22);
    }

    &--active {
      border-color: #7062C0;
      box-shadow: 
        0 28px 8px rgba(127,115,211,0),
        0 18px 7px rgba(127,115,211,0.03),
        0 10px 6px rgba(127,115,211,0.11),
        0 4px 4px rgba(127,115,211,0.19),
        0 1px 2px rgba(127,115,211,0.22),
        0 0 0 rgba(127,115,211,0.22);
    }
  }

  &__content {
    padding: 0;
    overflow: auto;
    height: 24rem;

    //custom scroll
    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background: var(--scroll-bg);
    }

    &::-webkit-scrollbar-thumb {
      background: var(--scroll-thumb);
      border-radius: 0.5rem;
    }

    pre {
      margin: 0;
      padding: 0 1.5rem !important;

      code {
        padding: 0 0 1rem;
      }
    }
  }

  &__footer {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    padding: 0.875rem 1.4375rem;
    border-top: 1px solid #221C43;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    border: none;
    background: none;
    padding: 0;
    margin: 0 1.5rem 0 0;
    color: var(--color-secondary);
    cursor: pointer;

    & > * {
      margin-right: 0.4rem;
    }

    &:hover {
      color: var(--color-primary);

      svg path{
        fill: var(--color-primary);
      }
    }

    &:last-child {
      margin: 0 0 0 auto;

      * {
        margin: 0 0 0 0.5rem;
      }
    }
  }
}
</style>