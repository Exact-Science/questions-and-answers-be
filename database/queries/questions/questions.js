const db = require('../../index.js');

const getProductQuestions = (product_id) => {
  const query = `select * from questions left join answers on questions.id = answers.question_id where questions.product_id = '1'`;
  // const query = `select id from questions where product_id = '1';`;
  return db.pool.query(query)
  .then((results) => results.rows);

}

module.exports = {
  getProductQuestions,
}