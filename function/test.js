const bible = require("./controller")
const data = {
    language: 'en',
    version: 'NVI',
    book: 'genesis',
    chapter: '1',
    verse: '1'
}

console.log(bible.full(  ).books.genesis.data);
console.log(bible.titles( data ))
console.log(bible.data( data ));
console.log(bible.dataConfig)
bible.joinCallData( data )
console.log(bible.dataConfig)
console.log(bible.getBook()[1][1])
console.log(bible.getChapter(data))
console.log(bible.getVerse())
console.log(bible.titles(data))