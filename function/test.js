const bible = require("./controller")
const data = {
    language: '',
    version: 'NVI',
    book: 'genesis'
}

console.log(bible.full( data ).books.genesis.data);
console.log(bible.titles( data ))
console.log(bible.data( data ));
console.log(bible.dataConfig)
bible.joinCallData( data )
console.log(bible.dataConfig)
console.log(bible.getBook()[1])