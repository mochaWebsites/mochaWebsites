const Handlebars = require('Handlebars');

Handlebars.registerHelper('reverseWord', function(value){
  var reversedWord = value.split("").reverse().join("");
  return reveredWord;
});

console.log(Handlebars);