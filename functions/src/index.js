const bible = require("./controller/index.js")
const dataDefault = {
    dataDefault: {
        language: 'pt-br',
        version: 'NVI',
        book: ' Obadias',
        chapter: '1',
        verse: '1',
        random: {
            chapter: {
                min: null,
                max: null
            },
            verse: {
                min: null,
                max: null
            }
        }
    },
    call: ['random-verse','book','chapter','verse','random-chapter']
}




const callRandomVerse = ( objectData = dataDefault, bible ) => bible.random( objectData ).verse

const callRandomChapter = ( objectData = dataDefault, bible ) => bible.random( objectData ).chapter

const resultCall = ( objectData = dataDefault) => {
    const cases = ['random-chapter','book','chapter','verse', 'random-verse', 'languages', 'titles', 'full']
    const paransCall = objectData.dataDefault
    const bibleGet = ( ) => bible.get( paransCall )
    const calls = objectData.call

    let result = calls.map( call => {
        switch( call ){
            case cases[0]:
                return callRandomChapter( objectData.dataDefault, bibleGet() )
            case cases[1]:
                return bibleGet().book()
            case cases[2]:
                return bibleGet().chapter()
            case cases[3]:
                return bibleGet().verse()
            case cases[4]:
                return callRandomVerse( objectData.dataDefault, bibleGet() )
            case cases[5]:
                return bibleGet().languages()
            case cases[6]:
                return bibleGet().titles()
            case cases[7]:
                return bibleGet().full()
            default:
                return 'Invalid call!'
        }
    } )
    
    result[0]
     ? {}
     : result = [ 'No calls were made!' ]

    return result
}

module.exports = resultCall

