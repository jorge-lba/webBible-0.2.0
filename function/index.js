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
    call: ['random-verse','book','chapter','verse']
}



const callRandom = ( objectData = dataDefault, bible ) => {
    const callVerse = objectData.random.verse.use
    const callChapter = objectData.random.chapter.use

    return callVerse
        ? bible.random( objectData ).verse
        : callChapter
            ? bible.random( objectData ).chapter
            : "No call to aliatorio was made!"

}

const resultCall = ( objectData = dataDefault) => {

    const cases = ['random-verse','book','chapter','verse']
    const get = bible.get
    const paransCall = objectData.dataDefault
    const calls = objectData.call

    const result = calls.map( call => {
        switch( call ){
            case cases[0]:
                return callRandom( objectData.dataDefault, get( paransCall ) )
            case cases[1]:
                return get( paransCall ).book()
            case cases[2]:
                return get( paransCall ).chapter()
            case cases[3]:
                return get( paransCall ).verse()
            default:
                return 'Test'
        }
    } )
    

    return result
}

module.exports = resultCall

