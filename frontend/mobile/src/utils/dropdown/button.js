import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'



function DButton(props){

    const defaultdButtonStyle = styleDefault.dButtonStyle
    const propsdButtonStyle = props.dButtonStyle
    const dButtonStyle ={ ...defaultdButtonStyle, ...propsdButtonStyle }

    console.log( dButtonStyle )

    return (
        <>
            <TouchableOpacity style={ dButtonStyle }>
                <Text style={ styleDefault.dButtonTextStyle } >{ props.value }</Text>
                <MaterialIcons name='keyboard-arrow-down' size={32} style={ styleDefault.dButtonIconsStyle } />
            </TouchableOpacity>
        </>
    )
    
}


const styleDefault = StyleSheet.create({
    dButtonStyle:{
        flexDirection:'row',
        height: 32,
        backgroundColor: '#fff',
        borderRadius: 3,
        marginHorizontal: 8,
    },
    dButtonTextStyle:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#000',
        paddingHorizontal: 8
    },
    dButtonIconsStyle:{
        color:'#5f5f5f',
        position: 'absolute',
        right: 2
    }
})


export default DButton