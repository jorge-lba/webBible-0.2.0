import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Modal, Text, View, TouchableHighlight } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { MaterialIcons } from '@expo/vector-icons'

import HeaderBible from './pages/bible/HeaderBible'

import Main from './pages/main'
import Bible from './pages/bible'



const Routes = createAppContainer( 
    createStackNavigator({
        Bible: {
            screen: Bible,
            navigationOptions:{
                title: 'Bíblia',
                headerRight: () =><HeaderBible/>,
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