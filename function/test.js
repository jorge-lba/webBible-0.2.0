const bible = require("./index")
const dataDefault = {
    dataDefault: {
        language: 'pt-br',
        version: 'NVI',
        book: ' genesis',
        chapter: '2',
        verse: '5',
        random: {
            chapter: {
                use: false,
                min: null,
                max: null
            },
            verse: {
                use: 1,
                min: null,
                max: null
            }
        }
    },
    call: ['verse','random-verse']
}

const data1 = {
    language: 'EN',
    version: 'NVI',
    book: 'GENesiS',
    chapter: '1',
    verse: '1'
}

console.log( bible(dataDefault) )

// console.log(bible.full().books.genesis.data);
// console.log(bible.titles())
// console.log(bible.data());
// console.log(bible.dataConfig)
// console.log(bible.joinCallData( data1 ))
// console.log(bible.dataConfig)
// console.log(bible.getBook()[1][1])
// console.log(bible.getChapter())
// console.log(bible.getVerse())
// console.log(bible.titles())

// console.log(bible.dataConfig())