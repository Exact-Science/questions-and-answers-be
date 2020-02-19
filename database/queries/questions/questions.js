const db = require('../../index.js');

const getProductQuestions = (product_id) => {
  const query = `select questions.id qid, questions.body, questions.date, questions.name, questions.email, questions.reported, questions.helpfulness, answers.id aid, answers.body, answers.date, answers.name, answers.email, answers.reported, answers.helpfulness, photos.id, photos.url from questions left join answers on questions.id = answers.question_id left join photos on answers.id = photos.answer_id where questions.product_id = '${product_id}' order by questions.helpfulness desc`;
  // const query = `select * from questions where product_id = '1';`;
  return db.pool.query(query)
  .then((results) => results.rows);
}

module.exports = {
  getProductQuestions,
}