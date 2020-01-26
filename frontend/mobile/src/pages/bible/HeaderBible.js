import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Modal, Text, View, TouchableHighlight, TouchableWithoutFeedback, Button } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { MaterialIcons } from '@expo/vector-icons'
import Bible from './index'

const test = { size: 12 }

function HeaderBible( props ) { 
 
    const [ config, setConfig ] = useState( { isShowingText: false, textSize:16 } )

    useEffect(() => {

    }, [config])

    function modalConfig(){
        props.reload( { size: test.size } )
        setConfig(previousState => {           
            return { 
                ...previousState,
                isShowingText: !previousState.isShowingText, 
            }
        })
    }

    function addFontSize( value ){

        setConfig( previousState => {

            previousState.textSize > 68 ? previousState.textSize = 68 : {} 
            
            
            test.size = previousState.textSize+value
            return {
                ...previousState,
                textSize: previousState.textSize+value
            }
        } )
    }
    
    function subFontSize( value ){

        setConfig( previousState => {
            previousState.textSize < 16 ? previousState.textSize = 16 : {}

            test.size= previousState.textSize-value
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
                    width: 160, 
                    right:20,
                    top:27,
                    position:'absolute', 
                    backgroundColor: '#FFF', 
                    elevation: 3, 
                    justifyContent:'center',
                    alignContent: 'center',
                    
                } }>
                    <View style={{ justifyContent:'center', alignContent:'center', height: 90  }} > 
                        <Text style={{ textAlign: 'center', fontSize: test.size}}> {test.size} </Text> 
                    </View>
                    
                    <Button onPress={ () => addFontSize(2) } style={ { flex:1, flexDirection:'row' } } title="Mais +" ></Button>
                    <Button onPress={ () => subFontSize(2) } style={ { flex:1, flexDirection:'row' } } title="Menos -"></Button>
                </View>
            </Modal>
    </>)
}

export default HeaderBible