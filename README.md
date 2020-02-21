# Questions and Answers BackEnd
This application extends the front end application of this retail portal - https://github.com/Exact-Science/es_apparel_fe. Specifically, it enables the user to interact with the retail portal questions and answers components.

It includes:
- Express Server
- PostgreSQL

To start the local server and the db:
1) Run the script to generate additional question data for the db - 'node mockData.js'
  - This will create a new file in the database/data directory called 'additional_questions.csv'
2) Run the script to create the db and load all questions and answers data into thier respective tables - 'npm run build-db'
3) Start the server 'nodemon start'
