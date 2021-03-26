import React, { Component } from 'react'
import { View, Text, Button, FlatList } from 'react-native'

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
            <View>
                <FlatList 
                    data={payload}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <View>
                                    <Text>{ item.title }</Text>
                                    <Text>{ item.description }</Text>
                                </View>
                                <View>
                                    <Button title="Go to Details" onPress={() => navigation.navigate('Details', item)} />
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
}

export default HomeScreen