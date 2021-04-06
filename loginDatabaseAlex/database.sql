CREATE DATABASE jwttutorial;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
 );

INSERT INTO users ( user_email, user_password) VALUES ('abc@gmail.com', 'abc');