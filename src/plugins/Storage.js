// @source https://gist.github.com/Fluidbyte/4718380

let install = function (Vue, options) {
    function storageAvailable (type) {
        try {
            let storage = window[type]
            let x = '__storage_test__'
            storage.setItem(x, x)
            storage.removeItem(x)
            return true
        } catch (e) {
            return false
        }
    }

    /**
     * Creates new cookie or removes cookie with negative expiration
     * @param  key       The key or identifier for the store
     * @param  value     Contents of the store
     * @param  exp       Expiration - creation defaults to 30 days
     */
    function createCookie (key, value, exp) {
        let date = new Date()
        date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000))
        let expires = '; expires=' + date.toGMTString()
        document.cookie = key + '=' + value + expires + '; path=/'
    }

    /**
     * Returns contents of cookie
     * @param  key       The key or identifier for the store
     */
    function readCookie (key) {
        let nameEQ = key + '='
        let ca = document.cookie.split(';')
        for (let i = 0, max = ca.length; i < max; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    let lsSupport = false
    if (storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
        lsSupport = true
    }

    let storage = {
        'getItem' (key, def) {
            if (def === undefined) {
                def = null
            }

            let data = null
            if (lsSupport) {
                data = window.localStorage.getItem(key) || def
            } else {
                data = readCookie(key) || def
            }

            try {
                return JSON.parse(data)
            } catch (e) {}

            return data
        },
        'setItem' (key, value) {
            if (typeof value === 'object') {
                value = JSON.stringify(value)
            }

            if (lsSupport) {
                window.localStorage.setItem(key, value)
            } else {
                createCookie(key, value, 30)
            }
        },
        'removeItem' (key) {
            if (lsSupport) {
                window.localStorage.removeItem(key)
            } else {
                createCookie(key, '', -1)
            }
        }
    }

    Vue.storage = storage
    Vue.prototype.$storage = storage
}

export default install
