// Create form
(function () {
    var form = document.querySelector('#create-form'),
        submitButton = form.querySelector('.button'),
        items = document.querySelectorAll('.create-account'),
        scrollToPos = form.offsetTop - header.querySelector('.heading').clientHeight - 40;
    
    scrollToPos = (scrollToPos < 0 ? 0 : scrollToPos);
    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function (event) {
            event.preventDefault();
            form.elements[0].focus({preventScroll: true});
            setTimeout(function () {
                window.scroll({
                    top: scrollToPos, 
                    left: 0
                });
            }, 50);
        }, false);
    }

    form.addEventListener('submit', function (event) {
        if (submitButton.classList.contains('button-disabled')) {
            return false;
        }

        submitButton.classList.add('button-disabled');
        window.PDFShift.forms.clearErrors(form);
        event.preventDefault();

        var params = window.PDFShift.forms.asJSON(form);
        params['language'] = params['language'] || window.PDFShift.storage.get('language');

        window.PDFShift.requests.post(window.PDFShift.api_url + 'accounts/', params).then(
            function (json) {
                if (typeof(window.gtag) === 'function') {
                    gtag('event', 'register', {'event_category': 'account', 'event_label': 'register'})
                }
                submitButton.classList.remove('button-disabled');
                form.reset();
                document.location.href = '/register/thanks/'
            },
            function (json, exception) {
                var errors = {'name': ['An error occured.']};
                if (json) {
                    if (json.hasOwnProperty('error')) {
                        var errors = {'name': [json.error]};
                    } else if (json.hasOwnProperty('errors')) {
                        errors = json['errors'];
                    }
                }

                window.PDFShift.forms.setErrors(form, errors);
                submitButton.classList.remove('button-disabled');
            }
        )
        return false;
    }, true);
})();