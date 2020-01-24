import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Modal, Text, View, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { MaterialIcons } from '@expo/vector-icons'

function HeaderBible() { 
    
    const [ config, setConfig ] = useState( { isShowingText: false } )

    function modalConfig(){

        console.log( 'ESS' )
        setConfig(previousState => (
            { isShowingText: !previousState.isShowingText }
          ))
    }

    return (<>
        <TouchableOpacity onPress={ ( ) => modalConfig() } >   
            <MaterialIcons name='my-location' size={ 20 } color='#FFF'/>
        </TouchableOpacity>

        
            <Modal  animationType="fade"
                transparent={true}
                visible={config.isShowingText}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.')
                }}
            >  
                <TouchableOpacity onPress={ ( ) => modalConfig() } style={{ flex:1}} />   
                <View style={ {     
                    width: 150, 
                    height: 150,
                    right:20,
                    top:27,
                    position:'absolute', 
                    backgroundColor: '#FFF', 
                    elevation: 3, 
                    justifyContent:'center',
                    
                } }>
                    <Text style={{  margin: 20, flexDirection: 'column', justifyContent:'center', alignContent:'center' }}> Modal is open! </Text>
                    <MaterialIcons name='my-location' size={ 20 } color='#000'/>
                </View>
            </Modal>



    </>)
}

export default HeaderBible