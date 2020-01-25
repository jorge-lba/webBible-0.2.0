import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Modal, Text, View, TouchableHighlight, Button } from 'react-native'
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { MaterialIcons } from '@expo/vector-icons'

import HeaderBible from './pages/bible/HeaderBible'

import Main from './pages/main'
import Bible from './pages/bible'

console.log(  )

const Routes = createAppContainer( 
    createStackNavigator({
        Bible: {
            screen: Bible,
            navigationOptions:({ navigation }) =>({
                title: 'Bíblia',
                headerRight: ( ) =><HeaderBible

                reload={ ( config ) => navigation.navigate( 'Bible', config )}
            />,
                
            })
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
                backgroundColor: '#888',
                
            },
        }
    },)
)

export default Routes