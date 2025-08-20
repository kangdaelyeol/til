import { PayloadAction } from '@reduxjs/toolkit';
import { login as loginApi } from '../services/user-api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { login, setUser } from '../slices/common-slice';

function* loginSaga(
	action: PayloadAction<{ username: string; password: string }>
) {
	// login logic
	const user: { username: string } = yield call(
		loginApi,
		action.payload.username,
		action.payload.password
	);

	yield put(setUser(user));
}

export function* commonSaga() {
	yield takeLatest(login, loginSaga);
}
