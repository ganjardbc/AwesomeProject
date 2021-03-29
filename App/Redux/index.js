import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import configureStore from './CreateStore';
import rootSaga from '../Sagas/';
import ReduxPersist from '../Config/ReduxPersist';
import { reducer as network } from 'react-native-offline';

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
	test: require('./TestRedux').reducer,
	config: require('./ConfigRedux').reducer,
	auth: require('./AuthRedux').reducer,
	network
});

export default () => {
	let finalReducers = reducers;
	if (ReduxPersist.active) {
		const persistConfig = ReduxPersist.storeConfig;
		finalReducers = persistReducer(persistConfig, reducers);
	}

    let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga);

	if (module.hot) {
		module.hot.accept(() => {
			const nextRootReducer = require('./').reducers;
			store.replaceReducer(nextRootReducer);

			const newYieldedSagas = require('../Sagas').default;
			sagasManager.cancel();
			sagasManager.done.then(() => {
				sagasManager = sagaMiddleware.run(newYieldedSagas);
			});
		});
	}

	return store;
};
