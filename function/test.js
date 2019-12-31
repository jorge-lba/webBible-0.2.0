const controller = require("./controller")

console.log(controller.fullBible('en').books.genesis.data);
console.log(controller.booksNames())
console.log(controller.bibleData());