const db = require('../../index.js');

const getAnswers = (question_id, o, l) => {
  let offset = o || 1;
  let limit = l || 5;
  
}

module.exports = {
  getAnswers,
}