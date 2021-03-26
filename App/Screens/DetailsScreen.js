import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native'

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
                <FlatList 
                    data={data}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <Text>{ item.title }</Text>
                                <Text>{ item.description }</Text>
                            </View>
                        )
                    }}
                />
                {/* <Button title="Go to Details... again" onPress={() => navigation.push('Details')} />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
                <Button title="Go back" onPress={() => navigation.goBack()} /> */}
            </View>
        )
    }
}

export default DetailsScreen