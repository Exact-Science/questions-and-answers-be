var faker = require('faker');
var fs = require('file-system');
var Moment = require('moment');
const { Pool, Client } = require('pg');

let arr = '';
let questionsFilePath = '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/additional_questions.csv';

arr = `id, product_id, body, date, name, email, reported, helpfulness\n`;
for (let i=3521635; i < 5000000; i++){
  const id = i;
  const product_id = faker.random.number({min:1, max:1000000});
  let body = faker.lorem.sentence();
  let date = faker.date.past();
  let name = `${faker.name.firstName()} ${faker.name.firstName()}`;
  const email = faker.internet.email();
  const reported = faker.random.number({min:0, max:1});
  const helpfulness = faker.random.number({min:0, max:50});

  date = Moment(date).format().toString().substring(0,10);
  const regex = /,/gi;
  body = body.replace(regex,'\,');
  name = name.replace(regex,'');
  arr += `${id},${product_id},${body},${date},${name},${email},${reported},${helpfulness}\n`;
}

let writer = fs.createWriteStream(questionsFilePath);
writer.write(arr);