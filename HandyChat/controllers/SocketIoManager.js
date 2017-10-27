
var app = require('express')();
var http = require('http').Server(app);
//var io = require('socket.io')(http);
var mysql   = require('mysql');
var connection = require('./../config');

var io = require('socket.io')();
  
module.exports = {

  io:io,
  showWelcome:showWelcome,
  sendNotificationAddedToTeam:sendNotificationAddedToTeam
}
   

function showWelcome() {
   
  console.log("Welcome")
}
 
io.listen(3000);

io.on('connection', function(clientSocket){
    console.log('a user connected');
    console.log("client is ",clientSocket.id);
    

 
      var socketId = clientSocket.id

      if(io.sockets.connected[socketId]!=null) {
          io.sockets.connected[socketId].emit('welcomeMessage', socketId.toString());

      }

      clientSocket.on("recevedUserId", function(clientId , socketId){
        console.log("User " + clientId + " is writing a message..." + socketId);
    
    });

      
    clientSocket.on("getPendingChats", function(userId){

      connection.query('SELECT * FROM pending_chats_group WHERE receivers_id  = ' + userId  , function (error, results, fields) {
 
        
        var map = {}
        map["chats"] =   results
        console.log(map)
 
        io.emit("whenReceivedAllPendingChats", map)
        
        connection.query('DELETE FROM pending_chats_group WHERE receivers_id  = ' + userId )
          
        

        // var messageArray = []

        // for (var i=0; i<results.length; i++) {

        //   var map = {};
            
        //   map["message_from"] =  results[i].message_from;
        //   map["group_id"] =  results[i].group_id;
        //   map["receivers_id"] =  results[i].receivers_id;
        //   map["message"] =  results[i].message;
        //   map["message_type"] =  results[i].message_type;
        //   map["send_date"] =  results[i].send_date;

        //   messageArray.push(map)
        // }


        // if(messageArray.length == results.length) {

        //   console.log(messageArray)

        //   var data = {"chats" : messageArray}

        //   io.emit("whenReceivedAllPendingChats", JSON.stringify(data))

        // }
        
  
       
        
      })
    })
  
    




      

    // // when socket disconnects, remove it from the list:
    // clientSocket.on("disconnect", () => {
    //     sequenceNumberByClient.delete(clientSocket);
    //     console.info(`Client gone [id=${socket.id}]`);
    // });
  
    

    clientSocket.on("demotest", function(clientNickname){
            console.log("User " + clientNickname + " is writing a message...");
        
    });


    clientSocket.on("whenReceiveChatMessage", function(message,  group_id  ,message_type  ,message_from){
      console.log("New Chat Received ")
      
      connection.query('SELECT user_id FROM team_users WHERE team_id  = ' + group_id  , function (error, results, fields) {
        
        console.log(results)
              var tempArray = [] 
         
              for (var i=0; i<results.length; i++) {
        
                console.log("HY P" , results[i].user_id)
        
                var recId = results[i].user_id
                var post  = { message: message, group_id: group_id , message_type : message_type  , message_from: message_from , receivers_id : recId};
                 
                console.log("Post Is" , post)
   
               var query = connection.query('INSERT INTO pending_chats_group SET ?', post, function(error, result) {
                 if (!error) {
           
                  console.log("Post 2 Is" , post)
                  tempArray.push("v")
                        
                  if(tempArray.length == results.length) {
      
                    var map = {}
                    map["users"] =   results
                    console.log(map)
                    io.emit("globalReceiveChats", map) 
                    console.log("SENT")
                  }

                 }
                 else {
                   console.log(error)
                 }
                 
                })


 
                       
               }
        
            }) 

  });

  
 
         
  })

 

  function sendNotificationAddedToTeam(userIds) {

 
        io.emit("updateTeamList", userIds.toString());
      
    
  }


  
//   io.on('connection', function(clientSocket){
  
//     console.log('a user connected');
  

//           clientSocket.on("showPiyush", function(clientNickname){
//           console.log("User " + clientNickname + " is writing a message...");
           
//         });


// })  


//   io.on('connection', function(clientSocket){


//   console.log('a user connected');

// //   clientSocket.on('disconnect', function(){
// //     console.log('user disconnected');

// //     var clientNickname;
// //     for (var i=0; i<userList.length; i++) {
// //       if (userList[i]["id"] == clientSocket.id) {
// //         userList[i]["isConnected"] = false;
// //         clientNickname = userList[i]["nickname"];
// //         break;
// //       }
// //     }

// //     delete typingUsers[clientNickname];
// //     io.emit("userList", userList);
// //     io.emit("userExitUpdate", clientNickname);
// //     io.emit("userTypingUpdate", typingUsers);
// //   });


// //   clientSocket.on("exitUser", function(clientNickname){
// //     for (var i=0; i<userList.length; i++) {
// //       if (userList[i]["id"] == clientSocket.id) {
// //         userList.splice(i, 1);
// //         break;
// //       }
// //     }
// //     io.emit("userExitUpdate", clientNickname);
// //   });


// //   clientSocket.on('chatMessage', function(clientNickname, message){
// //     var currentDateTime = new Date().toLocaleString();
// //     delete typingUsers[clientNickname];
// //     io.emit("userTypingUpdate", typingUsers);
// //     io.emit('newChatMessage', clientNickname, message, currentDateTime);
// //   });


// //   clientSocket.on("connectUser", function(clientNickname) {
// //       var message = "User " + clientNickname + " was connected.";
// //       console.log(message);

// //       var userInfo = {};
// //       var foundUser = false;
// //       for (var i=0; i<userList.length; i++) {
// //         if (userList[i]["nickname"] == clientNickname) {
// //           userList[i]["isConnected"] = true
// //           userList[i]["id"] = clientSocket.id;
// //           userInfo = userList[i];
// //           foundUser = true;
// //           break;
// //         }
// //       }

// //       if (!foundUser) {
// //         userInfo["id"] = clientSocket.id;
// //         userInfo["nickname"] = clientNickname;
// //         userInfo["isConnected"] = true
// //         userList.push(userInfo);
// //       }

// //       io.emit("userList", userList);
// //       io.emit("userConnectUpdate", userInfo)
// //   });


// //   clientSocket.on("startType", function(clientNickname){
// //     console.log("User " + clientNickname + " is writing a message...");
// //     typingUsers[clientNickname] = 1;
// //     io.emit("userTypingUpdate", typingUsers);
// //   });


// //   clientSocket.on("stopType", function(clientNickname){
// //     console.log("User " + clientNickname + " has stopped writing a message...");
// //     delete typingUsers[clientNickname];
// //     io.emit("userTypingUpdate", typingUsers);
// //   });

// });
























// // var app = require('express')();
// // var http = require('http').Server(app);
// // var io = require('socket.io')(http);
// // var mysql      = require('mysql');


// // var userList = [];
// // var typingUsers = {};

// // app.get('/', function(req, res){
// //   res.send('<h1>AppCoda - SocketChat Server</h1>');
// // });


// // http.listen(3000, function(){
// //   console.log('Listening on *:3000');
// // });


// // var connection = mysql.createConnection({
// //   host     : 'localhost',
// //   user     : 'root',
// //   password : '',
// //   databese : 'handy_chat_db'
// // });


// // connection.connect(function(err) {
// //    if (!err) {
// //     console.log("Database is connected ... ");

// //     console.log("INserting ....");
    
 


// //     var post  = {phone: '7737802125', country_code: 'Hello MySQL'};
// //     var query = connection.query('INSERT INTO User SET ?', post, function(err, result) {
// //       if (!error) {
// //               console.log("Value Updated ... nn");
// //           } else {
// //               console.log("Error Incert ... nn" , err);
// //           }
// //     });
    


