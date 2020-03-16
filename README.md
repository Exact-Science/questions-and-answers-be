# Questions and Answers BackEnd
This application extends the front end application of this retail portal - https://github.com/Exact-Science/es_apparel_fe. Specifically, it enables the user to interact with the retail portal questions and answers components.

## Getting Started
Prerequisites: NodeJS

1. Navigate to the preferred local directory where your project will reside.
2. Clone the following repository:
```
$ git clone https://github.com/Exact-Science/questions-and-answers-be.git
```
3. Navigate inside the root directory of the project './questions-and-answers-be/' and run the following commands:
```
$ npm install // install dependencies
$ npm run build-db // build database files
$ npm start // start the expressJS server and 
```

1) Run the script to generate additional question data for the db - 'node mockData.js'
  - This will create a new file in the database/data directory called 'additional_questions.csv'
2) Run the script to create the db and load all questions and answers data into thier respective tables - 'npm run build-db'
3) Start the server 'nodemon start'


## Built With
- Express Server
- PostgreSQL