
var connection = require('./../config');


exports.callBackAddUser = callBackAddUsersInGroup
 

 var  callBackAddUsersInGroup = function(usersObject , groupId , res ) {
    
    
            var tempArray = []

            for (var i = 0; i < usersObject.length; i++) {
    
            
              var post  = { user_id: usersObject[i] , team_id: groupId  };
              
              
              connection.query('INSERT INTO team_users SET ?', post, function(error, result) {
    
                if(!error) {
                  tempArray.push("value")
                }
  
                if( tempArray.length == usersObject.length) {
    
                  res.json({
                    status:true,
                    message:'Users added sucessfully'
                   
                })
                  
                }
            })

    }
  }