const express = require('express');
const router = express.Router();

/* ------- Get ------- */
// questions
router.get('/qa/:product_id', function (req, res) {
  res.send(req.params.question_id);
})

// answers
router.get('/qa/:question_id/answers', function (req, res) {
  res.send(req.params.question_id);
})

/* ------- Post ------- */
// question
router.post('/qa/:product_id', function (req, res) {
  res.send(req.params.question_id);
})

// answer
router.post('/qa/:question_id/answers', function (req, res) {
  res.send(req.params.question_id);
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
  res.send(req.params.question_id);
})

//Report Answer
router.put('PUT /qa/answer/:answer_id/report', function (req, res) {
  res.send(req.params.question_id);
})

module.exports = router;