import { call, put, takeLeading } from 'redux-saga/effects';
import {
	fetchTodoFailure,
	fetchTodoRequest,
	fetchTodoSuccess,
} from '../slices/todo-slice';
import { getTodos } from '../services/todo-api';
import { Todo } from '../components/todo-container/todo-container';

export function* fetchTodoSaga() {
	try {
		const todos: Todo[] = yield call(getTodos);
		yield put(fetchTodoSuccess({ todos }));
	} catch (error) {
		if (error instanceof Error) {
			yield put(fetchTodoFailure({ error: error.message }));
		} else {
			yield put(fetchTodoFailure({ error: 'Unexpected error' }));
		}
	}
}

export function* todoSaga() {
	yield takeLeading(fetchTodoRequest, fetchTodoSaga);
}
