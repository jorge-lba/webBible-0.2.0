const bible = require( '../bible' )

module.exports.fullBible = bible

module.exports.booksNames = ( language = 'pt-br', version = 'NVI' ) => {
    const fullBible = bible( language, version )
    const bibleBooks = Object.keys(fullBible.books)
    return bibleBooks.map( bookName => fullBible.books[bookName].data.title )
} 

module.exports.bibleData = ( language = 'pt-br', version = 'NVI' ) => bible( language, version ).data