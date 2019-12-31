const bible = require( '../bible' )
const data = {
    book: 'jodas'
}

const testIfBookIsValid = ( fullBible, objectData = data ) => {
    const validBooks = Object.keys( fullBible.books )
    return validBooks.indexOf( objectData.book ) > 0 ? [ objectData.book ] : [ validBooks[0], `Book ${objectData.book} does not exist, result changed to Genesis` ] 
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

console.log(testIfBookIsValid(bible()))