import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Modal, Text, View, Slider, AsyncStorage } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
// import AsyncStorage from '@react-native-community/async-storage'


function HeaderBible( props ) { 
    
    const [ config, setConfig ] = useState( { isShowingText: false, textSize: 16 } )

    useEffect(() => {

        async function configFontSize(){
            let valueF = 0
            try {
                valueF = await AsyncStorage.getItem('@fontSizeConfig');
            if (valueF !== null) {
                // We have data!!
                valueF = parseInt( valueF )                    
                
                
            }else{
                valueF = 16
            }
        } catch (error) {
            // Error retrieving data
        }
        
        setConfig( conf =>{
            return{
                ...conf,
                textSize: valueF
            }
        })
        }
        configFontSize()
        
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
        async function storeData(){

            try {
              await AsyncStorage.setItem('@fontSizeConfig', `${config.textSize}` )
            } catch (e) {
              // saving error
              console.log(e )
            }

            props.reload( { size: config.textSize } )
        }

        storeData()

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