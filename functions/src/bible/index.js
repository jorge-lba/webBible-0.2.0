const fs = require('fs')
const data = {
    language: 'pt-br',
    version: 'NVI',
    book: 'genesis',
    chapter: 1,
    verse: 1
}

const getBible = ( objectData = data ) => require( `./${objectData.language}/${objectData.version}` )()

const getValidLanguageOptions = () => {
    const language = fs.readdirSync (__dirname )
    const removeIndexJs = language.indexOf( 'index.js' )
    language.splice( removeIndexJs, 1 )
    return language
}

const getValidVersionOptions = ( language ) => fs.readdirSync( __dirname+'/'+language )    

const testIfCallIsValid = ( call, options ) => options.indexOf(call) < 0 ? false : true

module.exports.languagesAndVersions = () => {
    const languages = getValidLanguageOptions()
    const languagesAndVersions = new Object
    languages.forEach( language => {
        languagesAndVersions[language] = getValidVersionOptions( language )
    } )

    return languagesAndVersions
}

module.exports.get = function ( objectData = data ) {
    validLinguages = getValidLanguageOptions()
    objectData.language = testIfCallIsValid( objectData.language, validLinguages ) ? objectData.language : 'pt-br'
    
    validVesions = getValidVersionOptions( objectData.language )
    objectData.version = testIfCallIsValid( objectData.version, validVesions ) ? objectData.version : validVesions[0]
    
    return getBible( objectData )
}
