window.PDFShift.cookies ={
    /**
     * Returns contents of cookie
     * @param  key       The key or identifier for the store
     */
    'read': function (key) {
        var nameEQ = key + '=';
        var ca = document.cookie.split(';');
        for (var i = 0, max = ca.length; i < max; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    /**
     * Creates new cookie or removes cookie with negative expiration
     * @param  key       The key or identifier for the store
     * @param  value     Contents of the store
     * @param  exp       Expiration - creation defaults to 31 days
     */
    'create': function (key, value, exp) {
        var date = new Date();
        if (!exp) exp = 31;
        date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
        var expires = '; expires=' + date.toGMTString();
        document.cookie = key + '=' + value + expires + '; path=/';
    }
}

window.PDFShift.storage = (function () {
    return {
        'get': function (key, def) {
            if (def === undefined) {
                def = null;
            }

            var data = null;
            try {
                data = window.localStorage.getItem(key);
            } catch (e) {
                try {
                    data = window.sessionStorage.getItem(key);
                } catch (e) {
                    data = window.PDFShift.cookies.read(key);
                }
            }

            data = (data !== null) ? data : def;
            try {
                return JSON.parse(data);
            } catch (e) {}

            return data;
        },
        'set': function (key, value) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }

            try {
                window.localStorage.setItem(key, value);
            } catch (e) {
                try {
                    window.sessionStorage.setItem(key, value);
                } catch (e) {
                    window.PDFShift.cookies.create(key, value, 30);
                }
            }
        },
        'remove': function (key) {
            try {
                window.localStorage.removeItem(key);
            } catch (e) {
                try {
                    window.sessionStorage.removeItem(key);
                } catch (e) {
                    window.PDFShift.cookies.create(key, '', -1);
                }
            }
        }
    }
})();

window.PDFShift.load = function (urls, callback) {
    if (typeof urls === 'string') {
        urls = [urls]
    }

    var remainings = urls.length;
    for (var i = 0; i < remainings; i++) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        if (script.readyState) {  // only required for IE <9
            script.onreadystatechange = function() {
                if (script.readyState === "loaded" || script.readyState === "compvare") {
                    script.onreadystatechange = null;
                    remainings--;
                    if (remainings === 0) {
                        callback();
                    }
                }
            };
        } else {  //Others
            script.onload = function () {
                remainings--;
                if (remainings === 0) {
                    callback();
                }
            }
        }

        script.src = urls[i];
        document.getElementsByTagName("head")[0].appendChild(script);
    }
};

window.PDFShift.on = function (selector, event) {
    var callback = null,
        child = null,
        elements = document.querySelectorAll(selector);

    if (arguments.length === 3) {
        callback = arguments[2];
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener(event, callback);
        }
    } else {
        child = arguments[2];
        callback = arguments[3];

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener.apply(elements[i], [event, function(ev) {
                var possibleTargets = this.querySelectorAll(child);

                for (var y = 0; y < possibleTargets.length; y++) {
                    var el = ev.target;

                    while (el && el !== this) {
                        if (el === possibleTargets[y]) {
                            return callback.call(possibleTargets[y], ev);
                        }

                        el = el.parentNode;
                    }
                }
            }]);
        }
    }
}

window.PDFShift.requests = {
    'get': function (url, headers) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', window.PDFShift.api_url + url, true);

            if (headers) {
                for (var k in headers) {
                    if (!headers.hasOwnProperty(k)) continue;
                    xhr.setRequestHeader(k, headers[k]);
                }
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    try {
                        var json = JSON.parse(xhr.responseText);
                        if (xhr.status === 200) {
                            resolve(json, xhr.status);
                        } else {
                            reject({
                                'data': json,
                                'status': xhr.status
                            });
                        }
                    } catch (e) {
                        reject({
                            'data': null,
                            'status': xhr.status
                        });
                    }
                }
            };

            xhr.send();
        })
    },
    'post': function (url, data, headers) {
        return window.PDFShift.requests.request('POST', url, data, headers);
    },
    'put': function (url, data, headers) {
        return window.PDFShift.requests.request('PUT', url, data, headers);
    },
    'request': function (method, url, data, headers) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method.toUpperCase(), window.PDFShift.api_url + url, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            if (headers) {
                for (var k in headers) {
                    if (!headers.hasOwnProperty(k)) continue;
                    xhr.setRequestHeader(k, headers[k]);
                }
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    try {
                        var json = JSON.parse(xhr.responseText);
                        if (xhr.status === 200) {
                            resolve(json, xhr.status);
                        } else {
                            reject({
                                'data': json,
                                'status': xhr.status
                            });
                        }
                    } catch (e) {
                        reject({
                            'data': null,
                            'status': xhr.status
                        });
                    }
                }
            };

            xhr.send(JSON.stringify(data));
        })
    }
};

