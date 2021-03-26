import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class HomeScreen extends Component {
    constructor() {
        super()
        state = {}
    }
    
    render() {
        const { navigation } = this.props
        const payload = [
            {id: 1, title: 'TEST', description: 'THIS IS JUST FOR A TEST'},
            {id: 2, title: 'TEST LAGI', description: 'TEST LAGI'}
        ]
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 32, marginBottom: 15 }}>Home Screen</Text>
                <Button title="Go to Details" onPress={() => navigation.navigate('Details', payload)} />
            </View>
        )
    }
}

export default HomeScreen