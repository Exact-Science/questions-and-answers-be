const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/repos', (request, response) => {
  db.save(request.body);
})

app.get('/repos', (request, response) => {
  db.getAllRepos()
    .then((results) => {
      response.send(JSON.stringify(results))
    })
})


app.listen(port, () => {console.log(`The server is up and running on port: ${port}`)});