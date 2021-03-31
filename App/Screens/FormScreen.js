import React, { Component } from 'react'
import { View, Text, Button, ScrollView, TextInput, StyleSheet } from 'react-native'
import NilaiAction from '../Redux/NilaiRedux'
import { connect } from 'react-redux'

class CardProfile extends Component {
    render() {
        const {title, disableIndex, payload} = this.props
        return (
            <View>
                <Text>{title ? title : 'CARD PROFILE'}</Text>
                {payload && payload.map((dt, index) => {
                    return (
                        <View key={index} style={{paddingTop: 10, paddingBottom: 10}}>
                            {!disableIndex && (
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{width: 60}}>Index</Text>
                                    <Text>: {index}</Text>
                                </View>
                            )}
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{width: 60}}>Name</Text>
                                <Text>: {dt.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{width: 60}}>About</Text>
                                <Text>: {dt.about}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        )
    }
}

class FormScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nilai: 0,
            nilaiRedux: 0,
            nilaiInput: 0
        }
    }

    componentDidMount() {
        const {nilai} = this.props 
        this.setState({nilaiRedux: nilai.nilai})
    }

    componentDidUpdate(prevProps) {
        const {nilai} = this.props 
        if (nilai !== prevProps.nilai) {
            this.setState({nilaiRedux: nilai.nilai})
        }
    }

    render() {
        const { route, navigation } = this.props
        const { nilai, nilaiRedux, nilaiInput } = this.state
        const dataArticle = route.params
        const dataProfile = [
            {name: "Ahmad", about: "Lorem ipsum dolor ismet."},
            {name: "Junaedi", about: "Lorem ipsum dolor ismet."},
            {name: "Arif", about: "Lorem ipsum dolor ismet."}
        ]
        return (
            <ScrollView style={{padding: 20}}>
                <View style={{marginBottom: 20}}>
                    <Text>contoh state component</Text>
                    <Text style={{fontSize: 32, marginBottom: 15}}>NILAI: {nilai}</Text>
                    <Button title="NAIKAN NILAI" onPress={() => this.setState({nilai: (nilai + 1)})} />
                    <Button title="TURUNKAN NILAI" onPress={() => this.setState({nilai: (nilai - 1)})} />
                </View>

                <View style={{marginBottom: 20}}>
                    <Text>contoh state redux</Text>
                    <Text style={{fontSize: 32}}>NILAI REDUX: {nilaiRedux}</Text>
                    
                    <TextInput 
                        style={[styles.field, {marginBottom: 15, marginTop: 15}]} 
                        value={nilaiInput} 
                        onChangeText={(data) => this.props.setNilai(data === '' ? 0 : parseInt(data) )}
                        placeholder={'nilai redux'} 
                        returnKeyType={"done"} 
                        placeholderTextColor="#999" />

                    <Button title="NAIKAN NILAI REDUX" onPress={() => this.props.setNilai((nilaiRedux + 1))} />
                    <Button title="TURUNKAN NILAI REDUX" onPress={() => this.props.setNilai((nilaiRedux - 1))} />
                    <Button title="RESET NILAI REDUX" onPress={() => this.props.resetNilai()} />
                </View>

                <View style={{marginBottom: 20}}>
                    <CardProfile title={'contoh props component'} disableIndex={false} payload={dataProfile} />
                </View>

                <View style={{marginBottom: 20}}>
                    <Text>contoh props navigasi</Text>
                    {dataArticle && dataArticle.map((dt, index) => {
                        return (
                            <View key={index} style={{paddingTop: 10, paddingBottom: 10}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{width: 80}}>Title</Text>
                                    <Text>: {dt.title}</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginBottom: 10}}>
                                    <Text style={{width: 80}}>Description</Text>
                                    <Text>: {dt.description}</Text>
                                </View>
                                <Button title={'VIEW DETAIL'} onPress={() => navigation.navigate('Details', dt)} />
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    field: { 
        borderRadius: 5,
        padding: 10,
        paddingTop: 8,
        paddingBottom: 8, 
        fontSize: 16, 
        color: '#000', 
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1
    },
})

const mapStateToProps = state => {
	return {
		nilai: state.nilai 
	};
};

const mapDispatchToProps = dispatch => {
	return {
        setNilai: (data) => dispatch(NilaiAction.setNilai(data)),
        resetNilai: () => dispatch(NilaiAction.resetNilai())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormScreen)