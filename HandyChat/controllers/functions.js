

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/EmployeeDB';



var connection = require('./../config');

var SocketIoManager = require('/Users/hsm3/Node Projects/HandyChat/controllers/SocketIoManager');


  var allCallBacks = require('/Users/hsm3/Node Projects/HandyChat/controllers/call_backs');

module.exports.getAllUsers = function(req,res){

    connection.query('SELECT * FROM user_profile', function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
         
            res.json({
                        status:true,
                        message:results

            })
          }
        })

        
}
 
// Create Group
 
module.exports.createGroup = function(req,res){
    
  
    var post  = {name: req.body.name, admin_id: req.body.admin_id , photo : req.body.photo };
     
    var query = connection.query('INSERT INTO team_group SET ?', post, function(error, result) {
      if (error) {

        
        console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
                console.log(error);
        
                res.json({
                    status:false,
                    message:'there are some error with query'
                })
              }
      else{

        var post  = { user_id: req.body.admin_id , team_id: result.insertId  };
        

        connection.query('INSERT INTO team_users SET ?', post, function(error, result) {


          res.json({
            status:true,
            message:'group registered sucessfully'
           
        })
      });

    }})
    
   
  }


  

  module.exports.getTeams = function(req,res){
    

    var userId = req.body.user_id
 
    console.log(userId)

        connection.query('SELECT b.* FROM team_users a inner join team_group b on a.team_id = b.id WHERE user_id = '+userId  , function (error, results, fields) {
          if (error) {
              res.json({
                status:false,
                message:'there are some error with query'
                })
          }else{
             
                res.json({
                            status:true,
                            message:results
    
                })
              }
            } )
        
        
        }


        module.exports.getTeamUsers = function(req,res){
          
      
          var teamId = req.body.team_id
       
          console.log(teamId)
      
              connection.query('SELECT b.* FROM team_users a inner join user_profile b on a.user_id = b.user_id WHERE team_id = ' + teamId  , function (error, results, fields) {
                if (error) {
                    res.json({
                      status:false,
                      message:'there are some error with query'
                      })
                }else{
                   
                      res.json({
                                  status:true,
                                  message:results
          
                      })
                    }
                  } )
              
              
              }
      
          



  module.exports.addMembersToTeam = function(req,res){
          
          var groupId =  req.body.group_id
          var usersArray =  req.body.users  // Array Object
    
          console.log("Group Id " , groupId) 
          console.log("Result Is " , usersArray);
          
          var tempArray = []
          
                      for (var i = 0; i < usersArray.length; i++) {
              
                      
                        var post  = { user_id: usersArray[i] , team_id: groupId  };
                        
                
                        connection.query('INSERT INTO team_users SET ?', post, function(error, result) {
              
                          if(!error) {
                            tempArray.push("value")
                            // SocketIoManager.sendNotificationAddedToTeam(usersArray[i])
                          }
            
                        
                          
                          if( tempArray.length == usersArray.length) {
              
                            SocketIoManager.sendNotificationAddedToTeam(usersArray)
                            res.json({
                              status:true,
                              message:'Users added sucessfully'
                             
                          })

                          
                            
                          }
                      })
          
              }
   
    } 



    
     


 