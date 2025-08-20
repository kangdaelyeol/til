import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo-slice';
import createSagaMiddleware from 'redux-saga';
import { todoSaga } from './sagas/todo-saga';
import commonReducer from './slices/common-slice';
import { all } from 'redux-saga/effects';
import { commonSaga } from './sagas/common-saga';

const sagaMiddleware = createSagaMiddleware();

function createStore() {
	function* rootSaga() {
		yield all([todoSaga(), commonSaga()]);
	}
	const store = configureStore({
		reducer: {
			todo: todoReducer,
			common: commonReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
	});

	sagaMiddleware.run(rootSaga);

	return store;
}

const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
