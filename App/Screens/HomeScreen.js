import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Button } from 'react-native'
import AuthAction from '../Redux/AuthRedux'
import TestAction from '../Redux/TestRedux'
import { connect } from 'react-redux'

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.auth.user
        }
    }

    componentDidMount() {
        const {test} = this.props
        console.log('componentDidMount', test)

        if (!this.props.auth.user) {
            this.props.navigation.navigate('Login')
        } else {
            this.setState({ user: this.props.auth.user })
        }
    }

    componentDidUpdate() {
        const {test} = this.props
        console.log('componentDidUpdate', test)
    }

    onLogout() {
        this.props.authLogout();
        this.props.navigation.navigate('Login')
    }
    
    render() {
        const { navigation } = this.props
        const { user } = this.props.auth
        const { nilai } = this.props.test
        const nilaiRedux = this.props.nilai.nilai
        const payload = [
            {id: 1, title: 'TEST', description: 'THIS IS JUST FOR A TEST'},
            {id: 2, title: 'TEST LAGI', description: 'TEST LAGI'},
            {id: 3, title: 'TEST', description: 'THIS IS JUST FOR A TEST'},
            {id: 4, title: 'TEST LAGI', description: 'TEST LAGI'},
            {id: 5, title: 'TEST', description: 'THIS IS JUST FOR A TEST'},
            {id: 6, title: 'TEST LAGI', description: 'TEST LAGI'},
            {id: 7, title: 'TEST', description: 'THIS IS JUST FOR A TEST'},
            {id: 8, title: 'TEST LAGI', description: 'TEST LAGI'},
            {id: 9, title: 'TEST', description: 'THIS IS JUST FOR A TEST'},
            {id: 10, title: 'TEST LAGI', description: 'TEST LAGI'}
        ]
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: "https://i.pinimg.com/originals/5d/fe/1f/5dfe1fd80b1b7d49d88e62a52386c300.png" }} style={[styles.logo, {resizeMode: 'cover', marginBottom: 15}]} />
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{fontWeight: 'bold', fontSize: 32, marginBottom: 5}}>{user && user.data.userName}</Text>
                            <Text>{user && user.data.userID}</Text>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity style={{ padding: 10, backgroundColor: '#07689f', borderRadius: 5 }} onPress={() => this.onLogout()}>
                            <Text style={{ color: '#fff' }}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={{ padding: 10, paddingBottom: 0, fontSize: 32 }}>NILAI : {nilai}</Text>
                <Text style={{ padding: 10, paddingBottom: 0, fontSize: 32 }}>NILAI REDUX FORM SCREEN: {nilaiRedux}</Text>
                <View style={{ flex: 1, flexDirection: 'row', padding: 10, paddingBottom: 0 }}>
                    <Button title={'20'} onPress={() => this.props.addData('20')} />
                    <Button title={'50'} onPress={() => this.props.addData('50')} />
                    <Button title={'60'} onPress={() => this.props.addData('60')} />
                    <Button title={'100'} onPress={() => this.props.addData('100')} />
                    <Button title={'REMOVE'} onPress={() => this.props.removeData()} />
                </View>
                <View style={{ flex: 1, flexDirection: 'row', padding: 10, paddingBottom: 0 }}>
                    <Button title={'FORM'} onPress={() => navigation.push('Form', payload)} />
                    <Button title={'MATERIAL'} onPress={() => navigation.push('Material')} />
                </View>

                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    {payload && payload.map((item, index) => {
                        return (
                            <View style={styles.card} key={index}>
                                    <View style={{ width: '100%', height: 200, marginBottom: 10, backgroundColor: '#f5f5f5' }}></View>
                                    <View>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>{ item.title }</Text>
                                        <Text style={{ fontSize: 14, color: '#555' }}>{ item.description }</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', item)}>
                                            <Text style={styles.button_text}>VIEW DETAIL</Text>
                                        </TouchableOpacity>
                                    </View>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#ffc93c', 
        alignContent: 'center', 
        padding: 20
    },
    logo: {
        backgroundColor: '#f5f5f5',
        width: 90,
        height: 90,
        borderRadius: 30
    },
    card: {
        padding: 20,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#40a8c4',
        color: '#fff',
        alignItems: 'center',
        elevation: 2
    },
    button_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }
})

const mapStateToProps = state => {
	return {
        nilai: state.nilai,
		auth: state.auth,
        test: state.test
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authLogout: () => dispatch(AuthAction.authLogout()),
        addData: (nilai) => dispatch(TestAction.addData(nilai)),
        removeData: () => dispatch(TestAction.removeData())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)