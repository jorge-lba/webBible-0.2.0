import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import DButton from './button'

function Dropdown( props ) {

    return (
        <>
            <DButton value={ props.valueButton } dButtonStyle={ props.dButtonStyle } />
        </>
    )
}

export default Dropdown