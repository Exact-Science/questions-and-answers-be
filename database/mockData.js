var faker = require('faker');
var fs = require('file-system');

let arr = '';
let questionsFilePath = '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/additional_questions.csv';

arr = `id, product_id, body, date, name, email, reported, helpfulness\n`;
for (let i=12392947; i < 12392952; i++){
  const id = i;
  arr += `${id}`;
  const product_id = faker.random.number({min:1, max:1000000});
  const body = faker.lorem.sentence();
  const name = faker.random.word();
  const email = faker.internet.email();
  const reported = faker.random.number({min:0, max:1});
  const helpfulness = faker.random.number({min:0, max:50});
  arr += `${id},${product_id},${body},${name},${email},${reported},${helpfulness}\n`;
}

fs.writeFileSync(questionsFilePath, arr, (err) => {
  if (err) throw err;
  console.log(arr);
  console.log("The file was succesfully saved!");
});