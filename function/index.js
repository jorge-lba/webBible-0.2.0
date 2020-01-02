const bible = require("./controller")
const dataDefault = {
    language: 'pT - br',
    version: 'N.v.I',
    book: ' 0g --- Ê n E s i s',
    chapter: '1',
    verse: '1'
}

const assentAndSpecialCaractersRemove = ( text, lineRemove = true ) =>{                                                                
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    text = text.replace( '0', '' )
    text = text.replace( /\ /g, '' )
    text = text.replace( /\,/g, '' )
    text = text.replace( /\!/g, '' )
    text = text.replace( /\*/g, '' )
    text = text.replace( /\./g, '' )
    text = text.replace( /\;/g, '' )
    text = text.replace( /\_/g, '' )
    text = lineRemove ? text.replace( /\-/g , '' ) : text
    return text.replace('1','I').replace('2','II').replace('3','III'); 
}


const convertCaractersToCorrectSize = ( objectData = dataDefault ) => {
    objectData.language = objectData.language.toLowerCase()
    objectData.version = objectData.version.toUpperCase()
    objectData.book = objectData.book.toLowerCase()
    return objectData
}

const configureCallFormatting = ( objectData = dataDefault ) => {
    objectData = convertCaractersToCorrectSize( objectData )
    objectData.language = assentAndSpecialCaractersRemove( objectData.language, false )
    objectData.version = assentAndSpecialCaractersRemove( objectData.version )
    objectData.book = assentAndSpecialCaractersRemove( objectData.book )
    return objectData
}

console.log( dataDefault )
console.log( convertCaractersToCorrectSize() )
console.log( configureCallFormatting() )