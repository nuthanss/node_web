function download(prop) {
    $.ajax({
        url: `https://nuthanss.github.io/Pdf/${prop}.pdf`,
        method: 'GET',
        header: 'Access-Control-Allow-Origin, *',
        xhrFields: {
            responseType: 'blob'
        },
        success: function (data) {
            var a = document.createElement('a');
            var url = window.URL.createObjectURL(data);
            a.href = url;
            a.download = `${prop}.pdf`;
            document.body.append(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    });

}