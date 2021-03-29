import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
    addData: ['data'],
    removeData: []
});

export default Creators;

export const INITIAL_STATE = Immutable({
    nilai: ''
});

export const ConfigSelectors = {
	getData: state => state.nilai
};

export const addData = function (state, data) {
    return state.merge({
        nilai: data.data
    })
}

export const removeData = function (state) {
    return state.merge({
        nilai: ''
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.ADD_DATA]: addData,
    [Types.REMOVE_DATA]: removeData
});
