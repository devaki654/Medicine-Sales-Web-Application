const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware to parse form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost', // Your MySQL server host
  user: 'root',      // Your MySQL username
  password: '12345',      // Your MySQL password
  database: 'medicineOrders', // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Serve the login page first
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'log.html'));
});

// Serve the order page
app.get("/order", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'order.html'));
});

// Handle form submission for order
app.post("/submit-order", (req, res) => {
  const { name, email, phone, medicine, amount, address } = req.body;

  // Check if all fields are provided
  if (!name || !email || !phone || !medicine || !amount || !address) {
    return res.status(400).json({ success: false, message: "All fields are required!" });
  }

  // Insert the order into the MySQL database
  const query = "INSERT INTO orders (name, email, phone, medicine, amount, address) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, email, phone, medicine, amount, address];

  db.execute(query, values, (err, result) => {
    if (err) {
      console.error("Error inserting order into MySQL:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    console.log(`Order received: ${name}, ${email}, ${phone}, ${medicine}, $${amount}, ${address}`);
    res.json({ success: true, message: "Order submitted successfully!" });
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
