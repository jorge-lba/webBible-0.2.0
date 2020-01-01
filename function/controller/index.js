const bible = require( '../bible' )
const data = {
    language: 'pt-br',
    version: 'NVI',
    book: 'genesis',
    chapter: 1,
    verse: 1
}

const testIfBookIsValid = ( fullBible, objectData = data ) => {
    const validBooks = Object.keys( fullBible.books )
    return validBooks.indexOf( objectData.book ) > 0 
        ? { result: objectData.book, error: 'No errors found.' } 
        : { result: validBooks[0], error: `Book ${objectData.book} does not exist, result changed to Genesis.` } 
}

const testIfChapterIsValid = ( bibleBook, objectData = data ) => {
    const validChapters = Object.keys( bibleBook )
    console.log(validChapters)
    return validChapters.indexOf( objectData.chapter.toString() ) > 0
        ? { result: objectData.chapter , error: 'No erros found.'}
        : { result: validChapters[0], error: `Book ${objectData.chapter} does not exist, result changed to one.` }
}

module.exports.getBook = ( objectData = data) => bible( objectData.language, objectData.version ).books[ objectData.book ]
module.exports.getChapter = ( objectData = data ) => bible( objectData.language, objectData.version )
                                                        .books[ objectData.book ]
                                                        [ objectData.chapter ]
module.exports.getVerse = ( objectData = data ) => bible( objectData.language, objectData.version )
                                                        .books[ objectData.book ]
                                                        [ objectData.chapter ]
                                                        [ objectData.verse ]


const returnChapter = ( objectData = data ) => {

}

module.exports.dataConfig = data
module.exports.joinCallData = ( callData ) => Object.assign( data, callData)
module.exports.full = ( objectData = data ) => bible( objectData.language, objectData.version )
module.exports.titles = ( objectData = data ) => {
    const fullBible = bible( objectData.language, objectData.version )
    const bibleBooks = Object.keys(fullBible.books)
    return bibleBooks.map( bookName => fullBible.books[bookName].data.title )
} 
module.exports.data = ( objectData = data ) => bible( objectData.language, objectData.version ).data

console.log(testIfBookIsValid(bible()).error)
console.log(testIfChapterIsValid(bible().books.genesis))