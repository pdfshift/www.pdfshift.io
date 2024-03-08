export default function (path) {
    let hostname = null
    if (process.server) {
        const nuxtApp = useNuxtApp()
        hostname = new URL(`https://${nuxtApp.ssrContext.event.node.req.headers.host}`).hostname
    } else {
        hostname = window.location.hostname
    }

    if (!hostname) {
        hostname = 'localhost'
    }

    if (hostname === 'loscalhost' || hostname === '127.0.0.1') {
        return `http://127.0.0.1:5000/v3${path}`
    }

    return `https://api.pdfshift.io/v3${path}`
}
