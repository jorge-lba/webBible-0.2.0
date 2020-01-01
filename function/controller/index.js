const bible = require( '../bible' )
const dataDefault = {
    language: 'pt-br',
    version: 'NVI',
    book: 'genesis',
    chapter: 1,
    verse: 1
}

module.exports.testIfBookIsValid = ( fullBible, objectData = dataDefault ) => {
    const validBooks = Object.keys( fullBible.books )
    return validBooks.indexOf( objectData.book ) > -1 
        ? { result: objectData.book, error: 'No errors found.' } 
        : { result: validBooks[0], error: `Book ${objectData.book} does not exist, result changed to Genesis.` } 
}

module.exports.testIfChapterIsValid = ( bookBible, objectData = dataDefault ) => {
    const validChapters = Object.keys( bookBible )
    return validChapters.indexOf( objectData.chapter.toString() ) > -1
        ? { result: objectData.chapter, error: 'No erros found.'}
        : { result: validChapters[0], error: `Chapter ${objectData.chapter} does not exist, result changed to one.` }
}

module.exports.testIfVerseIsValid = ( chapterBible, objectData = dataDefault ) => {
    const validVerses = Object.keys( chapterBible )
    return validVerses.indexOf( objectData.verse.toString() ) > -1
        ? { result: objectData.verse, error: 'No erros found.' }
        : { result: validVerses[0], error: `Verse ${objectData.verse} does not exist, result changed to one.` }
}

module.exports.getBook = ( objectData = dataDefault) => bible( objectData )
                                                    .books[ objectData.book ]

module.exports.getChapter = ( objectData = dataDefault ) => bible( objectData )
                                                        .books[ objectData.book ]
                                                        [ objectData.chapter ]

module.exports.getVerse = ( objectData = dataDefault ) => bible( objectData )
                                                        .books[ objectData.book ]
                                                        [ objectData.chapter ]
                                                        [ objectData.verse ]

module.exports.dataConfig = ( objectData = dataDefault ) => objectData

module.exports.joinCallData = ( objectData = dataDefault) => {
    objectData.language = objectData.language.toLowerCase()
    objectData.version = objectData.version.toUpperCase()
    objectData.book = objectData.book.toLowerCase()
    return joinDefault( objectData ) 
}
const joinDefault = ( objectData ) => {
    Object.assign( dataDefault, objectData)
    return 'Join Successfully'
}

module.exports.full = ( objectData = dataDefault ) => bible( objectData )

module.exports.titles = ( objectData = dataDefault ) => {
    const fullBible = bible( objectData )
    const bibleBooks = Object.keys(fullBible.books)
    return bibleBooks.map( bookName => fullBible.books[bookName].data.title )
} 
module.exports.data = ( objectData = dataDefault ) => bible( objectData ).data
