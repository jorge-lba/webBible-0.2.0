const bible = require("./controller")
const dataDefault = {
    language: 'pT - br',
    version: 'AA',
    book: ' 0g --- Ê n E s i s',
    chapter: '1',
    verse: '500'
}

const get = bible.get( dataDefault )

// console.log( dataDefault )
// console.log( convertCaractersToCorrectSize() )
// console.log( configureCallFormatting( ) )
// console.log( bible.titles() )

console.log( get.info )

