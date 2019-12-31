const bible = require("./controller")
const data = {
    language: '',
    version: 'NVI'
}

console.log(bible.full( data ).books.genesis.data);
console.log(bible.titles( data ))
console.log(bible.data( data ));