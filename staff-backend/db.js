// db.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Skanda@2003', // Empty string for no password
    database: 'staff_leave_management'
  });
  
  
module.exports = connection;
