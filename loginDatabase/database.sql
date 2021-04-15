CREATE DATABASE authtodo;

--//Alex Table Todo
CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL
 );

INSERT INTO todo ( todo_id,description) VALUES (1,'Attend Evening Meeting');

--//UserSherene & LoginAlex common table
CREATE TABLE userdata(
  id SERIAL PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
 );

INSERT INTO userdata ( id, fullname, email, password) VALUES (20, 'admin', 'a@mail.com', '123');


 -- //Jasim table
CREATE TABLE merchdata (
  id INTEGER PRIMARY KEY,
  merchname VARCHAR(255) NOT NULL
  );

INSERT INTO merchdata ( id,merchName) VALUES (1,'t-shirt');
