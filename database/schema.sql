\c qna

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

\c postgres

DROP DATABASE IF EXISTS qna;

create database qna;

\c qna

create table questions (
  question_id SERIAL PRIMARY KEY,
  product_id VARCHAR,
  question_body VARCHAR (1000) NOT NULL,
  question_date TIMESTAMPTZ NOT NULL,
  question_name VARCHAR (60) NOT NULL,
  question_email VARCHAR (60) NOT NULL,
  question_reported SMALLINT,
  question_helpfulness SMALLINT);

create index question_pid_index on questions (product_id);
create index question_rprt_index on questions (question_reported);
create index question_hlp_index on questions (question_helpfulness);

create table answers (
  answer_id SERIAL PRIMARY KEY,
  answer_question_id INTEGER,
  answer_body VARCHAR (1000) NOT NULL,
  answer_date TIMESTAMPTZ NOT NULL,
  answer_name VARCHAR (60) NOT NULL,
  answer_email VARCHAR (60) NOT NULL,
  answer_reported SMALLINT,
  answer_helpfulness SMALLINT,
  FOREIGN KEY (answer_question_id) REFERENCES questions (question_id));

create index answer_q_id_index on answers (answer_question_id);
create index answer_rprt_index on answers (answer_reported);
create index answer_hlp_index on answers (answer_helpfulness);

create table photos (
  photo_id SERIAL PRIMARY KEY,
  photo_answer_id INTEGER NOT NULL,
  photo_url VARCHAR (1000) NOT NULL,
  FOREIGN KEY (photo_answer_id) REFERENCES answers (answer_id));

create index photo_answr_id_index on photos (photo_answer_id);

\timing

\COPY questions FROM 'database/data/questions.csv' DELIMITERS ',' CSV HEADER;

\COPY questions FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/additional_questions.csv' DELIMITERS ',' CSV HEADER;

\COPY answers FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/answers.csv' DELIMITERS ',' CSV HEADER;

\COPY photos FROM '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/answers_photos.csv' DELIMITERS ',' CSV HEADER;

-- reset sequence (autoincrementer value) for each primary key so all future records will auto-increment ID at correct value
SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'question_id'), (SELECT MAX(question_id) FROM questions));
SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'answer_id'), (SELECT MAX(answer_id) FROM answers));
SELECT pg_catalog.setval(pg_get_serial_sequence('photos', 'photo_id'), (SELECT MAX(photo_id) FROM photos));

