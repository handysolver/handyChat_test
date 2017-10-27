var connection = require('./../config');

module.exports.login=function(req,res){
    var email =req.body.email;

   
    connection.query('SELECT * FROM user WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){


          let userId =  results[0].id
        
          connection.query('SELECT * FROM user_profile WHERE user_id = ?',[userId], function (error, results, fields) {
            if (error) {
                res.json({
                  status:false,
                  message:'there are some error with query',
                  data : {}
                  })
            }else{

           res.json({
                status:true,
                message:'successfully authenticated' ,
                data : results[0]
               
            })

          }})
    
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits" , 
            data : {}
          });
        }
      }
    });
}