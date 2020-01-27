import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Modal, Text, View, TouchableHighlight, TouchableWithoutFeedback, Button, Slider } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system';

const fileUri = FileSystem.documentDirectory + 'config.json'
const configJSON = FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 })

function HeaderBible( props ) { 
    
    const [ config, setConfig ] = useState( { isShowingText: false, textSize: 16 } )
    
    
    useEffect(() => {

        const fontSizeSaveInConfig = JSON.parse(configJSON._55) || { config: { fontSize: 16 } }

        setConfig( value =>{
            return{
                ...value,
                textSize: fontSizeSaveInConfig.config.fontSize
            }
        })
    }, [ ])

    function modalConfig(){
        setConfig(previousState => {           
            return { 
                ...previousState,
                isShowingText: !previousState.isShowingText, 
            }
        })
    }

    function reloadPage(){

        const configApp = {
            config: {
                fontSize: config.textSize || 16
            }
        }

        try {
            async function tes () {
                    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify( configApp ), { encoding: FileSystem.EncodingType.UTF8 });
                }
            tes()
        } catch (error) {
            console.log(error)
        }

        props.reload( { size: config.textSize } )
    }

    function changeFontSize( value ){

        setConfig( previousState => {
            return {
                ...previousState,
                textSize: value
            }
        } )
    }

    return (<>
        <TouchableOpacity onPress={ ( ) => {
            modalConfig( ) 

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
                <TouchableOpacity onPress={ ( ) => modalConfig( ) } style={{ flex:1}} />   
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
                    <View style={{ justifyContent:'center', alignContent:'center', flex:1, height:90  }} > 
                        <Text style={{ textAlign: 'center', fontSize: config.textSize}}> {config.textSize} </Text> 
                    </View>
                    <Slider 
                        style={ { width: '100%', marginVertical: 10 } } 
                        maximumValue={ 70 } 
                        minimumValue={14} 
                        onValueChange={ value => changeFontSize(value) } 
                        onSlidingComplete={ () => reloadPage() }
                        step={2}
                        thumbTintColor='#458'
                        thumbTintColor='#458'
                        value={ config.textSize }
                    />
                </View>
            </Modal>
    </>)
}

export default HeaderBible