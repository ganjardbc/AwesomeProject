import { takeLatest, takeEvery, all, take, fork } from 'redux-saga/effects';
import { AuthTypes } from '../Redux/AuthRedux';
import { getAuth } from './AuthSagas';
import API from '../Services/Api';

const mainApi = API.create();

export default function* root() {
	yield all([
		takeLatest(AuthTypes.AUTH_REQUEST, getAuth, mainApi)
	]);
}