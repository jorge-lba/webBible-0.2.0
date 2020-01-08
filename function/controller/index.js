const bible = require( '../bible' )
const dataDefault = {
    language: 'pt-br',
    version: 'NVI',
    book: 'genesis',
    chapter: 1,
    verse: 1,
    random: {
        chapter: {
            use: false,
            min: 1,
            max: null
        },
        verse: {
            use: false,
            min: 1,
            max: null
        }
    }
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

const getAndTestIfBookIsValid = ( bibleFull , objectData = dataDefault ) => {
    
    const validBooks = Object.keys( bibleFull.books )
    return validBooks.indexOf( objectData.book ) > -1 
        ? { result: objectData.book, 
            error: [false, 'No errors found.' ], 
            content: bibleFull.books[objectData.book], 
            validOptions: validBooks 
        } 

        : { result: validBooks[0],
            error: [ true, `Book ${objectData.book} does not exist, result changed to Genesis.` ], 
            content: bible(objectData).books['genesis'], 
            validOptions: validBooks 
        } 
}

const getAndTestAndGetIfChapterIsValid = ( bookBible, objectData = dataDefault ) => {
    const validChapters = Object.keys( bookBible )

    return validChapters.indexOf( objectData.chapter.toString() ) > -1
        ? { result: objectData.chapter, 
            error: [false, 'No errors found.' ], 
            content: bookBible[objectData.chapter], 
            validOptions: validChapters
        }

        : { result: validChapters[0], 
            error: [ true, `Chapter ${objectData.chapter} does not exist, result changed to one.` ], 
            content: bookBible[1],
            validOptions: validChapters 
        }
}

const getAndTestIfVerseIsValid = ( chapterBible, objectData = dataDefault ) => {
    const validVerses = Object.keys( chapterBible )
    return validVerses.indexOf( objectData.verse.toString() ) > -1
        ? { result: objectData.verse, 
            error: [false, 'No errors found.' ], 
            content: chapterBible[objectData.verse],
            validOptions: validVerses
        }
        : { result: validVerses[0], 
            error: [ true, `Verse ${objectData.verse} does not exist, result changed to one.` ], 
            content: chapterBible[1],
            validOptions: validVerses
        }
}

const callRandom = ( bible = bible.get( dataDefault ) , objectData = dataDefault ) => {
    const result = new Object
    result.book = {}
    result.chapter = {}
    result.verse = {}

    const getRandomInt = (  max ) => Math.random() * ( max - 0 ) + 0

    const books = getAndTestIfBookIsValid( bible, objectData )
    objectData.book = books.validOptions[ parseInt( getRandomInt( books.validOptions.length - 1 ) ) ]
    result.book.content = bible.books[ objectData.book ]
    result.book.call = result.book.content.data.title

    const chapters = getAndTestAndGetIfChapterIsValid( result.book.content, objectData )
    objectData.chapter = chapters.validOptions[ parseInt( getRandomInt( chapters.validOptions.length - 1 ) ) ]
    result.chapter.content = result.book.content[ objectData.chapter ]
    result.chapter.call = [ result.book.call ,objectData.chapter ]

    const verses = getAndTestIfVerseIsValid(  result.chapter.content, objectData)
    objectData.verse = verses.validOptions[ parseInt( getRandomInt( verses.validOptions.length - 1 ) ) ]
    result.verse.content = result.chapter.content[ objectData.verse ]
    result.verse.call = [ result.book.call ,objectData.chapter, objectData.verse ]

    return result
}

module.exports.dataConfig = ( objectData = dataDefault ) => objectData

module.exports.joinCallData = ( objectData = dataDefault) => {
    objectData.language = objectData.language.toLowerCase()
    objectData.version = objectData.version.toUpperCase()
    objectData.book = objectData.book.toLowerCase()
    return joinDefault( objectData ) 
}
const joinDefault = ( objectData ) => {
    Object.assign( dataDefault, objectData)
    return objectData
}

module.exports.languages = bible.getValidLanguageOptions

module.exports.full = ( objectData = dataDefault ) => bible.get( objectData )

const titles = ( objectData = dataDefault ) => {
    const fullBible = bible.get( objectData )
    const bibleBooks = Object.keys(fullBible.books)
    return bibleBooks.map( bookName => fullBible.books[bookName].data.title )
} 
module.exports.data = ( objectData = dataDefault ) => bible.get( objectData ).data

module.exports.get = function( objectData = dataDefault ) {

    objectData = configureCallFormatting( objectData )
    objectData = joinDefault( objectData )

    const bibleFull = bible.get( objectData )
    
    const result = new Object
    
    const book = getAndTestIfBookIsValid( bibleFull, objectData)
    const chapter = getAndTestAndGetIfChapterIsValid( book.content, objectData )
    const verse = getAndTestIfVerseIsValid(chapter.content, objectData)

    result.full = bibleFull
    result.verse = verse
    result.chapter = chapter
    result.book = book

    result.title = titles( objectData )
    result.languages = bible.languagesAndVersions()
    result.random = callRandom( bibleFull ,objectData )
    result.info = {
        full: 'get.full - ',
        verse: 'get.verse - return verse ',
        chapter: 'get.chapter - ',
        book: 'get.book - ',
        title: 'get.title - ',
        languages: 'get.languages - ',
        info: 'get.info - '
    }

    return result
}

