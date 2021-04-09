CREATE DATABASE postgres;

CREATE TABLE userdata(
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
 );


INSERT INTO userdata (email, password) VALUES ('abc@gmail.com', 'abc');
INSERT INTO userdata ( id, fullname, email, password) VALUES (20, 'admin', 'a@mail.com', '123');

-- //sherene table 
CREATE TABLE userdata(
  id INTEGER PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
