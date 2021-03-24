import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class DetailsScreen extends Component {
    constructor() {
        super()
        state = {}
    }
    
    render() {
        const { route, navigation } = this.props
        console.log('route', route.params)
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 32, marginBottom: 15 }}>Details Screen</Text>
                <Button title="Go to Details... again" onPress={() => navigation.push('Details')} />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => navigation.goBack()} />
            </View>
        )
    }
}

export default DetailsScreen