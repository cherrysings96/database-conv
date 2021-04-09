CREATE DATABASE merchandise;

CREATE TABLE merchdata (
  id INTEGER PRIMARY KEY,
  merchname VARCHAR(255) NOT NULL
  );

INSERT INTO merchdata ( id,merchName) VALUES (1,'t-shirt');