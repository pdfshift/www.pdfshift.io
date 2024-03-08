export default function () {
    let storageSystem = 'localStorage'
    try {
        window.localStorage.setItem('test', 'test')
        window.localStorage.removeItem('test')
    } catch (e) {
        console.info('falling back to sessionStorage')
        storageSystem = 'sessionStorage'
    }

    return {
        set: (key, value) => {
            if (value === null) {
                return this.remove(key)
            }

            if (typeof(value) === 'object') value = JSON.stringify(value)

            window[storageSystem].setItem(key, value)
        },
        get: (key, fallback=null) => {
            let value = window[storageSystem].getItem(key)
            if (value == null) return fallback

            if (value[0] === '{' || value[0] === '[') return JSON.parse(value)
            return value
        },
        remove: (key) => {
            window[storageSystem].removeItem(key)
        }
    }
}
