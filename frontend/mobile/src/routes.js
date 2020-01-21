import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/main'
import Bible from './pages/bible'

const Routes = createAppContainer( 
    createStackNavigator({
        Main,
        Bible
    })
)

export default Routes