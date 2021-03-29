import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { connect } from 'react-redux'

class DetailsScreen extends Component {
    constructor() {
        super()
        state = {}
    }
    
    render() {
        const { route, navigation } = this.props
        const data = route.params
        const { nilai } = this.props.test
        console.log('route', data)

        return (
            <View>
                <View>
                    <Text>Nilai: { nilai }</Text>
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

const mapStateToProps = state => {
	return {
        test: state.test
	};
};

export default connect(mapStateToProps, null)(DetailsScreen)