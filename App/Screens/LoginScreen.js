import React, { Component } from 'react'
import { View, Text, Keyboard, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import AuthAction from '../Redux/AuthRedux'
import { connect } from 'react-redux'

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.auth.user,
            username: '',
            password : '',
            focusUsername: false,
            focusPassword: false,
            error: false,
            errorTitle: 'Sorry we could not find an account with that username and password. Please try again...',
            errorUsername: false,
            errorPassword: false,
            errorUsernameTitle: '',
            errorPasswordTitle: ''
        }
    }

    componentDidMount() {
        if (this.state.user) {
            this.props.navigation.navigate('Home')
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (this.props.navigation.isFocused()) {
            this.setState({ fetching: newProps.auth.fetching })
            if (!newProps.auth.fetching && newProps.auth.user) {
                this.props.navigation.navigate('Home')
            }
            if(!newProps.auth.fetching && newProps.auth.error) this.setState({ error: true })
        }
    }

    onLogin = () => {
        Keyboard.dismiss()
        const {username, password} = this.state

        if (!username) {
            this.setState({ errorUsername: true, errorUsernameTitle: 'Username is required.' })
        }
        if (!password) {
            this.setState({ errorPassword: true, errorPasswordTitle: 'Password is required.' })
        }

        if (username && password) {
            let payload = {
                username,
                password,
            }
            this.setState({ error: false }, () => this.props.authRequest(payload))
        }
    }
    
    render() {
        const { navigation } = this.props
        const { username, password, focusUsername, focusPassword, error, errorTitle, errorUsername, errorPassword, errorUsernameTitle, errorPasswordTitle } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <View style={{alignItems: 'center', marginBottom: 50}}>
                        <Image source={{ url: "https://i.pinimg.com/originals/5d/fe/1f/5dfe1fd80b1b7d49d88e62a52386c300.png" }} style={[styles.logo, {resizeMode: 'cover'}]} />
                    </View>

                    {error && (
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.label_error}>{errorTitle ? errorTitle : 'there is an error please try again.'}</Text>
                        </View>
                    )}

                    <View style={styles.field_group}>
                        <Text style={styles.label}>Username</Text>
                        <TextInput 
                            onFocus={() => this.setState({ focusUsername: true })}
                            onBlur={() => this.setState({ focusUsername: false })}
                            onChangeText = {(username) => this.setState({ errorUsername: false, username })}
                            value={username}
                            onSubmitEditing={() => {
                                this.passwordRef.focus()
                            }}
                            blurOnSubmit={false}
                            returnKeyType={"next"}
                            style={styles.field}
                            placeholder={focusUsername ? "" :"username"}
                            placeholderTextColor="#999"
                            underlineColorAndroid={'transparent'} />
                        {errorUsername && (
                            <Text style={styles.label_error}>{errorUsernameTitle ? errorUsernameTitle : 'there is an error please try again.'}</Text>
                        )}
                    </View>

                    <View style={styles.field_group}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            onFocus={() => this.setState({ focusPassword: true })}
                            onBlur={() => this.setState({ focusPassword: false })}
                            onSubmitEditing={this.login}
                            value={password}
                            onChangeText = {(password) => this.setState({ errorPassword: false, password })}
                            secureTextEntry
                            ref={(input) => this.passwordRef = input}
                            returnKeyType={"done"}
                            style={styles.field}
                            placeholder={focusPassword ? "" : "*******"}
                            placeholderTextColor="#999"
                            underlineColorAndroid={'transparent'} />
                        {errorPassword && (
                            <Text style={styles.label_error}>{errorPasswordTitle ? errorUsernameTitle : 'there is an error please try again.'}</Text>
                        )}
                    </View>

                    <View style={[styles.field_group, {paddingTop: 15}]}>
                        <TouchableOpacity style={styles.button} onPress={() => this.onLogin()}>
                            <Text style={styles.button_text}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: '#ffc93c', 
        alignContent: 'center', 
        justifyContent: 'center', 
        padding: 20 
    },
    logo: {
        backgroundColor: '#f5f5f5',
        width: 120,
        height: 120,
        borderRadius: 45
    },
    field_group: {
        paddingBottom: 5,
        paddingTop: 5
    },
    label_error: {
        color: "#f4511e", 
        fontWeight: "bold", 
        fontSize: 16,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center',
        marginTop: 5
    },
    label: { 
        color: "#000", 
        fontWeight: "bold", 
        fontSize: 14,
        marginBottom: 5
    },
    field: { 
        borderRadius: 5,
        padding: 10,
        paddingTop: 8,
        paddingBottom: 8, 
        fontSize: 16, 
        color: '#000', 
        backgroundColor: '#fff' 
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
		auth: state.auth
	};
};

const mapDispatchToProps = dispatch => {
	return {
		authRequest: obj => dispatch(AuthAction.authRequest(obj))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)