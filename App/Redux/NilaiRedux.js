import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
    setNilai: ['data'],
    resetNilai: []
});

export default Creators;

export const INITIAL_STATE = Immutable({
    nilai: 0
});

export const setNilai = function (state, data) {
    return state.merge({
        nilai: data.data
    })
}

export const resetNilai = function (state) {
    return state.merge({
        nilai: 0
    })
}

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_NILAI]: setNilai,
    [Types.RESET_NILAI]: resetNilai
})