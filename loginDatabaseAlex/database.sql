CREATE DATABASE jwttutorial;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL
 );

INSERT INTO userdata ( id, fullname, email, password) VALUES (20, 'admin', 'a@mail.com', '123');

-- //sherene table 
CREATE TABLE userdata(
  id INTEGER PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);