window.PDFShift.forms = {
    'asJSON': function (form) {
        var params = {};

        for (var i = 0; i < form.elements.length; i++) {
            if (['radio', 'checkbox'].indexOf(form.elements[i].type.toLowerCase()) > -1) {
                if (form.elements[i].checked) {
                    params[form.elements[i].name] = form.elements[i].value
                }
            }
            else {
                if (form.elements[i].type.toLowerCase() === 'submit' || form.elements[i].nodeName.toLowerCase() === 'button') {
                    continue;
                }

                if (form.elements[i].value) {
                    params[form.elements[i].name] = form.elements[i].value
                }
            }
        }

        return params;
    },
    'clearErrors': function (form) {
        for (var i = 0; i < form.elements.length; i++) {
            var parent = form.elements[i].parentNode;
            if (parent.classList.contains('error')) {
                parent.classList.remove('error')
                var node = parent.querySelector('p.error');
                if (node !== null) {
                    node.remove();
                }
            }
        }
    },
    'setErrors': function (form, errors) {
        var firstElement = null;
        for (var i = 0; i < form.elements.length; i++) {
            if (form.elements[i].name in errors) {
                if (firstElement === null) {
                    firstElement = form.elements[i];
                }
                var parent = form.elements[i].parentNode;
                parent.classList.add('error');
                var p = document.createElement('p');
                p.classList.add('error');
                p.innerText = errors[form.elements[i].name][0];
                parent.appendChild(p);
            }
        }

        window.scrollTo(0, firstElement.parentNode.offsetTop - 250);
    }
};

// Misc
(function () {
    var header = document.getElementById('header');
    function stickyMenu (position) {
        if (header.classList.contains('fixed-heading') && position < 30) {
            header.classList.remove('fixed-heading')
        } else if (!header.classList.contains('fixed-heading') && position >= 30) {
            header.classList.add('fixed-heading')
        }
    }

    var fixedMenuHeight = header.querySelector('.heading').clientHeight;

    function scrollTo(hash, push) {
        var target = document.querySelector(hash);
        if (target === null) {
            return false;
        }

        if (push) {
            if (hash === window.location.hash) {
                return false;
            }
            window.history.pushState({'hash': hash}, null, hash);
        }

        window.scroll({
            top: target.offsetTop - fixedMenuHeight, 
            left: 0
        });

        return false;
    }

    // Click on logo
    header.querySelector('.brand').addEventListener('click', function (event) {
        if (window.location.pathname === '/') {
            event.preventDefault();
            window.location.hash = '';
            window.scroll(0, 0);
        }
    })

    // TODO Add event listener on all the a
    PDFShift.on('a', 'click', function (event) {
        if (event.target.nodeName.toLowerCase() !== 'a') {
            return true;
        }

        var targetHref = event.target.getAttribute('href');
        if (!targetHref) {
            return true;
        }

        if (targetHref.indexOf('#') === -1) {
            return true;
        }

        var parts = targetHref.split('#');
        if (parts[0] !== window.location.pathname) {
            return true;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        return scrollTo('#' + parts[1], true);
    });

    if (window.location.hash && window.location.hash.substr(0, 1) === '#' && window.location.hash.length > 1) {
        window.addEventListener('scroll', function (scroll) {
            // This is to avoid a call to THIS scroll event caused by the previous scrollTo(0, 0)
            setTimeout(function () {
                scrollTo(window.location.hash, false);
                window.addEventListener('scroll', function (scroll) {
                    stickyMenu(window.scrollY)
                }, false);
            }, 1);
        }, {once: true});
    } else {
        window.addEventListener('scroll', function (scroll) {
            stickyMenu(window.scrollY)
        }, false);
    }

    stickyMenu(window.document.documentElement.scrollTop);

    // Accordion menu
    document.querySelector('#header .heading .accordion-menu').addEventListener('click', function () {
        document.getElementById("header-main-menu").classList.toggle('visible');
        document.getElementById("header-main-cta").classList.toggle('visible');
    });
})();

(function () {
    var form = document.getElementById('subscribe-newsletter');
    if (form) {
        var submitButton = form.querySelector('.button');

        // Subscribe to our newsletter:
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            
            if (submitButton.classList.contains('button-disabled')) {
                return false;
            }
    
            submitButton.classList.add('button-disabled');
            window.PDFShift.forms.clearErrors(form);
    
            window.PDFShift.requests.post('website/subscribe', window.PDFShift.forms.asJSON(form)).then(
                function (json) {
                    submitButton.classList.remove('button-disabled');
                    form.reset();
                    document.location.href = '/subscription/thank-you/'
                },
                function (response) {
                    var errors = {'email': ['An error occured.']};
                    if (response.data) {
                        if (response.data.hasOwnProperty('error')) {
                            var errors = {'email': [response.data.error]};
                        } else if (response.data.hasOwnProperty('errors')) {
                            errors = response.data['errors'];
                        }
                    }
    
                    window.PDFShift.forms.setErrors(form, errors);
                    submitButton.classList.remove('button-disabled');
                }
            )
            return false;
        }, true);
    }
})();

