import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todo-slice';
import { all } from 'redux-saga/effects';
import { todoSaga } from './sagas/todo-saga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

function createStore() {
	function* rootSaga() {
		yield all([todoSaga()]);
	}

	const store = configureStore({
		reducer: {
			// useSelector에서 관리되는 상태의 키값 (state => state.todo)
			todo: todoReducer,
		},
		middleware: (getDefaultMiddleWare) =>
			getDefaultMiddleWare().concat(sagaMiddleware),
	});

	sagaMiddleware.run(rootSaga);

	return store;
}

// store 모듈 내에서 store 객체를 생성하고 default export 하여 store가 singleton으로 동작하도록 구현
const store = createStore();

export default store;

/*
 	# RootState와 AppDispatch 보일러플레이트 작성

 	*** RootState ***
	redux store에서 관리되는 State 트리의 타입을 정의하기 위해 RootState 타입을 선언한다.
	useSelector를 통해 redux로부터 전체 상태를 받아오는데, useSelector에서 store의 상태를 받기 위해 내부적으로 store.getState() 메서드를 호출하여 그 반환값을 반환함.
	따라서 ReturnType<T>에서 store.getState를 입력하여, store.getState의 반환값 타입임을 명시하여 redux store가 관리하는 상태 트리를 받을 수 있도록 함
 
  *** AppDispatch ***
	redux의 dispatch 타입을 지정하기 위해 AppDispatch 타입을 선언한다.
	dispatch 함수를 받기 위해서 useDispatch<T>() 훅을 사용하는데, 제네릭에 넘기는 타입에 개발자가 생성한 스토어의 dispatch 타입이라는 것을 명시해야 하기 때문.
*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/*
	그럼 결국 useDispatch<AppDispatch>() 에서 반환되는 dispatch와 store.dispatch는 같은 함수 아닌가?

	- 맞다. 하지만 useDispatch의 dispatch는 redux Context(<Provider store={store}>)를 통해 store를 참조한다.
	- 하지 store.dispatch를 통한 접근은 react-redux의 Provider 컨텍스트를 거치지 않고 store를 직접 참조하므로 데이터 플로우 측면에서 안정적이지 않다.
*/
