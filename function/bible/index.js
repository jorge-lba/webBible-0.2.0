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


console.log( getBible( "pt-br", "NVI" ).judas[1][1] )
console.log( getValidLanguageOptions() )
console.log( getValidVersionOptions( getValidLanguageOptions()[9]) )
console.log( testIfCallIsValid( 'NVI', getValidVersionOptions( getValidLanguageOptions()[9] ) ) )