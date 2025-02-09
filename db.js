const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'medicine_order'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
