import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
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

function Bible(props){

    const sizeNav = props.navigation.getParam( 'size' )

    const [ config, setConfig ] = useState( { textSize: 10, bibleCall: {
      book: 'genesis',
      chapter: 1
    } } )

    useEffect(()=> {
      function load() {
        setConfig( ( config ) => { return {
          ...config,
          textSize: sizeNav
        } })

      }
      load()
    },[sizeNav])

    function Item({title}) {
      return (
        <View style={{ paddingHorizontal: 16, paddingVertical: 8, justifyContent: 'center', backgroundColor: '#FAFAFA', borderBottomColor: '#CCC', borderBottomWidth: 1 }}>
          <Text style={{ fontSize: config.textSize, textAlign: 'left' }}>
          <Text style={{ color: '#888', fontSize: 12 }} >{ "  "+ title.id + "  "}</Text>
            
            {title.title}</Text>
        </View>
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
            }
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
          renderItem={({ item }) => <Item title={ item } />}
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

export default Bible