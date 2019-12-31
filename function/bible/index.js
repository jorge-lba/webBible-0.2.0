const fs = require('fs')

const getBible = ( language, version ) => {
    const bible = require(`./${language}/${version}`)()
    return bible
}

const getValidLanguageOptions = () =>{
    const language = fs.readdirSync(__dirname)
    const removeIndexJs = language.indexOf('index.js')
    language.splice(removeIndexJs, 1)
    return language
}

console.log(getBible("pt-br", "NVI").judas[1][1])
console.log(getValidLanguageOptions())