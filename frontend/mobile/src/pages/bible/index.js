import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import Dropdown from '../../utils/dropdown/Dropdown'

function Bible(){
    return( 
        <View style={ styles.searchBible } >
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