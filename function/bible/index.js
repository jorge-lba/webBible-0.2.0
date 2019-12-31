const fs = require('fs')

const getBible = ( language, version ) => require( `./${language}/${version}` )()

const getValidLanguageOptions = () => {
    const language = fs.readdirSync (__dirname )
    const removeIndexJs = language.indexOf( 'index.js' )
    language.splice( removeIndexJs, 1 )
    return language
}
const getValidVersionOptions = ( language ) => fs.readdirSync( __dirname+'/'+language )    

const testIfCallIsValid = ( call, options ) => options.indexOf(call) < 0 ? false : true

module.exports = ( language, version ) => {
    validLinguages = getValidLanguageOptions()
    language = testIfCallIsValid( language, validLinguages ) ? language : 'pt-br'

    validVesions = getValidVersionOptions( language )
    version = testIfCallIsValid( version, validVesions ) ? version : validVesions[0]

    const bible = getBible( language, version )
    return bible
}
