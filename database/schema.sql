\c qna;

DROP DATABASE IF EXISTS qna;

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;


create database qna;

create table questions (id SERIAL PRIMARY KEY, product_id VARCHAR, body VARCHAR (1000) NOT NULL, date TIMESTAMPTZ NOT NULL, name VARCHAR (60) NOT NULL, email VARCHAR (60) NOT NULL, reported SMALLINT, helpfulness SMALLINT);

create table answers (id SERIAL PRIMARY KEY, question_id INTEGER, body VARCHAR (1000) NOT NULL, date TIMESTAMPTZ NOT NULL, name VARCHAR (60) NOT NULL, email VARCHAR (60) NOT NULL, reported SMALLINT, helpfulness SMALLINT, FOREIGN KEY (question_id) REFERENCES questions (id));

create table photos (id SERIAL PRIMARY KEY, answer_id INTEGER NOT NULL, url VARCHAR (1000) NOT NULL, FOREIGN KEY (answer_id) REFERENCES answers (id));

\COPY questions FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/additional_questions.csv' DELIMITERS ',' CSV HEADER;

-- \COPY answers FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/answers.csv' DELIMITERS ',' CSV HEADER;

-- \COPY photos FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/answers_photos.csv' DELIMITERS ',' CSV HEADER;

\q