import React from 'react'
import { View, Text } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'

function Bible(){
    return( 
        <View style={ styles.searchBible } >
            <ModalDropdown 
                options={optionsBook()} 
                defaultValue={ 'genesis' }
                style={ styles.dropdown.button } 
            />
        </View>
    )
}

function optionsBook(){
    return [ 'Genesis', 'Exodos','Genesis', 'Exodos','Genesis', 'Exodos','Genesis', 'Exodos' ]
}

const styles = {
    searchBible: {
        
    },
    dropdown: {
        button: {
            width: 100,
            height: 25,
            backgroundColor: '#F0f800'
        }
    }
}

export default Bible