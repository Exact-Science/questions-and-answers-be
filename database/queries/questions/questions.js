const db = require('../../index.js');

const getProductQuestions = (product_id) => {
  // const query = `select questions.questionId, questions.questionBody, questions.date, questions.questionName, questions.questionEmail, questions.questionReported, questions.questionHelpfulness, answers.answerId, answers.answerBody, answers.answerDate, answers.answerName, answers.answerEmail, answers.answerReported, answers.answerHelpfulness, photos.photoId, photos.photoUrl from questions left join answers on questions.id = answers.question_id left join photos on answers.id = photos.answer_id where questions.productId = '${product_id}' order by questions.questionHelpfulness desc`;
  // const query = `select questions.quesstion_id from questions left join answers on questions.id = answers.id left join photos on answers.id = photos.answer_id where questions.product_id = '${product_id}' order by questions.helpfulness desc`;
  const query = `select questions.question_id from questions where product_id = '${product_id}' limit 10`;
  return db.pool.query(query)
  .then((results) => results.rows);
}

module.exports = {
  getProductQuestions,
}