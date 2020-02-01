import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, AsyncStorage, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';  // https://www.npmjs.com/package/react-native-material-dropdown

const bible = require( '../../content/bible/index.js' )

const dataDefault = {
  dataDefault: {
    language: 'pt-br',
    version: 'NVI',
    book: ' amos',
    chapter: '1',
    verse: '10',
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
  call: ['random-verse', 'random-verse', 'verse']
}


function Main(props){
  
  const sizeNav = props.navigation.getParam( 'size' ) || 14
    
  const [ config, setConfig ] = useState( { 
    textSize: 14, 
    textSizeNumberVerse: 9, 
    visible: 0 , 
    colorListContent: '#FAFAFA',
    bibleCall: {
      book: 'genesis',
      chapter: 1
    },
    selectedVerse: []
  } )

    
    useEffect(()=> {

      setConfig( ( config ) => { return {
        ...config,
        textSize: sizeNav,
        textSizeNumberVerse: sizeNav/1.3
      } })
      
    },[sizeNav])
    
    useEffect(() => {


      async function configFontSize(){
          let valueF = 0
          try {
              valueF = await AsyncStorage.getItem('@fontSizeConfig');
          if (valueF !== null) {
              // We have data!!
              valueF = parseInt( valueF )
                          
              
            }else{
              valueF = 16
            }
          } catch (error) {
            // Error retrieving data
          }
          
          setConfig( conf =>{
              return{
                  ...conf,
                  textSize: valueF,
                  visible: 100
              }
          })
      }
      configFontSize()

  }, [ ])

  function removeSelectedVerse( valueRemove, arrayVerses ){
      const indexValue = arrayVerses.indexOf( valueRemove )

      if( indexValue > -1 ) arrayVerses.splice( indexValue, 1 )
  }
  
  function compararNumeros(a, b) {
    return a - b;
  }
  function selectVerse( id, arrayVerses ){
    id = parseInt( id )
    arrayVerses.indexOf( id ) > -1 
    ? removeSelectedVerse( id, config.selectedVerse )
    : arrayVerses.push( id )
    arrayVerses.sort(compararNumeros)
    setConfig( ( config ) => { return {
      ...config,
      selectedVerse: arrayVerses
    } })

  }

  function selectMultVerse( id, arrayVerses ){
    
    id = parseInt( id )

    const forSetSelect = ( typeOperation ) => {
     
      const numberS = parseInt(arrayVerses[ arrayVerses.length - 1 ])

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
    
    function compararNumeros(a, b) {
      return a - b;
    }
    arrayVerses.sort(compararNumeros)

    arrayVerses.indexOf( id ) > -1 
    ? forSetSelect( 'sub' ) 
    : forSetSelect( 'add' )


    setConfig( ( config ) => { return {
      ...config,
      selectedVerse: arrayVerses
    } })
 
    }

    function selectBackground ( value ){
      return value
        ? { 
          opacity: config.visible,
          paddingHorizontal: 16, 
          paddingVertical: 8, 
          justifyContent: 'center', 
          backgroundColor: '#FAFAFA', 
          borderBottomColor: '#CCC', 
          borderBottomWidth: 1 
        }
        : { 
          opacity: config.visible,
          paddingHorizontal: 16, 
          paddingVertical: 8, 
          justifyContent: 'center', 
          backgroundColor: '#EAEAEA', 
          borderBottomColor: '#CCC', 
          borderBottomWidth: 1 
        }
    }


    function Item({title, textSize, textSizeNumber, verseS}) {
     
      function testVerseSelect( verseS, id ){
        
        id = parseInt(id)
  
        return verseS.indexOf( id ) > -1 
          ?  selectBackground( false )
          :  selectBackground( true )
      }

      return (
        <TouchableOpacity style={ testVerseSelect( verseS, title.id ) }
          key={title.id}
          onPress={ () => selectVerse( title.id, config.selectedVerse ) }
          onLongPress={ () => selectMultVerse( title.id, config.selectedVerse )  }
          >
          <Text style={{ fontSize: textSize, textAlign: 'left' }}>
          <Text style={{ color: '#888', fontSize: textSizeNumber }} >{ "  "+ title.id + "  "}</Text>
            
            {title.title}</Text>
        </TouchableOpacity>
      );
    }

    function optionsBook(){
      return bible( { call:[ 'titles' ] } )
    }

    const getTitleBooks = () => {
      const [books] = optionsBook()
      return books.map( ( book, index ) => {
        return {
          id: index+1,
          title: book,
          value: book
        }
      } )
    }

    function getChapters( book ){

      const chapters = bible({
        dataDefault:{
          book: book
        },
        call:['chapter']
      })[0].validOptions

      chapters.pop()

      return chapters.map( (item, index )=> {
        return{
          id: `${index}`,
          title:item,
          value: item
        }
      }
      )

    }

    function getVerses( book, chapter ){
      const chapters = bible({
        dataDefault:{
          book: book,
          chapter: chapter
        },
        call:['chapter']
      })[0].content

      const contentChapter = Object.entries(chapters)
      return contentChapter.map( ( content ) =>{
        return{
          id: content[0],
          title: content[1]
        }
      } )
    }

    function getValueDropdown( option ,value ){
        if( option === 'book' ){
          const chapters = getChapters( value ).length
          config.bibleCall.chapter > chapters ? config.bibleCall.chapter = chapters  : {}

        }

        setConfig( ( config ) => {
          return {
            ...config,
            bibleCall: {
              book: option === 'book'? value : config.bibleCall.book,
              chapter: option === 'chapter'? value : config.bibleCall.chapter
            },
            selectedVerse: []
          }
        } )
    }
    
    const BOOKS = getTitleBooks()
    const CHAPTERS = getChapters( config.bibleCall.book)
    const VERSES = getVerses(config.bibleCall.book, config.bibleCall.chapter )
     
    const dropdownBooks = (<Dropdown
      value={ BOOKS[0].value }
      itemCount = { 10 }
      dropdownPosition={ 0 }
      dropdownOffset={ { top: 18, left: 0 } }
      containerStyle={ { width: 160, justifyContent: 'center', marginHorizontal: 16} }
      data={ BOOKS }
      onChangeText={( object )=> getValueDropdown( 'book',object ) }
  />)

    return( 
    <>  
        <View style={ styles.searchBible } >
            {dropdownBooks}
            <Dropdown
                value={ config.bibleCall.chapter }
                itemCount = { 10 }
                dropdownPosition={ 0 }
                dropdownOffset={ { top: 18, left: 0 } }
                containerStyle={ { width: 56, justifyContent: 'center', marginHorizontal: 16} }
                data={CHAPTERS}
                onChangeText={( object )=> getValueDropdown('chapter', object ) }

            />
        </View>
        <FlatList
            data={VERSES}
            renderItem={({ item }) => <Item title={ item } textSize={config.textSize} textSizeNumber={ config.textSizeNumberVerse } verseS={ config.selectedVerse } />}
            keyExtractor={item => item.id}
            />
        <View style={ { height: 50, elevation: 3, backgroundColor: '#FFF' } } ></View>
    </>
    )
}



const styles = StyleSheet.create({
    searchBible: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#FFF',
        elevation: 2,
        justifyContent: 'center',
    },
    dropdownButton: {
        flex: 1,
        width: 150,
        height: 56,
        backgroundColor: '#888888',
        elevation: 5,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    dropdownButton: {
        width: 180,
        backgroundColor: '#FFF',
    },
    dropdownButton2: {
        width: 74,
        backgroundColor: '#0f5'
    },
    dropdownTextStyle: {
        fontSize: 24,
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    dropdownDropbox: {
        width: 150,
        height:100
    },
    dropdownDropboxTextStyle: {
        height: 48,
    }
})

export default Main