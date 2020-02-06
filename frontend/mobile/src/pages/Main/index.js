import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';  // https://www.npmjs.com/package/react-native-material-dropdown
import { selectVerse, selectMultVerse } from './utils/selectVerse'
import { getTitleBooks, getChapters, getVerses } from './utils/consultBible'

const deviceWidth = Dimensions.get('window').width

async function configFontSize(functionSetState){
  let valueF = 0
  try {
      valueF = await AsyncStorage.getItem('@fontSizeConfig');
    if (valueF !== null) {
        valueF = parseInt( valueF )
    }else{
      await AsyncStorage.setItem('@fontSizeConfig', `16` )
      valueF = 16
    }
  } catch (error) {}

    functionSetState( conf =>{
      return{
          ...conf,
          textSize: valueF,
          visible: 100
      }
    })
  }

function selectBackgroundColor ( value, configData ){

  return value
    ? { 
      opacity: configData.visible,
      paddingHorizontal: 16, 
      paddingVertical: 8, 
      justifyContent: 'center', 
      backgroundColor: '#FAFAFA', 
      borderBottomColor: '#CCC', 
      borderBottomWidth: 1 
    }
    : { 
      opacity: configData.visible,
      paddingHorizontal: 16, 
      paddingVertical: 8, 
      justifyContent: 'center', 
      backgroundColor: '#EAEAEA', 
      borderBottomColor: '#CCC', 
      borderBottomWidth: 1 
    }
}

function Main(props){

  const sizeNav = props.fontSizeAll || 16
    
  const [ config, setConfig ] = useState( { 
    textSize: sizeNav, 
    textSizeNumberVerse: sizeNav/1.3, 
    visible: 0 , 
    colorListContent: '#FAFAFA',
    bibleCall: {
      book: 'Gênesis',
      chapter: 1,
      bookValueDropdown: 'Gênesis'
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

    configFontSize(setConfig)

  }, [ ])

  function verseSelect( id, arrayVerses ){

    setConfig( ( config ) => { return {
      ...config,
      selectedVerse: selectVerse( id, arrayVerses )
    } })

  }

  function multVersesSelect( id, arrayVerses ){

    setConfig( ( config ) => { return {
      ...config,
      selectedVerse: selectMultVerse( id, arrayVerses )
    } })
 
  }

  function Item({title, textSize, textSizeNumber, verseS }) {
    
    function testVerseSelect( verseS, id ){
      
      id = parseInt(id)

      return verseS.indexOf( id ) > -1 
        ?  selectBackgroundColor( false, config )
        :  selectBackgroundColor( true, config )
    }


    return (
      <>
         {isNaN(parseInt( title.id ))
          ? <View style={ { height: 64 } } />
          : <TouchableOpacity style={ testVerseSelect( verseS, title.id ) }
              key={title.id}
              onPress={ () => verseSelect( title.id, config.selectedVerse ) }
              onLongPress={ () => multVersesSelect( title.id, config.selectedVerse )  }
            >
            <Text style={{ fontSize: textSize, textAlign: 'left' }}>
              <Text style={{ color: '#888', fontSize: textSizeNumber }} >
                { "  "+ title.id + "  "}
              </Text>    
              {title.title}
            </Text>
            </TouchableOpacity>
          } 
      </>
    );
  }

  function getValueDropdown( option ,value ){

    let valueChapter =  config.bibleCall.chapter

    if( option === 'book' ){
      const chapterArray = getChapters( value ).length
        if( config.bibleCall.chapter > chapterArray ){
           valueChapter = chapterArray
        }
    }

      setConfig( ( config ) => {
        return {
          ...config,
          bibleCall: {
            book: option === 'book'? value : config.bibleCall.book,
            chapter: option === 'chapter'? value : valueChapter
          },
          selectedVerse: []
        }
      } )
  }

  function setPagination( object, books, chapters ){
     
    books  = books.map( book => book.title )
    chapters = chapters.map( chapter => parseInt(chapter.title) )

    const testChapterIsValid = ( chapterNumber, chapterArray ) => {
        return chapterArray.indexOf( chapterNumber ) > -1
          ? true
          : chapterArray.length < chapterNumber 
            ? 'next'
            : 'previous'
    }

    const resultTestChapter = testChapterIsValid( object.chapter, chapters )

    if( resultTestChapter === 'next' ){
      object.book = books[books.indexOf(object.book) +1]
      
      object.book === undefined 
        ? object = {
          book: books[ books.length-1 ], 
          chapter: 22
        } 
        : object.chapter = 1

    }else if( resultTestChapter === 'previous' ){
      object.book = books[books.indexOf(object.book) -1]
      
      object.book === undefined 
        ? object = {
          book: books[ 0 ], 
          chapter: 1
        } 
        : object.chapter = getChapters( object.book).length
    }

    setConfig( ( config ) => {
      return {
        ...config,
        bibleCall: {
          book: object.book,
          chapter: object.chapter,

        },
        selectedVerse: []
      }
    } )
  }
  
  const BOOKS = getTitleBooks()
  const CHAPTERS = getChapters( config.bibleCall.book)
  const VERSES = getVerses(config.bibleCall.book, config.bibleCall.chapter )
  VERSES.push({
    id: ' ',
    title: ` `
  })

  function loadScrollADD(object){
    object.chapter++
    setPagination( object,BOOKS,CHAPTERS ) 
  }
  function loadScrollSUB(object){
    object.chapter--
    setPagination( object, BOOKS, CHAPTERS ) 
  }
   
  return( 
    <>  
      <View style={ styles.searchBible } >
        <Dropdown
          value={ config.bibleCall.book }
          itemCount = { 10 }
          dropdownPosition={ 0 }
          dropdownOffset={ { top: 18, left: 0 } }
          containerStyle={ { width: 160, justifyContent: 'center', marginHorizontal: 16} }
          data={ BOOKS }
          onChangeText={( object )=> getValueDropdown( 'book',object ) }
        />
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

        <View style={ { flex: 1, flexDirection:'column' } }>

              <View style={ { width: "100%", height:'100%' } } >
                <FlatList
                  data={VERSES}
                  renderItem={({ item }) => <Item title={ item } textSize={config.textSize} textSizeNumber={ config.textSizeNumberVerse } verseS={ config.selectedVerse } />}
                  keyExtractor={item => item.id}
                  contentContainerStyle={ { width: deviceWidth } }
                />
              </View>
            <TouchableOpacity 
              style={ { 
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                width: 50, 
                height: 50, 
                backgroundColor:'#453689', 
                opacity:.4,
                borderRadius: 50,
                position: 'absolute', 
                bottom: 8, 
                left: 20 } } 
                onPress={ () => loadScrollSUB(config.bibleCall ) }
              />
            <TouchableOpacity 
              style={ { 
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                width: 50, 
                height: 50, 
                backgroundColor:'#453689', 
                opacity:.4,
                borderRadius: 50,
                position: 'absolute', 
                bottom: 8, 
                right: 20 } } 
                onPress={ () => loadScrollADD(config.bibleCall ) }
              />
   
          </View>

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