import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
// import Dropdown from '../../utils/Dropdown'
import { Dropdown } from 'react-native-material-dropdown';  // https://www.npmjs.com/package/react-native-material-dropdown

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
            <Dropdown
            itemCount = { 8 }
            dropdownPosition={ 0 }
            dropdownOffset={ { top: 18, left: 0 } }
            containerStyle={ { width: 120, position: 'absolute', left: 20 } }
            data={data}
        />
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
        height: 60,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    dropdownButton: {
        flex: 1,
        width: 150,
        height: 56,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    dropdownTextStyle: {
        fontSize: 24,
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