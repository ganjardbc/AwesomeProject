import React, { Component } from 'react'
import { View, Text, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Api from '../Services/Api'

class CardMaterial extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const {data} = this.props
        console.log('---')
        console.log('CardMaterial', data)
        return (
            <View style={{ padding: 10, margin: 10, backgroundColor: '#fff', elevation: 5 }}>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{width: 80}}>ID</Text>
                    <Text>: {data && data.materialID}</Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{width: 80}}>KIMAP</Text>
                    <Text>: {data && data.materialKimap}</Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{width: 80}}>NAME</Text>
                    <Text>: {data && data.materialName}</Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{width: 80}}>TYPE</Text>
                    <Text>: {data && data.materialType && data.materialType.value}</Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{width: 80}}>QTY</Text>
                    <Text>: {data && `${data.materialGrossWeigthUOM} ${data.materialUoM.value}`}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{width: 80}}>STATUS</Text>
                    <Text>: {data && data.materialStatus}</Text>
                </View>
            </View>
        )
    }
}

class DetailsScreen extends Component {
    constructor() {
        super()
        this.state = {
            fetching: false,
            totalMaterial: 0,
            limit: 5,
            offset: 0,
            data: []
        }
    }

    componentDidMount() {
        this.getCountMaterial()
    }

    getCountMaterial = async () => {
        this.setState({ fetching: true })

        const {limit, offset} = this.state
        let {auth} = this.props
        let es = auth && auth.user && auth.user.data && auth.user.data.employeeID.es
        let payload = {
            params: {
                clientID: es.client.clientID,
                companyID: es.company.compID,
                search: ""
            }
        }

        let res = await Api.create().getCountMaterialMaster(payload)
        // console.log('res', JSON.stringify(res))
        if (res.ok && res.data && res.data.data) {
            const count = res.data.data
            this.setState({totalMaterial: count, fetching: false}, console.log('getCountMaterial', count))
            this.getDataMaterial(limit, offset)
        } else {
            this.setState({fetching: false})
        }
    }

    getDataMaterial = async (limit = 0, offset = 0) => {
        this.setState({ fetching: true })

        let { auth } = this.props

        let data = []
        if (offset > 0) {
            data = Object.assign([], this.state.data)
        } else {
            data = []
        }

        let es = auth && auth.user && auth.user.data && auth.user.data.employeeID.es
        let payload = {
            limit: limit,
            offset: offset,
            params: {
                clientID: es.client.clientID,
                companyID: es.company.compID,
                search: ""
            }
        }

        let res = await Api.create().getMaterialMaster(payload)
        if (res.ok && res.data && res.data.data) {
            const newData = res.data.data

            console.log('getDataMaterial', JSON.stringify(newData))

            newData && newData.map((item) => {
                return data.push({...item})
            })

            this.setState(
                { data: data, fetching: false, limit, offset: (offset + 1) },
                console.log('getDataMaterial', 'success')
            )
        } else {
            this.setState(
                { fetching: false }, 
                console.log('getDataMaterial', res.data && res.data.message)
            )
        }
    }
    
    render() {
        const { data, fetching, limit, offset, totalMaterial } = this.state
        return (
            <ScrollView>
                {data && data.map((item, index) => {
                    return (<CardMaterial key={index} data={item} />)
                })}

                <View style={{padding: 10}}>
                    {fetching ? (
                        <Text style={{textAlign: 'center'}}>LOAD DATAS..</Text>
                    ) : data.length !== totalMaterial && (
                        <Button 
                            title={`LOAD MORE (${data.length}/${totalMaterial})`} 
                            onPress={() => this.getDataMaterial(limit, offset)} />
                    )}
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
	return {
        auth: state.auth
	};
};

export default connect(mapStateToProps, null)(DetailsScreen)