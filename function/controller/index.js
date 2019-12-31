const bible = require( '../bible' )

module.exports.full = bible

module.exports.titles = ( language = 'pt-br', version = 'NVI' ) => {
    const fullBible = bible( language, version )
    const bibleBooks = Object.keys(fullBible.books)
    return bibleBooks.map( bookName => fullBible.books[bookName].data.title )
} 

module.exports.data = ( language = 'pt-br', version = 'NVI' ) => bible( language, version ).data