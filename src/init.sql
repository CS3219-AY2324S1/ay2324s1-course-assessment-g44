-- init.sql

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    email_address VARCHAR(255) PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    id VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL
);

INSERT INTO Users (email_address, username, password, id, role)
VALUES ('admin123@gmail.com', 'admin', 'adminpassword', '1', 'admin');

ALTER TABLE users
ADD COLUMN completed_questions varchar[];

CREATE TABLE attempts (
id SERIAL PRIMARY KEY,
email_address VARCHAR(255),
question_id VARCHAR(255),
date_attempted TIMESTAMP,
code TEXT,
language_label VARCHAR(255),
language_id VARCHAR(255),
FOREIGN KEY (email_address)
 REFERENCES users (email_address)
 );