(function () {
    var token = window.PDFShift.storage.get('token');
    if (token === null) {
        window.location.href = '/login/';
        return false;
    }

    window.PDFShift.requests.get(window.PDFShift.api_url + 'accounts/', {'Authorization': 'Bearer ' + token}).then(
        function (body) {
            if ('setAccount' in window.PDFShift) {
                window.PDFShift.setAccount(body);
            }
        },
        function () {
            window.PDFShift.storage.set('token', null);
            window.location.href = '/login/';
        }
    )
})()