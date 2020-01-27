import React from 'react'
import { createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HeaderBible from './pages/Main/HeaderBible'

import Home from './pages/Home'
import Main from './pages/Main'

console.log(  )

const Routes = createAppContainer( 
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions:({ navigation }) =>({
                title: 'Bíblia',
                headerRight: ( ) =><HeaderBible

                reload={ ( config ) => navigation.navigate( 'Main', config )}
            />,
                
            })
        },
        Home: {
            screen: Home,
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