window.PDFShift.getQueryVariable = function (variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1])
        }
    }
    return null
}

window.PDFShift.onReady(function () {
    function isEmpty(str) {
        if (str === undefined) {
            return true;
        }

        if (str === null) {
            return true;
        }

        if (typeof(str) === 'string' && str === '') {
            return true;
        }

        if (typeof(str) === 'object') {
            try {
                if (JSON.stringify(str) === '{}') {
                    return true
                }
            } catch (e) {}
        }

        return false;
    }

    var campaign = window.PDFShift.storage.get('campaign');
    if (campaign !== null) {
        if (isEmpty(campaign)) {
            campaign = null;
        }
    }

    if (campaign !== null) {
        return;
    }

    campaign = {};
    if (document.referrer !== '') {
        campaign['referrer'] = document.referrer;
    }

    var ref = window.PDFShift.getQueryVariable('ref');
    if (!isEmpty(ref)) {
        campaign['source'] = ref;
    }

    var utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'gclid'];
    for (var i = 0; i < utms.length; i++) {
        var val = window.PDFShift.getQueryVariable(utms[i]);
        if (!isEmpty(val)) {
            if (!('utm' in campaign)) {
                campaign['utm'] = {};
            }
            campaign['utm'][utms[i].replace('utm_', '')] = val;
        }
    }

    if ('utm' in campaign) {
        if (!('source' in campaign) && 'source' in campaign['utm']) {
            campaign['source'] = campaign['utm']['source'];
        }
        campaign['utm'] = JSON.stringify(campaign['utm'])
    }

    campaign = JSON.stringify(campaign)
    if (campaign === '{}') {
        return
    }

    window.PDFShift.storage.set('campaign', campaign);

    // Via
    var viaValue = window.PDFShift.getQueryVariable('via');
    if (isEmpty(viaValue)) {
        viaValue = 'pdfshift';
    }

    try {
        if (isEmpty(window.PDFShift.cookies.read('_via'))) {
            window.PDFShift.cookies.create('_via', viaValue, 60);
        }
    } catch (e) {}
    
})

window.PDFShift.onReady = function (fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

if (window.PDFShift._ready.length > 0) {
    for (var i = 0; i < window.PDFShift._ready.length; i++) {
        window.PDFShift.onReady(window.PDFShift._ready[i]);
    }

    window.PDFShift._ready = null;
}