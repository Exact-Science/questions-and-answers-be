const express = require('express');
const router = express.Router();
const qQueries = require('../database/queries/questions/questions.js');
const aQueries = require('../database/queries/answers/answers.js');

/* ------- Get ------- */
// questions
router.get('/qa/:product_id', function (req, res) {
  qQueries.getProductQuestions(req.params.product_id, req.query.page, req.query.count)
  .then((results) => res.status(200).send(results))
})

// answers
router.get('/qa/:question_id/answers', function (req, res) {
  aQueries.getAnswers(req.params.question_id, req.query.page, req.query.count)
  .then((results) => res.status(200).send(results))
})

/* ------- Post ------- */
// question
router.post('/qa/:product_id', function (req, res) {
  qQueries.addQuestion(req.params.product_id, req.query, req.body)
  .then((results) => res.status(results).send(results));
})

// answer
router.post('/qa/:question_id/answers', function (req, res) {
  aQueries.addAnswer(req.params.question_id, req.query, req.body)
  .then((results) => res.status(results).send(results));
})


/* ------- Put ------- */
//Helpful Question
router.put('/qa/question/:question_id/helpful', function (req, res) {
  res.send(req.params.question_id);
})

//Report Question
router.put('/qa/question/:question_id/report', function (req, res) {
  res.send(req.params.question_id);
})

//Helpful Answer
router.put('/qa/answer/:answer_id/helpful', function (req, res) {
  res.send(req.params.answer_id);
})

//Report Answer
router.put('PUT /qa/answer/:answer_id/report', function (req, res) {
  res.send(req.params.answer_id);
})

module.exports = router;