import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
<<<<<<< HEAD
// import Dropdown from '../../utils/Dropdown'
import { Dropdown } from 'react-native-material-dropdown';  // https://www.npmjs.com/package/react-native-material-dropdown
=======

import Dropdown from '../../utils/dropdown/Dropdown'
>>>>>>> 71489f8f217ea123b265d4303807e63fe0bc75c9

function Bible(){
    let data = [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      },{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      },{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      },{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      },{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];

    return( 
    <>
        <View style={ styles.searchBible } >
<<<<<<< HEAD
            <Dropdown
            itemCount = { 8 }
            dropdownPosition={ 0 }
            dropdownOffset={ { top: 18, left: 0 } }
            containerStyle={ { width: 120, position: 'absolute', left: 20 } }
            data={data}
        />
=======
            <Dropdown 
                dButtonStyle={  styles.dropdownButton  }
                buttonStyleText={ styles.dropdownTextStyle }
                valueButton={ 'Genesis' }    
            />
            <Dropdown 
                dButtonStyle={  styles.dropdownButton2  }
                buttonStyleText={ styles.dropdownTextStyle }
                valueButton={ '001' }    
            />
>>>>>>> 71489f8f217ea123b265d4303807e63fe0bc75c9
        </View>
    </>
    )
}

function optionsBook(){
    return [ 'Genesis', 'Exodos','Genesis', 'Exodos','Genesis', 'Exodos','Genesis', 'Exodos' ]
}


const styles = StyleSheet.create({
    searchBible: {
        flexDirection: 'row',
<<<<<<< HEAD
        height: 60,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    dropdownButton: {
        flex: 1,
        width: 150,
=======
        elevation: 1.5,
>>>>>>> 71489f8f217ea123b265d4303807e63fe0bc75c9
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