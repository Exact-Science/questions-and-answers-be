const db = require('../../index.js');

const getProductQuestions = (product_id) => {
  const query = `select * from questions where product_id = '${product_id}'`;
  db.pool.query(query, (err, res) => {
    console.log('the result', res.rows);
    db.pool.end()
  })

}

module.exports = {
  getProductQuestions,
}