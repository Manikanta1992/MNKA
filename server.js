const express = require('express')
var request = require('request');
const serveStatic = require('serve-static')
const path = require('path')
var  config = require(__dirname+'/config/index.js')
// create the express app
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
// create middleware to handle the serving the app


app.set('port',process.env.PORT||8001);

var count = 0;
var connectedusers = {};
var onlineusers = [];
var rte = io.of('/rte');
//Whenever someone connects this gets executed
rte.on('connection', function (socket) {
        count++;
        console.log("1 user connected.. total users count is:"+count);

//      when new user connects stores the identity in server

        socket.on('user',function(mobile_no,device_id){
          // connectedusers[socket.id] = data.userid;
          // onlineusers.push(data.userid);
          // sendOnlineUsers(onlineusers);
          rte.emit("onlineUsersCount",{count:count});
          // setTimeout(function(){rte.emit("onlineUsersCount",{count:count});},5000);
        });

        socket.on("clearSession", function(old_device_id){
          rte.emit(old_device_id,{message:"logout"});
        });

        socket.on("All 4 Numbers",function(data){
          rte.emit("All4Numbers",{claims:data});
        });
        socket.on("All 5 Alphabets",function(data){
          rte.emit("All5Alphabets",{claims:data});
        });
        socket.on("Super 6",function(data){
          rte.emit("Super6",{claims:data});
        });
        socket.on("Special 7",function(data){
          rte.emit("Special7",{claims:data});
        });
        socket.on("Musicola",function(data){
          rte.emit("Musicola",{claims:data});
        });
        socket.on("disableClaim",function(data){
          request.post({url:`${config.apiUrl}/api/v1/user_details`, form:{mobile_no:data.mobile}}, function(err,response,body){
            var userDetails = JSON.parse(response.body);
            rte.emit("disableClaim",{winning_categary:data.winning_categary,mobile:data.mobile,name:userDetails.user_details[0].name,city:userDetails.user_details[0].current_city});
          });
        });

        socket.on("endGame",function(data){
          rte.emit("endGame",{data:data});
        });

        socket.on('setWrapperText',function(data){
          rte.emit("getWrapperText",{wrappertext:data.wraptext});
        });

//      event that user disconnects from browser
        socket.on('disconnect', function () {
          count--;
          console.log('user ' + connectedusers[socket.id] + ' disconnected total users count is:'+count);
          const index = onlineusers.indexOf(connectedusers[socket.id]);
          onlineusers.splice(index, 1);
          // console.log(Object.keys(connectedusers).length);
          delete connectedusers[socket.id];
          // sendOnlineUsers(onlineusers);
          rte.emit("onlineUsersCount",{count:count});
        });

//      Event to broadcast user is typing some message
        // socket.on('typing', function(data){
        //   socket.broadcast.emit('typing', {userid:data.userid})
        // });

});



// var rte1 = io.of('/logout_trigger');
// rte1.on('connection', function (socket) {
 
//   socket.on("clearSession", function(old_device_id){
//     console.log('rte1 clearSession')
//     rte1.emit(old_device_id,{message:"logout"});
//   });
// });




app.use("/", serveStatic ( path.join (__dirname, '/dist') ) )
// Catch all routes and redirect to the index file
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})


server.listen(app.get('port'),function(){
  console.log('server started on port '+app.get('port'));
});
