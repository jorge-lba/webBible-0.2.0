import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

function Dropdown( props ) {
    
    return (
        <>
            <View style={ props.buttonStyle } >
                <Text style={ props.buttonStyleText } >{props.buttonText}</Text>
                <Text style={ props.buttonStyleText } >V</Text>
            </View>
        </>
    )
}

export default Dropdown