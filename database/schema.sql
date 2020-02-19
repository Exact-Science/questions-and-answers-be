\c qna
DROP DATABASE IF EXISTS qna;

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;


create database qna;

create table questions (question_id SERIAL PRIMARY KEY, product_id VARCHAR, question_body VARCHAR (1000) NOT NULL, question_date TIMESTAMPTZ NOT NULL, question_name VARCHAR (60) NOT NULL, question_email VARCHAR (60) NOT NULL, question_reported SMALLINT, question_helpfulness SMALLINT);

create table answers (answerId SERIAL PRIMARY KEY, answer_question_id INTEGER, answer_body VARCHAR (1000) NOT NULL, answer_date TIMESTAMPTZ NOT NULL, answer_name VARCHAR (60) NOT NULL, answer_email VARCHAR (60) NOT NULL, answer_reported SMALLINT, answer_helpfulness SMALLINT, FOREIGN KEY (answer_question_id) REFERENCES questions (question_id));

create table photos (photo_id SERIAL PRIMARY KEY, photo_answer_id INTEGER NOT NULL, photo_url VARCHAR (1000) NOT NULL, FOREIGN KEY (photo_answer_id) REFERENCES answers (answer_id));

\timing

\COPY questions FROM 'database/data/questions.csv' DELIMITERS ',' CSV HEADER;

\COPY questions FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/additional_questions.csv' DELIMITERS ',' CSV HEADER;

\COPY answers FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/answers.csv' DELIMITERS ',' CSV HEADER;

\COPY photos FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/answers_photos.csv' DELIMITERS ',' CSV HEADER;

