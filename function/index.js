const bible = require("./controller")
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

    const cases = ['random-chapter','book','chapter','verse', 'random-verse']
    const get = bible.get
    const paransCall = objectData.dataDefault
    const calls = objectData.call

    let result = calls.map( call => {
        switch( call ){
            case cases[0]:
                return callRandomChapter( objectData.dataDefault, get( paransCall ) )
            case cases[1]:
                return get( paransCall ).book()
            case cases[2]:
                return get( paransCall ).chapter()
            case cases[3]:
                return get( paransCall ).verse()
            case cases[4]:
                return callRandomVerse( objectData.dataDefault, get( paransCall ) )
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

