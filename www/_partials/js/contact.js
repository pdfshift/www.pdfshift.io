// Contact Sales
(function () {
    var form = document.querySelector('#contact form'),
        submitButton = form.querySelector('.button');
    
    form.addEventListener('submit', function (event) {
        if (submitButton.classList.contains('button-disabled')) {
            return false;
        }

        submitButton.classList.add('button-disabled');
        window.PDFShift.forms.clearErrors(form);
        event.preventDefault();

        window.PDFShift.requests.post('contact/', window.PDFShift.forms.asJSON(form)).then(
            function (json) {
                submitButton.classList.remove('button-disabled');
                form.reset();
                submitButton.style.display = 'none';
                submitButton.parentNode.querySelector('.success').style.display = 'block';
            },
            function (json, exception) {
                var errors = {'message': ['An error occured.']};
                if (json) {
                    if (json.hasOwnProperty('error')) {
                        var errors = {'message': [json.error]};
                    } else if (json.hasOwnProperty('errors')) {
                        errors = json['errors'];
                    }
                }

                window.PDFShift.forms.setErrors(form, errors);
                submitButton.classList.remove('button-disabled');
            }
        )
        return false;
    }, false);
})();