export default function (to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    }

    const findEl = (hash, x) => {
        return document.querySelector(hash) ||
        new Promise((resolve, reject) => {
            if (x > 50) {
                return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
        })
    }

    if (to.hash) {
        let delay = 0
        if (to.name !== from.name) {
            delay = 100
        }
        setTimeout(async () => {
            const el = await findEl(to.hash)
            if ('scrollBehavior' in document.documentElement.style) {
                return window.scrollTo({ top: el.offsetTop - 87, behavior: 'smooth' })
            } else {
                return window.scrollTo(0, el.offsetTop - 87)
            }
        }, delay)
    }

    return { x: 0, y: 0 }
}
