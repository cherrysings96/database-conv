CREATE TABLE userdata(
  id INTEGER PRIMARY KEY,
  fullname VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO userdata(email, password) VALUES ('abc@gmail.com', 'abc');