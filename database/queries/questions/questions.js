const db = require('../../index.js');

const getProductQuestions = (product_id, o, l) => {
  const offset = o || 1;
  const limit = l || 5;
  const query =
  `select
    questions.question_id,
    questions.question_body,
    questions.question_date,
    questions.question_name,
    questions.question_email,
    questions.question_reported,
    questions.question_helpfulness,
    answers.answer_id,
    answers.answer_body,
    answers.answer_date,
    answers.answer_name,
    answers.answer_email,
    answers.answer_reported,
    answers.answer_helpfulness,
    photos.photo_id,
    photos.photo_url
      from questions
      left join answers on questions.question_id = answers.answer_question_id
      left join photos on answers.answer_id = photos.photo_answer_id
      where questions.product_id = '${product_id}' AND questions.question_reported < '1' AND answers.answer_reported < '1'
      order by questions.question_helpfulness desc, answers.answer_helpfulness desc
      offset ${offset} limit ${limit}`;

  let questions = {
    product_id,
    results: [],
  };

  return db.pool.query(query)
    .then((dbResults) => {
      // iterate over dbResults
      dbResults.rows.forEach((q) => {

        let qExists = false;

        // check if question already exists in formatted results
        for  (let i = 0; i < questions.results.length; i++) {
          if (questions.results[i].question_id === q.question_id) {
            qExists = true;
            break;
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
        }
      })

      dbResults.rows.forEach((q) => {
        let aExists = false;  // boolean to track if answer has already been accounted for

        // check if answer already exists in formatted results
        for (let i = 0; i < questions.results.length; i++) {
          if (q.answer_id && Object.keys(questions.results[i].answers).includes(q.answer_id.toString())) {
            aExists = true;
            break;
          }
        }

        // check if the answer is not a duplicate and the answer is not null
        if (!aExists && q.answer_id) {
          // iterate over output object and store answers on appropriate question
          for (let i = 0; i < questions.results.length; i++) {
            if (questions.results[i].question_id === q.question_id) {
              questions.results[i].answers[q.answer_id] = {
                id: q.answer_id,
                body: q.answer_body,
                date: q.answer_date,
                answerer_name: q.answer_name,
                helpfulness: q.answer_helpfulness,
                photos: [],
              }
              break;
            }
          }
        }
      })

      // iterate over the db results
      dbResults.rows.forEach((q) => {
        // check if a photo exists (id is not null)
        if (q.photo_id) {
          // iterate over output object and store photo on appropriate question
          for (let i = 0; i < questions.results.length; i++) {
            if (questions.results[i].question_id === q.question_id) {
              questions.results[i].answers[q.answer_id].photos.push({
                id: q.photo_id,
                url: q.photo_url,
              })
              break;
            }
          }
        }
      })
    })
    .then(() => questions);
}

const addQuestion = (product_id, urlParams, jsonParams) => {
  const body = jsonParams.body || urlParams.body;
  const name = jsonParams.name || urlParams.name;
  const email = jsonParams.email || urlParams.email;

  try {
    if (name.length > 0 && body.length > 0 && email.length > 0) {
      const query =
        `INSERT INTO QUESTIONS
          (PRODUCT_ID, QUESTION_BODY, QUESTION_DATE, QUESTION_NAME, QUESTION_EMAIL, QUESTION_REPORTED, QUESTION_HELPFULNESS)
        VALUES
          ('${product_id}', '${body}', current_timestamp, '${name}', '${email}', '0', '0')`;

      return db.pool.query(query)
        .then(() => 201);
    }
  }
  catch(e) {
    return 400;
  }
}

const markQuestionHelpful = (question_id) => {
  try {
    const hQuery = `SELECT QUESTION_HELPFULNESS FROM QUESTIONS WHERE QUESTION_ID = '${question_id}'`;
    return db.pool.query(hQuery)
      .then((results) => {
        helpfulnessValue = results.rows[0].question_helpfulness + 1;
        const updateHelpfullnessQuery = `UPDATE QUESTIONS
        SET QUESTION_HELPFULNESS = '${helpfulnessValue}'
        WHERE QUESTION_ID = ${question_id}`;
        return db.pool.query(updateHelpfullnessQuery)
          .then(() => 204)
      })
  }
  catch(e) {
    return 400;
  }
}

const reportQuestion = (question_id) => {
  try {
    const rQuery = `SELECT QUESTION_REPORTED FROM QUESTIONS WHERE QUESTION_ID = '${question_id}'`;
    return db.pool.query(rQuery)
      .then((results) => {
        reportedValue = results.rows[0].question_reported + 1;
        const updateReportedQuery = `UPDATE QUESTIONS
        SET QUESTION_REPORTED = '${reportedValue}'
        WHERE QUESTION_ID = ${question_id}`;
        return db.pool.query(updateReportedQuery)
          .then(() => 204)
      })
  }
  catch(e) {
    return 400;
  }
}

module.exports = {
  getProductQuestions,
  addQuestion,
  markQuestionHelpful,
  reportQuestion,
}