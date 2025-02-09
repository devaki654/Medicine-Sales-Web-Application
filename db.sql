CREATE DATABASE medicine_orders;

USE medicine_orders;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    medicine VARCHAR(50),
    address TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
