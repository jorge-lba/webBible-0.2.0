const bible = require("./controller")

console.log(bible.full('en').books.genesis.data);
console.log(bible.titles())
console.log(bible.data());