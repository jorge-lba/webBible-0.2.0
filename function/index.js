const bible = require("./controller")
const dataDefault = {
    language: 'pt-br',
    version: 'NVI',
    book: ' 0g --- Ê n E s i s',
    chapter: '15',
    verse: '500',
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

const get = bible.get( dataDefault )

// console.log( dataDefault )
// console.log( convertCaractersToCorrectSize() )
// console.log( configureCallFormatting( ) )
// console.log( bible.titles() )

console.log( get.random().verse )

