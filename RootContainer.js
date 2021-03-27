import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Toast, ActionSheet } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './App/Screens/LoginScreen'
import HomeScreen from './App/Screens/HomeScreen'
import DetailsScreen from './App/Screens/DetailsScreen'

class RootContainer extends Component {
	componentDidMount() {
		// if redux persist is not active fire startup action
	}

	UNSAFE_componentWillMount() {
		Toast.toastInstance = null;
		ActionSheet.actionsheetInstance = null;
	}
	render() {
		const Stack = createStackNavigator()
		return (
			<NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                    <Stack.Screen name="Home" component={HomeScreen} options={{headerTitleAlign: 'center', headerTitleStyle: {fontWeight: 'bold'}}} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                </Stack.Navigator>
            </NavigationContainer>
		);
	}
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({

})

export default connect(null, mapDispatchToProps)(RootContainer);
