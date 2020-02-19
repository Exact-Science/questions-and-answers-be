\c qna
DROP DATABASE IF EXISTS qna;

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;


create database qna;

create table questions (questionId SERIAL PRIMARY KEY, productId VARCHAR, questionBody VARCHAR (1000) NOT NULL, date TIMESTAMPTZ NOT NULL, name VARCHAR (60) NOT NULL, questionEmail VARCHAR (60) NOT NULL, questionReported SMALLINT, questionHelpfulness SMALLINT);

create table answers (answerId SERIAL PRIMARY KEY, answer_questionId INTEGER, answerBody VARCHAR (1000) NOT NULL, date TIMESTAMPTZ NOT NULL, name VARCHAR (60) NOT NULL, answerEmail VARCHAR (60) NOT NULL, answerReported SMALLINT, answerHelpfulness SMALLINT, FOREIGN KEY (answer_questionId) REFERENCES questions (questionId));

create table photos (photoId SERIAL PRIMARY KEY, photo_answerId INTEGER NOT NULL, url VARCHAR (1000) NOT NULL, FOREIGN KEY (photo_answerId) REFERENCES answers (answerId));

\timing

\COPY questions FROM 'database/data/questions.csv' DELIMITERS ',' CSV HEADER;

\COPY questions FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/additional_questions.csv' DELIMITERS ',' CSV HEADER;

\COPY answers FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/answers.csv' DELIMITERS ',' CSV HEADER;

\COPY photos FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/answers_photos.csv' DELIMITERS ',' CSV HEADER;

