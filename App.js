import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './App/Screens/HomeScreen'
import DetailsScreen from './App/Screens/DetailsScreen'

class App extends Component {
    constructor() {
        super()
        state = {}
    }

    render() {
        const Stack = createStackNavigator()
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Overview' }} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App