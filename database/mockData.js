var faker = require('faker');
var fs = require('file-system');

let arr = '';
let questionsFilePath = 'data/additional_questions.csv';

// write a header line before generating each line
for (let i=12392947; i < 12392952; i++){
  const id = i;
  const product_id = faker.random.number({min:1, max:1000000});
  const body = faker.lorem.sentence();
  const name = faker.random.word();
  const email = faker.internet.email();
  const reported = faker.random.number({min:0, max:1});
  const helpfulness = faker.random.number({min:0, max:50});
  arr += `${id},${product_id},${body},${name},${email},${reported},${helpfulness}\n`;
}
console.log(arr);

fs.writeFile(questionsFilePath, arr, (err) => {
  if (err) throw err;
  console.log("The file was succesfully saved!");
});

// arr.forEach((line) => {
//   const newLine = line`${.id},${line.firstName},${line.lastName}\n`;
//   // append data to file
//   fs.appendFile(questionsFilePath,newLine, 'utf8',
//       // callback function
//       function(err) {
//           if (err) throw err;
//           // if no error
//           console.log("Data is appended to file successfully.")
//   });
// });