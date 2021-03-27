import { createStackNavigator } from 'react-navigation-stack'
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers'
import LoginScreen from '../Screens/LoginScreen'
import HomeScreen from '../Screens/HomeScreen'

export const PrimaryNav = createStackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    HomeScreen: {
        screen: HomeScreen
    }
}, {
    initialRouteName: 'HomeScreen'
})

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(state => state.nav)
const AppNavigator = createReduxContainer(PrimaryNav, 'root')
export default AppNavigator