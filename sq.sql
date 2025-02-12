CREATE DATABASE medicineOrders;
USE medicineOrders;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  medicine VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  address TEXT NOT NULL
);
