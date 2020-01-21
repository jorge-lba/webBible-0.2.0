import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'

function Bible(){
    return( 
        <View style={ styles.searchBible } >
            
            <ModalDropdown 
                options={optionsBook()} 
                defaultValue={ 'Genesis' }
                style={ styles.dropdownButton }
                textStyle= { styles.dropdownTextStyle }
                dropdownStyle={ styles.dropdownDropbox }
                dropdownTextStyle={ styles.dropdownDropboxTextStyle }
            />
            <ModalDropdown 
                options={optionsBook()} 
                defaultValue={ '01' }
                style={ styles.dropdownButton }
                textStyle= { styles.dropdownTextStyle }
                dropdownStyle={ styles.dropdownDropbox }
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