// //   //   var sql = "INSERT INTO User (phone, country_code) VALUES ('7737802125', '91')";
// //   //   connection.query(sql, function (error, result) {
      
// //   //     if (!error) {
// //   //       console.log("Value Updated ... nn");
// //   //   } else {
// //   //       console.log("Error Incert ... nn" , error);
// //   //   }
  
// //   // })

  


// //   } else {
// //     console.log("Error connecting database ... nn", err);
// //   }
      
// // });

// // // 
// // // connection.query('SELECT now()', function(err, rows) {
// // //   if (err) throw err;
// // // 
// // //   console.log('The current time is: ', rows[0].solution);
// // // });

// // io.on('connection', function(clientSocket){
// //   console.log('a user connected');


   
   
// //   // Register User 





  
// //   // clientSocket.on('register_login', function(phone, country_code){

// //   //   var sql = "INSERT INTO User (phone, country_code) VALUES ('7737802125', '91')";
// //   //   con.query(sql, function (error, result) {
      
// //   //     if (!error) {
// //   //       console.log("Value Updated ... nn");
// //   //   } else {
// //   //       console.log("Error Incert ... nn" , error);
// //   //   }

// //   // });
 
  

  





// //   clientSocket.on('disconnect', function(){
// //     console.log('user disconnected');

// //     var clientNickname;
// //     for (var i=0; i<userList.length; i++) {
// //       if (userList[i]["id"] == clientSocket.id) {
// //         userList[i]["isConnected"] = false;
// //         clientNickname = userList[i]["nickname"];
// //         break;
// //       }
// //     }

// //     delete typingUsers[clientNickname];
// //     io.emit("userList", userList);
// //     io.emit("userExitUpdate", clientNickname);
// //     io.emit("userTypingUpdate", typingUsers);
// //   });


// //   clientSocket.on("exitUser", function(clientNickname){
// //     for (var i=0; i<userList.length; i++) {
// //       if (userList[i]["id"] == clientSocket.id) {
// //         userList.splice(i, 1);
// //         break;
// //       }
// //     }
// //     io.emit("userExitUpdate", clientNickname);
// //   });


// //   clientSocket.on('chatMessage', function(clientNickname, message){
// //     var currentDateTime = new Date().toLocaleString();
// //     delete typingUsers[clientNickname];
// //     io.emit("userTypingUpdate", typingUsers);
// //     io.emit('newChatMessage', clientNickname, message, currentDateTime);
// //   });


// //   clientSocket.on("connectUser", function(clientNickname) {
// //       var message = "User " + clientNickname + " was connected.";
// //       console.log(message);

// //       var userInfo = {};
// //       var foundUser = false;
// //       for (var i=0; i<userList.length; i++) {
// //         if (userList[i]["nickname"] == clientNickname) {
// //           userList[i]["isConnected"] = true
// //           userList[i]["id"] = clientSocket.id;
// //           userInfo = userList[i];
// //           foundUser = true;
// //           break;
// //         }
// //       }

// //       if (!foundUser) {
// //         userInfo["id"] = clientSocket.id;
// //         userInfo["nickname"] = clientNickname;
// //         userInfo["isConnected"] = true
// //         userList.push(userInfo);
// //       }

// //       io.emit("userList", userList);
// //       io.emit("userConnectUpdate", userInfo)
// //   });


// //   clientSocket.on("startType", function(clientNickname){
// //     console.log("User " + clientNickname + " is writing a message...");
// //     typingUsers[clientNickname] = 1;
// //     io.emit("userTypingUpdate", typingUsers);
// //   });


// //   clientSocket.on("stopType", function(clientNickname){
// //     console.log("User " + clientNickname + " has stopped writing a message...");
// //     delete typingUsers[clientNickname];
// //     io.emit("userTypingUpdate", typingUsers);
// //   });

// // });

// }