
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'hrmerit.com',
  user     : 'hrmerit_chat',
  password : 'handysolver123+',
  database : 'hrmerit_handydash'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;
 