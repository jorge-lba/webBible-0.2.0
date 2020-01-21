import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/main'
import Bible from './pages/bible'

const Routes = createAppContainer( 
    createStackNavigator({
        Bible: {
            screen: Bible,
            navigationOptions:{
                title: 'Bíblia'
            }
        },
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Inicio'
            }
        },
    })
)

export default Routes