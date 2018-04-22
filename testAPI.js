// var request = require('request');
// var parse = require('xml-parser');
// var inspect = require('util').inspect;
// var word = "Москва";
// request(encodeURI(`https://ws3.morpher.ru/russian/declension?s=${word}&json`), function (error, response, body) {
//   var obj = parse(body);
//   console.log(inspect(obj, { colors: true, depth: Infinity }));

// });

var request = require('request');
var word = "Пономарёв Евгений Александрович";
request(encodeURI(`https://ws3.morpher.ru/russian/declension?s=${word}&format=json`), function (error, response, body) {
var padej = JSON.parse(body);
console.log(padej.Р);
});