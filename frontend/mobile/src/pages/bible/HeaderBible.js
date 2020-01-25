import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Modal, Text, View, TouchableHighlight, TouchableWithoutFeedback, Button } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'
import Bible from './index'

const test = { size: 12 }

module.exports.test = test

function HeaderBible( props ) { 
 
    const [ config, setConfig ] = useState( { isShowingText: false, textSize:16 } )

    function modalConfig(){
        setConfig(previousState => {
            console.log( previousState )            
            return { 
                ...previousState,
                isShowingText: !previousState.isShowingText, 
            }
        })
    }

    function addFontSize( value ){
        setConfig( previousState => {
            test.size = previousState.textSize+value
            props.reload( { size: test.size } )
            return {
                ...previousState,
                textSize: previousState.textSize+value
            }
        } )
    }
    
    function subFontSize( value ){
        setConfig( previousState => {
            test.size= previousState.textSize-value
            props.reload( { size: test.size } )
            return {
                ...previousState,
                textSize: previousState.textSize-value
            }
        } )
    }

    return (<>
        <TouchableOpacity onPress={ ( ) => {
            modalConfig() 

        }
        } style={ { marginHorizontal: 8, width: 32 } } >   
            <MaterialIcons name='more-vert' size={ 20 } color='#FFF'/>
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
                    <Text style={{  margin: 20, flexDirection: 'column', justifyContent:'space-between', alignContent:'center', flexDirection:'row' }}> {test.size} </Text>
                    <Button onPress={ () => addFontSize(2) } title="Mais +" ></Button>
                    <Button onPress={ () => subFontSize(2) } title="Menos -"></Button>
                </View>
            </Modal>
    </>)
}

export default HeaderBible