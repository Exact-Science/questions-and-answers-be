const faker = require('faker');
const fs = require('file-system');
const Moment = require('moment');
const { Pool, Client } = require('pg');
const { performance } = require('perf_hooks');
let questionsFilePath = '/Users/b-ghostvirus/Galvanize/Capstone-Project/SDC/database/data/additional_questions.csv';

const time1 = performance.now();

const fileHeaderFields = `id, product_id, body, date, name, email, reported, helpfulness\n`;
fs.appendFileSync(questionsFilePath, fileHeaderFields, 'utf8');

for (let i=3521635; i < 10000000; i++) {
  let newLine = '';
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
  newLine += `${id},${product_id},${body},${date},${name},${email},${reported},${helpfulness}\n`;
  fs.appendFileSync(questionsFilePath, newLine, 'utf8');
}

const time2 = performance.now();
const totalTime = time2 - time1;
const mins = Math.floor(totalTime / 60000) % 60;
const secs = ((totalTime / 1000) % 60);
const msecs = ("00" + totalTime).slice(-3);
console.log(`${totalTime} (${mins}:${secs}.${msecs})`);