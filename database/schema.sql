psql -U b-ghostvirus -d qna;
\c qna;

DROP DATABASE IF EXISTS qna;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS photos;

create database qna;

create table questions (id SERIAL PRIMARY KEY, product_id VARCHAR, body VARCHAR (1000) NOT NULL, date TIMESTAMPTZ NOT NULL, name VARCHAR (60) NOT NULL, email VARCHAR (60) NOT NULL, reported SMALLINT, helpfulness SMALLINT);

create table answers (id SERIAL PRIMARY KEY, question_id INTEGER, body VARCHAR (1000) NOT NULL, date TIMESTAMPTZ NOT NULL, name VARCHAR (60) NOT NULL, email VARCHAR (60) NOT NULL, reported SMALLINT, helpfulness SMALLINT, FOREIGN KEY (question_id) REFERENCES questions (id));

create table photos (id SERIAL PRIMARY KEY, answer_id INTEGER NOT NULL, url VARCHAR (1000) NOT NULL, FOREIGN KEY (answer_id) REFERENCES answers (id));

\COPY questions FROM '/Users/b-ghostvirus/Downloads/questions.csv' DELIMITERS ',' CSV HEADER;
