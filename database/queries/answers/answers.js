const db = require('../../index.js');

const getAnswers = (question_id, o, l) => {
  const offset = o || 1;
  const limit = l || 5;
  const query =
  `select
    answers.answer_id,
    answers.answer_body,
    answers.answer_date,
    answers.answer_name,
    answers.answer_email,
    answers.answer_reported,
    answers.answer_helpfulness,
    photos.photo_id,
    photos.photo_url
      from answers
      left join photos on answers.answer_id = photos.photo_answer_id
      where answers.answer_question_id = '${question_id}'
      order by answers.answer_helpfulness desc
      offset ${offset} limit ${limit}`;

let answers = {
  question: question_id,
  page: offset,
  count: limit,
  results: [],
};

return db.pool.query(query)
    .then((dbResults) => {
      dbResults.rows.forEach((a) => {
        let aExists = false;  // boolean to track if answer has already been accounted for

        // check if answer already exists in formatted results
        for (let i = 0; i < answers.results.length; i++) {
          if (a.answer_id === answers.results[i].answer_id) {
            aExists = true;
            break;
          }
        }

        // check if the answer is not a duplicate and the answer is not null
        if (!aExists && a.answer_id) {
          console.log(a)
          answers.results.push({
            id: a.answer_id,
            body: a.answer_body,
            date: a.answer_date,
            answerer_name: a.answer_name,
            helpfulness: a.answer_helpfulness,
            photos: [],
          })
        }
      })

      // iterate over the db results
      dbResults.rows.forEach((a) => {
        // check if a photo exists (id is not null)
        if (a.photo_id) {
          // iterate over output object and store photo on appropriate question
          for (let i = 0; i < answers.results.length; i++) {
            if (answers.results[i].answer_id === a.question_id) {
              answers.results[i].photos.push({
                id: a.photo_id,
                url: a.photo_url,
              })
              break;
            }
          }
        }
      })
    })
    .then(() => answers);
}

const addAnswer = (question_id, urlParams, jsonParams) => {
  // const body = jsonParams.body || urlParams.body;
  // const name = jsonParams.name || urlParams.name;
  // const email = jsonParams.email || urlParams.email;

  try {
    if (name.length > 0 && body.length > 0 && email.length > 0) {
      const query = '';

      return db.pool.query(query)
        .then(() => 201)
    }
  }
  catch(e) {
    return  400;
  }
}

module.exports = {
  getAnswers,
}