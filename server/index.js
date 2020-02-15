const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
// const cors = require('cors');
const port = 3000;
// const routes = require('./routes.js');

const app = express();

// app.use(cors());
app.use(bodyParser.json());

app.get('/qa', function (req, res) {
  // console.log(req.params.question_id)
  console.log(req.body);
  res.send("hello world");
  // res.render('special')
})


// app.use('/', routes);

app.listen(port, () => {console.log(`The server is up and running on port: ${port}`)});



