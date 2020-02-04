import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, AsyncStorage, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown';  // https://www.npmjs.com/package/react-native-material-dropdown
import { selectVerse, selectMultVerse } from './utils/selectVerse'
import { getTitleBooks, getChapters, getVerses } from './utils/consultBible'
import Swipeable from 'react-native-gesture-handler/Swipeable'  // https://software-mansion.github.io/react-native-gesture-handler/docs/component-swipeable.html

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
  console.log( 'test' )  

  const sizeNav = props.fontSizeAll || 16
    
  const [ config, setConfig ] = useState( { 
    textSize: sizeNav, 
    textSizeNumberVerse: sizeNav/1.3, 
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
      <TouchableOpacity style={ testVerseSelect( verseS, title.id ) }
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
    );
  }

  function getValueDropdown( option ,value ){
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


  function loadScrollADD(object, close){
    object++
    getValueDropdown( 'chapter',object ) 
    close()
  }
  function loadScrollSUB(object, close){
    object--
    getValueDropdown( 'chapter',object ) 
    close()
  }

  const refSw = []

  const renderLeftActions = (progress, dragX) => {    
    return (
            <View style={ { width: 1, height:'100%' } } />
    );
  }
   
  return( 
    <>  
      <View style={ styles.searchBible } >
        <Dropdown
          value={ BOOKS[0].value }
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

          <Swipeable

            leftThreshold={ 120}
            rightThreshold={ 120}

            ref={ ref => refSw[0] = ref }
            
            renderLeftActions={renderLeftActions}
            renderRightActions={ renderLeftActions }
          

            onSwipeableRightOpen={ () => loadScrollADD(config.bibleCall.chapter, refSw[0].close) }
            onSwipeableLeftOpen={ () => loadScrollSUB(config.bibleCall.chapter, refSw[0].close) }

            >
              <View style={ { width: "100%", height:'100%' } } >
                <FlatList
                  data={VERSES}
                  renderItem={({ item }) => <Item title={ item } textSize={config.textSize} textSizeNumber={ config.textSizeNumberVerse } verseS={ config.selectedVerse } />}
                  keyExtractor={item => item.id}
                  contentContainerStyle={ { width: deviceWidth } }
                />
              </View>
            </Swipeable>
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