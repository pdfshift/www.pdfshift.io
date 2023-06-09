// @see https://docs.netlify.com/configure-builds/environment-variables/

export default function ({ $axios }) {
    $axios.setBaseURL('https://api.pdfshift.io/v3/')
}
