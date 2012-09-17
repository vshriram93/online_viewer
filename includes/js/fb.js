function loginFB(FB) {

//    document.getElementById('auth-loginlink').addEventListener('click', function(){
	FB.login(function(response) {
	    if (response.authResponse) {
		console.log('Welcome!  Fetching your information.... ');
		FB.api('/me', function(response) {
		    console.log('Good to see you, ' + response.name + '.');
		});
	    } else {
		console.log('User cancelled login or did not fully authorize.');
	    }
	},{scope: 'publish_stream,create_event'});
	
	//    FB.login(function(){},{scope: 'publish_stream'});
  //      });
}
 function friendsDetail(accessToken,callback) {
    var friendDetail;
    FB.api('/me/friends', function(friends) {
	if(friends && !friends.error) {
	    console.log(friends);
	    callback(friends);
	}
    });
 }


function postOnWall(accessToken,message,name,link,description,picture) {

    var opts = {
        message : message,
        name : name,
	//                link : link,
        description : description,
	//                picture : picture
    };
    FB.api('/me/feed?access_token='+accessToken, 'post', opts, function(response) {
        if (!response || response.error) {
	    console.log(response);
	    alert('Posting error occured');
        }
        else {
	    alert('Success - Post ID: ' + response.id);
        }
    });
}


function sendRequestViaMultiFriendSelector(accessToken) {
    FB.ui({
	access_token: accessToken ,
	method: 'apprequests',
	message: "This message is displayed in invitation"
    },send_wall_invitation);
}

function send_wall_invitation(response) {
    if (response && !response.error) {
	alert(response.to);
	var send_invitation_url=base_url+'send_invitation';
	jQuery.ajax({
	    url:send_invitation_url,
	    data:{
		to:response.to
	    },
	    dataType:"json",
	    type: 'POST',
	    success: function(data){
		//            alert("");
	    }
	});
    };
}
function getEventInvitee(accessToken)
{
//    sendRequestViaMultiFriendSelector(accessToken)
    friendsDetail(accessToken,function (a){
	console.log(a);
    });

    return 542319517;
}

function getEvents(eventId,callback) {
    eventId="462418940458598";
    FB.api(
	{
            method: 'fql.query',
            query: 'select uid,rsvp_status,start_time from event_member where eid = '+eventId+' AND rsvp_status = "attending" '
	}, function(response) {
	    console.log(response)
            callback(response);
	});	

    
}
function MyFBId(callback) {
    var interval = 10; // ms
    window.setTimeout(function() {
        if (typeof FB!==undefined && FB.getAccessToken()!==null ) {
	    FB.api('/me', function(me){
		console.log(me);
		callback(me);
	    });
        } else {
            window.setTimeout(arguments.callee, interval);
        }
    }, interval);



    
	  
}
	  






function userNameFromId(FBId) {
    FB.api('/'+FBId, function(me){
	
    }, function(response) {
	return response.name;
    });
	  
	
}



//year-month-dateT17:00+0530
function createFBEvent(name,description,start_time,end_time,location) {
    var accessToken=FB.getAccessToken();
    var privacy_type='SECRET';
    if(start_time==''||end_time=='')
    {
	alert('invalid time');
	return;
    }
    getEventInvitee(accessToken);

    FB.api('/me/events?access_token='+accessToken, 'POST', {
	name: name,
	description: description,
	start_time: start_time,
	end_time: end_time,
	location: location,
	privacy_type: privacy_type
    }, function (event) {
	if(!event.error && event)
	{
	    return event.id;
	/*    FB.api('/'+event.id+'/invited?users='+getEventInvitee(accessToken),'post',function(resp) {
		console.log(event); 
	    });
	*/
	}
    });
    }	    
window.fbAsyncInit = function() {
    FB.init({
	appId      : '445672465471785', // App ID
	channelUrl : 'localhost', // Channel File
	status     : true, // check login status
	cookie     : true, // enable cookies to allow the server to access the session
	xfbml      : true  // parse XFBML

    });
    // Additional initialization code here
    console.log(FB);
    
/**
   FB auth done
**/
    FB.Event.subscribe('auth.statusChange', function(response) {
	if (response.authResponse) {
            // user has auth'd your app and is logged into Facebook
            FB.api('/me', function(me){
		if (me.name) {
                    document.getElementById('auth-displayname').innerHTML = me.name;
		}
            })
            document.getElementById('auth-loggedout').style.display = 'none';
            document.getElementById('auth-loggedin').style.display = 'block';
	} else {
            // user has not auth'd your app, or is not logged into Facebook
            document.getElementById('auth-loggedout').style.display = 'block';
            document.getElementById('auth-loggedin').style.display = 'none';
	}
    });
    loginFB(FB);
    FB.getLoginStatus(function (response) {
        if (response.authResponse) {
	    var accessToken=response.authResponse.accessToken;
	        friendsDetail(accessToken)
	    //    postOnWall(accessToken,'Post Message','testing','http://localhost:8080','description','picture');	
	    //	    createFBEvent(accessToken,'name','description','2012-09-16T20:40:00+0530','2012-09-16T21:40:00+0530','India','SECRET');
	    //sendRequestViaMultiFriendSelector();
	    /*
	      getEvents(0,function(data){
		console.log(data);
	    });
	    */
	}
        else {
	    console.log(response);
            // do something...maybe show a login prompt
        }
    });
};

// Load the SDK Asynchronously
(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);


}(document));

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=APP_ID";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));







var FBLogin=(function(){
    FB.login(function(response) {
	if (response.authResponse) {
	    console.log('Welcome!  Fetching your information.... ');
	    FB.api('/me', function(response) {
		console.log('Good to see you, ' + response.name + '.');
	    });
	} else {
	    console.log('User cancelled login or did not fully authorize.');
	}
    });
});

function fbLogout() {
    
}