// Create form
(function () {
    var form = document.getElementById('register'),
        submitButton = form.querySelector('.button');

    form.addEventListener('submit', function (event) {
        if (submitButton.classList.contains('button-disabled')) {
            return false;
        }

        submitButton.classList.add('button-disabled');
        window.PDFShift.forms.clearErrors(form);
        event.preventDefault();

        var params = Object.assign(
            {}, // Default type
            {
                'language': window.PDFShift.storage.get('language'),
                'quantity': window.PDFShift.storage.get('quantity')
            },
            window.PDFShift.storage.get('campaign', {}), // Campaign params
            window.PDFShift.forms.asJSON(form) // Form data
        );

        window.PDFShift.requests.post('accounts/', params).then(
            function (json) {
                submitButton.classList.remove('button-disabled');
                form.reset();
                document.location.href = '/register/thanks/'
            },
            function (response) {
                var errors = {'name': ['An error occured.']};
                if (response.data) {
                    if (response.data.hasOwnProperty('error')) {
                        var errors = {'name': [response.data.error]};
                    } else if (response.data.hasOwnProperty('errors')) {
                        errors = response.data['errors'];
                    } else {
                        errors = response.data;
                    }
                }

                window.PDFShift.forms.setErrors(form, errors);
                submitButton.classList.remove('button-disabled');
            }
        )
        return false;
    }, true);
})();