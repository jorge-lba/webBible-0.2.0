function removeSelectedVerse( valueRemove, arrayVerses ){
    const indexValue = arrayVerses.indexOf( valueRemove )

    if( indexValue > -1 ) arrayVerses.splice( indexValue, 1 )

    return arrayVerses
}

function compararNumeros(a, b) {
  return a - b;
}

module.exports.selectVerse = function( id, arrayVerses ){
  id = parseInt( id )
  arrayVerses.indexOf( id ) > -1 
  ? removeSelectedVerse( id, arrayVerses )
  : arrayVerses.push( id )
  arrayVerses.sort(compararNumeros)
  
  return arrayVerses

}

module.exports.selectMultVerse = function( id, arrayVerses ){
  
  id = parseInt( id )

  const forSetSelect = ( typeOperation ) => {
   
    let numberS = parseInt(arrayVerses[ arrayVerses.length - 1 ])
    if( isNaN( numberS ) ) numberS = 0

    const testNumber = [ id, numberS ]
    testNumber.sort( compararNumeros )

    switch( typeOperation ){
      case 'add':
        for( let i = testNumber[0]; i <= testNumber[1]; i++  ){
          arrayVerses.indexOf( i ) > -1 ? {} : arrayVerses.push( i )
        }
        break;
      case 'sub':
        
        for( let i = testNumber[0]; i <= testNumber[1]; i++ ){
          removeSelectedVerse( i, arrayVerses )
        }
        break;
    }
  }
 
  arrayVerses.sort(compararNumeros)

  arrayVerses.indexOf( id ) > -1 
  ? forSetSelect( 'sub' ) 
  : forSetSelect( 'add' )


  return arrayVerses

  }