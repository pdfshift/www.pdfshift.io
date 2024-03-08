export default function (url) {
    return url.replaceAll(':', '').replaceAll('/', '').replaceAll(' ', '-').replaceAll('.', '').toLowerCase()
}
