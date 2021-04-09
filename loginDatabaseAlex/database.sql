CREATE DATABASE postgres;

CREATE TABLE userdata(
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
 );

INSERT INTO userdata (email, password) VALUES ('abc@gmail.com', 'abc');