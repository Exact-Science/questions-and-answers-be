const db = require('../../index.js');

const getProductQuestions = (product_id) => {
  const query = `select questions.question_id, questions.question_body, questions.question_date, questions.question_name, questions.question_email, questions.question_reported, questions.question_helpfulness, answers.answer_id, answers.answer_body, answers.answer_date, answers.answer_name, answers.answer_email, answers.answer_reported, answers.answer_helpfulness, photos.photo_id, photos.photo_url from questions left join answers on questions.question_id = answers.answer_question_id left join photos on answers.answer_id = photos.photo_answer_id where questions.product_id = '${product_id}' order by questions.question_helpfulness desc, answers.answer_helpfulness desc`;

  let questions = {
    product_id,
    results: [],
  };

  // return db.pool.query(query)
  // .then((results) => results.rows);

  return db.pool.query(query)
    .then((dbResults) => {

      // iterate over dbResults
      dbResults.rows.forEach((q) => {

        let qExists = false;

        // check if question already exists in formatted results
        for (let i = 0; i < questions.results.length; i++) {
          currentQuestion = questions.results[i];
          if (currentQuestion.question_id === q.question_id) {
            qExists = true;
            // check answers
            // check if there is an answer (not null), if there is
            if (q.answer_id) {
              questions.results[i].answers[q.answer_id] = {
                id: q.answer_id,
                body: q.answer_body,
                date: q.answer_date,
                answerer_name: q.answer_name,
                helpfulness: q.answer_helpfulness,
              }
            }

            // check photos
          }
        }
        // if question doesn't exist in formatted results
        if (!qExists) {
          // store question, create an object for answers
          questions.results.push({
            question_id: q.question_id,
            question_body: q.question_body,
            question_date: q.question_date,
            asker_name: q.question_name,
            question_helpfulness: q.question_helpfulness,
            reported: q.question_reported,
            answers: {},
          })
          // check if there is an answer (not null), if there is
          if (q.answer_id) {
            questions.results[questions.results.length - 1].answers[q.answer_id] = {
              id: q.answer_id,
              body: q.answer_body,
              date: q.answer_date,
              answerer_name: q.answer_name,
              helpfulness: q.answer_helpfulness,
              photos: [],
            }
          }
          // check if there is a photo (not null), if there is
          if (q.photo_id) {
            // store initial photo
            questions.results[questions.results.length - 1].answers[q.answer_id].photos.push({
              id: q.photo_id,
              url: q.photo_url,
            })
          }
        }
      })
    })
    .then(() => questions);
}

module.exports = {
  getProductQuestions,
}