import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Dropdown from '../../utils/Dropdown'

function Bible(){
    return( 
        <View style={ styles.searchBible } >
            <Dropdown 
                buttonStyle={  styles.dropdownButton  }
                buttonStyleText={ styles.dropdownTextStyle }
                buttonText={ 'Genesis' }    
            />
            <Dropdown 
                buttonStyle={  styles.dropdownButton  }
                buttonStyleText={ styles.dropdownTextStyle }
                buttonText={ '01' }    
            />
        </View>
    )
}

function optionsBook(){
    return [ 'Genesis', 'Exodos','Genesis', 'Exodos','Genesis', 'Exodos','Genesis', 'Exodos' ]
}


const styles = StyleSheet.create({
    searchBible: {
        flexDirection: 'row',
        elevation: 1.5,
    },
    dropdownButton: {
        flex: 1,
        flexDirection: 'row',
        width: 180,
        height: 56,
        backgroundColor: '#ffffff',
        elevation: 5,
        paddingTop: 10,
        paddingHorizontal: 10,
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