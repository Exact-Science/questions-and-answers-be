const express = require('express');
const router = express.Router();

/* ------- Get ------- */
// questions

// answers
console.log("testing");

router.get('qa/:question_id/answers', function (req, res) {
  // console.log(req.params.question_id)
  console.log(req.body);
  res.send(req.body);
  // res.render('special')
})


/* ------- Post ------- */
// question

// answer

/* ------- Put ------- */
//Helpful Question

//Report Question

//Helpful Answer

//Report Answer

module.exports = router;