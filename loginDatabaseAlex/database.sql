CREATE DATABASE jwttutorial;

CREATE TABLE userdata(
  id INTEGER PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
 );

INSERT INTO userdata ( id,fullname, email, password) VALUES (1,'admin','abc@gmail.com', 'abc');