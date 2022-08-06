const mysql      = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
  host     : process.env.DATABASE_HOST,
  user     : process.env.DATABASE_USER,
  password : process.env.DATABASE_PASS,
  database : process.env.DATABASE_NAME
});
 
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }   
  });


// function handleDisconnect() {
//   const reConnection = mysql.createConnection(connection);         
       
//   reConnection.connect(function(err) {                         
//     if(err) {                                                
//       console.log('error when connecting to db:', err);
//       setTimeout(handleDisconnect, 2000);                
//     }                                                    
//   });                                                    
                                                         
//   reConnection.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
//       handleDisconnect();                         
//     } else {                                      
//       throw err;                                  
//     }
//   });
// }

// handleDisconnect();
module.exports = connection;

  
  