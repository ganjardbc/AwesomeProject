import apisauce from 'apisauce'
import { encode } from 'base-64'

const create = () => {
    let api
    let url = 'https://patlog.bitozenia.com/'

    api = apisauce.create({
        baseURL: 'http://157.230.245.250:8828',
        headers: {
            Authorization: 'Basic ' + encode('admindash:admindash'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        timeout: 30000
    });

    let apiwms = apisauce.create({
        baseURL: url + 'idp/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    let apimaterial = apisauce.create({
        baseURL: url + 'material/',
        headers: {
            'Content-Type': 'application/json',
            // 'DGI-API-KEY': Config.APP_WMS_AUTH_HEADER_VALUE
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4'
        },
        timeout: 30000
    })

    const userAuth = body => apiwms.post('user.auth', body)

    // material => put, get, post, delete
    const getMaterialMaster = body => apimaterial.post('get.material.param.search', body)
    const getCountMaterialMaster = body => apimaterial.post('get.count.material.param.search', body)

    return {
        userAuth,
        getMaterialMaster,
        getCountMaterialMaster
    }
}

export default { create }