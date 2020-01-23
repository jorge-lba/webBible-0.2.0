import React from 'react'
import { Button, TouchableOpacity } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { MaterialIcons } from '@expo/vector-icons'

import Main from './pages/main'
import Bible from './pages/bible'

const Routes = createAppContainer( 
    createStackNavigator({
        Bible: {
            screen: Bible,
            navigationOptions:{
                title: 'Bíblia',
                headerRight: () => (
                    <TouchableOpacity onPress={ ( ) => console.log( 'Press' ) } >   
                        <MaterialIcons name='my-location' size={ 20 } color='#FFF'/>
                    </TouchableOpacity>
                  ),
            }
        },
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Inicio'
            }
        },
    },  {
        defaultNavigationOptions: {
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#7D40E7',
                
            },
        }
    },)
)

export default Routes