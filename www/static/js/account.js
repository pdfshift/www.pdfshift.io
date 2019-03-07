(function () {
    var token = window.PDFShift.storage.get('token');
    if (token === null) {
        window.location.href = '/login/';
        return false;
    }

    window.PDFShift.requests.get('accounts/', {'Authorization': 'Bearer ' + token}).then(
        function (body) {
            if ('setAccount' in window.PDFShift) {
                window.PDFShift.setAccount(body);
            }
            if (window.Vitally) {
                Vitally.account({
                    'accountId': token,
                    'traits': {
                        'name': body.name
                    }
                });

                var traits = {
                    'name': body.name,
                    'email': body.email,
                    'createdAt': body.created,
                    'country': body.country
                };

                if (body.plan) {
                    traits['planId'] = body.plan.id;
                    traits['planName'] = body.plan.display;
                    traits['planYearly'] = body.plan.yearly;
                }
                
                Vitally.user({
                    'userId': token,
                    'accountId': token,
                    'traits': traits
                });
            }
        },
        function (response) {
            if (response.status === 0) {
                return alert('An error occured.');
            }

            window.PDFShift.storage.set('token', null);
            window.location.href = '/login/';
        }
    )
})()