import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import createStore from './App/Redux'
import RootContainer from './RootContainer'

const store = createStore();

class App extends Component {
    constructor() {
        super()
        state = {}
    }

    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}

export default App