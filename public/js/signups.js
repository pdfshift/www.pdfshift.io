/* eslint-disable */
(function () {
    "use strict";
    let a = window.location,
        r = window.document,
        o = r.currentScript

    async function sha1(source) {
        const digest = await crypto.subtle.digest("SHA-1", new TextEncoder().encode(source));
        return Array.from(new Uint8Array(digest))
            .map(v => v.toString(16).padStart(2, '0'))
            .join('');
    }

    async function t(event, meta) {
        if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(a.hostname) || "file:" === a.protocol) return null;
        if (window._phantom || window.__nightmare || window.navigator.webdriver || window.Cypress) return null;

        var n = {}
        n.d = o.getAttribute("data-domain") || new URL(a.href).hostname
        n.e = event
        if (event === 'visit') {
            n.u = a.href, n.r = r.referrer || null
        } else if (meta) {
            for (var k in meta) {
                if (k === 'email') n['m.' + k] = await sha1(meta[k])
                else n['m.' + k] = meta[k]
            }
        }

        var qs = new URLSearchParams(n)
        new Image().src = 'https://ispapumuzwpgesmxhiii.functions.supabase.co/images/page.gif?' + qs.toString()
    }

    function l() {
        try {
            if (!window.sessionStorage.getItem('signups-visited')) {
                window.sessionStorage.setItem('signups-visited', '1')
                t('visit')
            }
        } catch (e) {}
    }

    function s(email) {
        return t('signup', { email: email })
    }

    var e = window.signups && window.signups.q || [];
    window.signups = s;
    for (var i = 0; i < e.length; i++) t.apply(this, e[i]);
    document.addEventListener("DOMContentLoaded", l);
})();
