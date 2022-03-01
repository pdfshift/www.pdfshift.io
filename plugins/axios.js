// @see https://docs.netlify.com/configure-builds/environment-variables/

export default function ({ $axios }) {
    $axios.setBaseURL('https://api.pdfshift.io/v3/')
    /*
    if (process.env.NETLIFY && process.env.BRANCH === 'master') {
        $axios.setBaseURL('https://api.pdfshift.io/v3/')
    } else {
        $axios.setBaseURL('http://127.0.0.1:5000/v3/')
    }
    */
}
