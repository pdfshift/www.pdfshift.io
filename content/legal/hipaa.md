---
title: 'HIPAA compliance'
description: "PDFShift is fully HIPAA compliant"
---

We are committed to maintaining the highest standards of privacy and security to protect your sensitive information. Our platform complies with the Health Insurance Portability and Accountability Act (HIPAA), ensuring that your healthcare data is handled with the utmost care and confidentiality.

## HIPAA Compliance Assurance:

 * **Data Security**: We employ robust security measures to safeguard your protected health information (PHI) against unauthorized access, disclosure, or alteration. Our systems are designed to meet HIPAA's stringent security requirements to ensure the integrity and confidentiality of your data.

 * **Privacy Protection**: We adhere to HIPAA's Privacy Rule, which governs the use and disclosure of PHI. Our policies and procedures are designed to protect the privacy of your healthcare information and ensure compliance with HIPAA regulations.

 * **Business Associate Agreement (BAA)**: As part of our commitment to HIPAA compliance, we offer a Business Associate Agreement (BAA) to our customers. The BAA outlines the responsibilities of both parties concerning the handling and protection of PHI. You can find a link to our BAA below:

<div class="mt-12 text-center"><a href="/documents/baa.pdf" title="Download our Business Associate Agreement" class="inline-flex border items-center justify-center px-10 py-3 rounded-lg gap-1 group transition-bg duration-300 bg-purple border-purple text-white hover:bg-navy-700 hover:text-white hover:border-navy-700 cursor-pointer" style="text-decoration: none">Link to Business Associate Agreement (BAA)</a></div>

## Your Responsibilities:

While we take every precaution to secure your data, HIPAA compliance is a shared responsibility. We urge you to familiarize yourself with your obligations under HIPAA and ensure that you adhere to all applicable laws and regulations when using our services.

Mainly, in order to be fully HIPAA compliant, **you must add** the `hipaa` parameter to your request. This will ensure that your data is handled in accordance with HIPAA regulations.

By adding the `hipaa` parameter, you ensure that we won't store the generated document in any way.

## Why the "hipaa" parameter is important:

**By default, PDFShift does not store any generated document**, but you can request PDFShift to store your generated document by adding the following parameters:

 * `filename`: By setting this parameter, the document will be stored on our S3 storage and will be available for 2 days.
 * `webhook`: When using a webhook, we send you a POST request with an URL to our same S3 storage.

In these case, PDFShift will store the generated document in our S3 storage for a 2 days.

This behavior is not compliant with HIPAA.

By setting the `hipaa` parameter to `true`, we will ensure that any document generated are **NOT** stored on our servers.

`filename` and `webhook` parameter can still be made under the `hippa: true` parameter if you also provide a `s3_destination`. In that case, the document will be stored on **your S3 storage** and not on ours, making full compliance of our HIPAA policy.

## Contact Us:

If you have any questions or concerns about our HIPAA compliance or the security of your data, please don't hesitate to contact us. Your privacy and security are our top priorities, and we are here to assist you in any way we can.