import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class DetailsScreen extends Component {
    constructor() {
        super()
        state = {}
    }
    
    render() {
        const { route, navigation } = this.props
        const data = route.params
        console.log('route', data)

        return (
            <View>
                <View>
                    <Text>{ data && data.title }</Text>
                    <Text>{ data && data.description }</Text>
                </View>
                <Button title="Go to Details... again" onPress={() => navigation.push('Details')} />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => navigation.goBack()} />
            </View>
        )
    }
}

export default DetailsScreen