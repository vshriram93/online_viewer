var http=require('http');
var fs=require('fs');
var path=require('path');
var url=require('url');
var Client=require('mysql').Client;
var sqlClient=new Client();
var indexPage=fs.readFileSync('./includes/html/index.html');
var fbJs=fs.readFileSync('./includes/js/fb.js');
var favicon=fs.readFileSync('./images/favicon.ico');
var chatPage=fs.readFileSync('./includes/html/chat.html');
var mainJs=fs.readFileSync('./includes/js/main.js');
//var profile=fs.readFileSync('./includes/html/profile.html');
sqlClient.user="root";
sqlClient.password="root";
sqlClient.query("USE viewer",function(error,results){
    if(error){
        console.log("error in connecting to the database editor"+error.message);
        return;
    }
    console.log("Connected to database");
});
var server=http.createServer(function(request,response){
    console.log(request.url);
    if(request.url=='/includes/js/fb.js') {
	response.writeHead(200, {"Content-Type":"application/javascript"});
	response.write(fbJs);
	response.end();
    }
    if(request.url=='/includes/js/main.js') {
        response.writeHead(200, {"Content-Type":"application/javascript"});
        response.write(mainJs);
        response.end();
    }
    if(request.url=='/images/favicon.ico') {
	response.writeHead(200, {"Content-Type":"image/ico"});
	response.write(favicon);
	response.end();
    }
    if(request.url=='/chat') {
	console.log("hi");
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write(chatPage);
	response.end();
    }
    else {
	response.writeHead(200, {"Content-Type":"text/html"});
	response.write(indexPage);
	//console.log(request);
	response.end();
    }

});
server.listen(8080);
console.log("Node server is running");
var nowjs = require("now");
var everyone = nowjs.initialize(server);
// List of available rooms
everyone.now.fbId=function(id) {
    console.log(id);
                                                                       
sqlClient.query("SELECT * FROM `viewer_groups` WHERE `group_users`=?"[id],function(error,results){
    if(error){
        console.log("error in connecting to the database editor"+error.message);
        return;
    }
    console.log("Connected to database");
});
}
everyone.now.serverRoomsList = {'room1':'Room 1','room2':'Room 2','room3':'Room 3'};


// Send message to everyone on the users group                                                                                                      
everyone.now.distributeMessage = function(message){


    //console.log('Received message from '+this.now.name +' in serverroom '+this.now.serverRoom);                                                   
    var group = nowjs.getGroup(this.now.serverRoom);
    group.now.receiveMessage(this.now.name+'@'+this.now.serverRoom, message);
};
everyone.now.changeRoom = function(newRoom){
    var oldRoom = this.now.serverRoom;
    console.log('Changed user '+this.now.name + ' from '+oldRoom + ' to '+newRoom);
    //if old room is not null; then leave the old room                                                                                              
    if(oldRoom){
        var oldGroup = nowjs.getGroup(oldRoom);
        oldGroup.removeUser(this.user.clientId);
        // Tell everyone he left :)                                                                                                                 
        oldGroup.now.receiveMessage('SERVER@'+oldRoom, this.now.name + ' has left the room and gone to '+newRoom);
    }
                                                                                                                                               
var newGroup = nowjs.getGroup(newRoom);                                                                                                         
newGroup.addUser(this.user.clientId);                                                                                                           
// Tell everyone he joined                                                                                                                      
newGroup.now.receiveMessage('SERVER@'+newRoom, this.now.name + ' has joined the room');                                                         
this.now.serverRoom = newRoom;                                                                                                                  
};
everyone.now.sendSlideDetails=function(title,content,viewerName,adminName)
{
    creator=this.user.clientId;
    creatorGroup=nowjs.getGroup(creator);
    creatorGroup.addUser(creator);
    sqlClient.query("INSERT INTO viewer_slides SET slides_title=?, slides_content=?, slides_group=?, slides_admin=?",[title,content,viewerName,adminName],function(error,results){
	if(error)
	{
	    console.log("Error in insertion "+error.message);
	    return;
	}
	creatorGroup.now.sendSlideDetailsResponse(1);
    });
}