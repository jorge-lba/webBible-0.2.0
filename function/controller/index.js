const bible = require( '../bible' )
const dataDefault = {
    language: 'pt-br',
    version: 'NVI',
    book: 'genesis',
    chapter: 1,
    verse: 1
}

const assentAndSpecialCaractersRemove = ( text, lineRemove = true ) =>{                                                                
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    text = text.replace( '0', '' )
    text = text.replace( /\ /g, '' )
    text = text.replace( /\,/g, '' )
    text = text.replace( /\!/g, '' )
    text = text.replace( /\*/g, '' )
    text = text.replace( /\./g, '' )
    text = text.replace( /\;/g, '' )
    text = text.replace( /\_/g, '' )
    text = lineRemove ? text.replace( /\-/g , '' ) : text
    return text.replace('1','I').replace('2','II').replace('3','III'); 
}


const convertCaractersToCorrectSize = ( objectData = dataDefault ) => {
    objectData.language = objectData.language.toLowerCase()
    objectData.version = objectData.version.toUpperCase()
    objectData.book = objectData.book.toLowerCase()
    return objectData
}

const configureCallFormatting = ( objectData = dataDefault ) => {
    objectData = convertCaractersToCorrectSize( objectData )
    objectData.language = assentAndSpecialCaractersRemove( objectData.language, false )
    objectData.version = assentAndSpecialCaractersRemove( objectData.version )
    objectData.book = assentAndSpecialCaractersRemove( objectData.book )
    return objectData
}

const testIfBookIsValid = ( bibleFull , objectData = dataDefault ) => {
    const validBooks = Object.keys( bibleFull.books )
    return validBooks.indexOf( objectData.book ) > -1 
        ? { result: objectData.book, error: [false, 'No errors found.' ], content: bible(objectData).books[objectData.book] } 
        : { result: validBooks[0], error: [ true, `Book ${objectData.book} does not exist, result changed to Genesis.` ], content: bible(objectData).books['genesis'] } 
}

const testIfChapterIsValid = ( bookBible, objectData = dataDefault ) => {
    const validChapters = Object.keys( bookBible )
    return validChapters.indexOf( objectData.chapter.toString() ) > -1
        ? { result: objectData.chapter, error: [false, 'No errors found.' ], content: bookBible[objectData.chapter]}
        : { result: validChapters[0], error: [ true, `Chapter ${objectData.chapter} does not exist, result changed to one.` ], content: bookBible[1] }
}

const testIfVerseIsValid = ( chapterBible, objectData = dataDefault ) => {
    const validVerses = Object.keys( chapterBible )
    return validVerses.indexOf( objectData.verse.toString() ) > -1
        ? { result: objectData.verse, error: [false, 'No errors found.' ], content: chapterBible[objectData.verse] }
        : { result: validVerses[0], error: [ true, `Verse ${objectData.verse} does not exist, result changed to one.` ], content: chapterBible[1] }
}

const getBook = ( objectData = dataDefault) => bible( objectData )
                                                    .books[ objectData.book ]

const getChapter = ( objectData = dataDefault ) => bible( objectData )
                                                        .books[ objectData.book ]
                                                        [ objectData.chapter ]

const getVerse = ( objectData = dataDefault ) => bible( objectData )
                                                        .books[ objectData.book ]
                                                        [ objectData.chapter ]
                                                        [ objectData.verse ]
 
const testIsANumber = ( value ) => isNaN( value ) ? false : true

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

module.exports.languages = bible.getValidLanguageOptions

module.exports.full = ( objectData = dataDefault ) => bible( objectData )

const titles = ( objectData = dataDefault ) => {
    const fullBible = bible( objectData )
    const bibleBooks = Object.keys(fullBible.books)
    return bibleBooks.map( bookName => fullBible.books[bookName].data.title )
} 
module.exports.data = ( objectData = dataDefault ) => bible( objectData ).data

module.exports.get = function( objectData = dataDefault ) {

    objectData = configureCallFormatting( objectData )
    const bibleFull = bible( objectData )
    
    const result = new Object
    
    const book = testIfBookIsValid( bibleFull, objectData)
    const chapter = testIfChapterIsValid( book.content, objectData )
    const verse = testIfVerseIsValid(chapter.content, objectData)

    
    result.verse = verse
    result.chapter = chapter
    result.book = book

    result.title = titles( objectData )

    return result
}


