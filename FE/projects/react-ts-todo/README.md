# React Managing state

## Redux

redux의 단점은 초기 셋팅을 위해 익혀야할 boilerplate들이다.

**Flux pattern 기반**

flux pattern은 데이터가 한 방향(단 방향)으로 흐르는 패턴이다.

- **Action** → Reducer → Store → View → **Action**

**Duck pattern**

이러한 리덕스의 문제점을 해결하기 위해 Duck pattern을 사용한다.

edux 구현시 규모가 커지면 코드의 복잡성이 증가하게 되어 관리가 힘들어진다. 이를 극복하기 위해 Duck pattern을 사용한다.

Duck pattern은 Action 타입, Action 생성자(creator), Reducer, Init state를 한 파일에 그룹화하여 모듈화 하는 패턴이다.

이전 리덕스에서는 타입, 생성자, 리듀서, 초기상태 등 관련된 파트가 분해되어 있어 기능 수정시 context-switching 비용이 들었다. 따라서 유지보수에 용이하지 않았다.

### Redux structure

Redux는 기본적으로 slice, store 구조를 가진다.

**slice**

redux/toolkit 라이브러리에서 지원하는 slice는 Redux의 상태관리 단위이며, 관리되는 데이터 모델의 네임스페이스, 초기값, 리듀서를 모두 포함한 단위 개념이다.

일반적으로 slice를 사용하면, slice를 초기화하기 위해 action 타입, action creator, 초기값, 리듀서를 입력하므로 자연스럽게 duck pattern을 사용하게 된다.

- action은 상태 변경을 설명하는 객체이며, action creater는 action을 생성하는 함수다.

- 즉, action creater 호출을 통해 slice에 정의된 reducer에 action 객체가 전달된다.

생성된 slice는 각 reducer이름과 같은 action creater를 포함한다. 이를 destructure assignment를 통해 export하는 것도 duck pattern에 포함된다.

또한 reducer도 slice에 포함되는데, reducer는 default export한다.

```tsx
export const {
	// action creators
} = todoSlice.actions;

export default todoSlice.reducer;
```

**store**

상태 관리를 위한 redux store를 구현한다.

이전에 store를 생성하기 위해 redux 라이브러리 기반의 `createStore` 메서드를 사용했지만, 현재는 redux/toolkit 기반의 `configureStore` 메서드를 사용한다. redux 공식페이지에서도 toolkit 사용을 권장하므로 사실상 표준이라 할 수 있다.

### Redux with TS

**RootState / AppDispatch**

redux를 UI에 사용하기 위해 일반적으로 useSelector() / useReducer() 훅을 사용한다.

하지만 TS의 타입추론이 원활히 통과되기 위해서 selector(rootState)와 dispatch의 타입을 정의해야 한다.

```tsx
/*
 	# RootState와 AppDispatch 보일러플레이트 작성

 	*** RootState ***
	redux store에서 관리되는 State 트리의 타입을 정의하기 위해 RootState 타입을 선언한다.
	useSelector를 통해 redux로부터 전체 상태를 받아오는데, useSelector에서 store의 상태를 받기 위해 내부적으로 store.getState() 메서드를 호출하여 그 반환값을 반환함.
	따라서 ReturnType<T>에서 store.getState를 입력하여, store.getState의 반환값 타입임을 명시하여 redux store가 관리하는 state tree를 받을 수 있도록 함
 
  *** AppDispatch ***
	redux의 dispatch 타입을 지정하기 위해 AppDispatch 타입을 선언한다.
	dispatch 함수를 받기 위해서 useDispatch<T>() 훅을 사용하는데, 제네릭에 넘기는 타입에 개발자가 생성한 store 객체의 dispatch 메서드 타입이라는 것을 명시해야 하기 때문.
*/
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
/*
	그럼 결국 useDispatch<AppDispatch>() 에서 반환되는 dispatch와 store.dispatch는 같은 함수 아닌가?

	- 맞다. 하지만 useDispatch의 dispatch는 redux Context(<Provider store={store}>)를 통해 store를 참조한다.
	- 하지 store.dispatch를 통한 접근은 react-redux의 Provider 컨텍스트를 거치지 않고 store를 직접 참조하므로 데이터 플로우 측면에서 안정적이지 않다.
*/
```

**Typed Hooks**

store에 정의한 RootState와 AppDispatch 타입은 결국 보일러플레이트라고 할 수 있다.

각 타입은 컴포넌트(혹은 컨트롤러 훅)단에서 useSelector와 useDispatch를 호출할 때 타입을 일일히 명시해야 한다. 이는 코드의 복잡성을 증가시킨다.

따라서 해당훅에 대한 타입 네로잉을 캡슐화하여 typed hook을 구현한다.

```tsx
import {
	TypedUseSelectorHook,
	useDispatch as useOriginalDispatch,
	useSelector as useOriginalSelector,
} from 'react-redux';
import { AppDispatch, RootState } from '../store';
/*
  Typed Hook 구현

  useSelector에 입력되는 콜백함수의 selector(state)의 타입과 dispatch의 타입이 TS에서 추론이 잘 되지 않아 따로 명시를 해야한다.

  하지만 코드상에서 매번 타입을 선언하는 보일러플레이트는 비효율적이다.

  따라서 이를 타입 명시를 추가한 훅으로 다시 구현하여 TS에서 타입추론이 원활히 이루어지도록 한다. 이러한 훅을 Typed hook이라고 한다.
*/

export const useSelector: TypedUseSelectorHook<RootState> = useOriginalDispatch;
export const useDispatch: () => AppDispatch = useOriginalDispatch;
```

### Redux middleware

Flux Pattern flow에서 Action 발생시 Reducer 로직 실행 이전 사이의 middleware 지점을 두어(확장해) 추가 기능을 수행할 수 있음.

logging, async API 통신 등 추가할 때 사용했다.

redux-thunk, redux-saga 라이브러리를 통해 redux-middleware를 구현할 수 있다.

- **redux-thunk** 라이브러리는 thunk middleware 개념을 두어 쉽게 비동기 로직을 처리할 수 있는 환경을 제공하지만, 로직이 복잡할 수록 콜백헬이 발생할 수 있으며 코드 흐름 관리가 어려워진다.

- **redux-saga** 는 generator 기반으로 구현되어 있으며, 비동기 로직이 복잡할 때 사용하면 유용하다. 각 로직을 선언적으로 표현하여 가독성이 좋은 코드를 작성할 수 있다. 추가적으로 비동기로직을 쉽게 취소할 수 있다. 하지만 보일러플레이트가 redux-thunk보다 복잡하다.

`Redux-saga`

**saga pattern**

saga는 일련의 트랜젝션 단위를 하나로 묶어 일관성을 유지하려는 saga pattern에서 유래했다.

saga 패턴의 특징은 일련의 과정중 예외상황 발생시 보상 동작(compensation)을 수행하는 것이다.

redux-saga 사용시, 지정한 액션이 수행되면 saga가 action을 가로채어 구현된 미들웨어 로직을 수행한다. 이후 새로운 액션을 주어 리듀서로 넘어갈 수 있게 한다.

**generator**

saga 함수는 generator 기반으로 구현되어있어, yield 키워드를 통해 선언적으로 로직을 표현할 수 있어 가독성에 좋다.

**call / put**

외부 API 요청시 프로미스를 반환하는 API를 사용하므로 call 메서드를 통해 요청하고, 비동기 로직이 모두 수행되었을 때 다음 액션으로 넘어가기 위해 put 메서드를 사용한다.

```tsx
import { call, put, takeLeading } from "redux-saga/effects"

export function* fetchTodoSaga() {
	try{
		const todos: Todo[] = yield call(getTodos) // 외부 API 요청
		yield put(fetchTodoSuccess({ todos }))
	} catch(e) {
		if(e instanceof Error){
			yield put(fetchTodoFailure({ error: e.message }))
		} else {
			yield put(fetchTodoFaulure({ error: 'Unexpected Error'})
		}
	}
}

// takeLeading은 첫 요청만을 수용하고, 요청 처리중 중복된 요청이 오면 무시한다.
export function* todoSaga() {
	yield takeLeading(fetchTodoRequest, fetchTodoSaga)
}
```

**boilerplate - createSagaMiddleware / run / all**

store 부분에도 saga를 적용하기 위한 보일러플레이트를 작성해야 한다.

```tsx
import { createSagaMiddleware } from 'redux-saga';
import { all } from 'redux-saga/effects';

// 1. createSagaMiddleware를 통해 sagaMiddleware객체 생성
const sagaMiddleware = createSagaMiddleware();

function createStore() {
	// 2. rootSaga 메서드 정의, all 메서드는 배열을 받으며 saga 미들웨어를 등록한다.
	// 이 부분에서 all 부분에 watcher saga를 등록해야 해당 saga가 연관된 action이 dispatch되는 경우 이를 감지해 처리할 수 있다.
	function* rootSaga() {
		yield all([todoSaga()]);
	}

	const store = configureStore({
		reducer: {
			todo: todoReducer,
		},
		// 3. configureStore 옵션 부분에 middleware 속성추가.
		// middleware 속성에는 콜백 메서드를 넘길 수 있는데, 여기서 saga 미들웨어를 연결할 수 있는 getDefaultMiddleware 메서드를 제공
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(sagaMiddleware),
	});

	// 4. 최종적으로 sagaMiddleware.run에 설정한 rootSaga 제너레이터를 넘겨서 saga middleware를 활성화함.
	// 해당 메서드를 통해 rootSaga 제너레이터의 all 메서드에 등록된 모든 watcher saga가 실행되며 saga 부분에 takeLeading이 활성화된다.
	sagaMiddleware.run(rootSaga);

	return store;
}
```

## Zustand

독일어로 ‘상태’라는 의미다.

**특징**

redux와 mobx와 비교하여 상대적으로 학습하기 쉽다, 즉 학습 곡선이 낮다.

보일러플레이트가 redux, mobx에 비해 적다.

패키지 크기 자체도 상대적으로 작아서, 가벼운 프로젝트의 상태관리에 적합한 패키지다.

**Hook 기반**

zustand는 hook을 기반으로 설계되어 있어 store선언시 ‘use’ 접두사(prefix)를 붙여주는 컨벤션이 있다.

**Generic Typing**

zustand의 create 메서드를 통해 store를 생성할 수 있다.

store에는 상태(state)와 메서드(setter)를 포함하는데, TS로 선언시, 상태와 메서드 타입을 모두 포함하는 타입을 지정해 캡슐화하는 과정이 필요하다. 따라서 메서드 이중호출이 발생하게 된다.

```tsx
// useStore.ts

import { create } from 'zustand';

interface TodoState {
	todos: Todo[]; // state
	setTodo: (_: string) => void; // setter
	fetchTodo: () => Promise<void>;
}

// 타입 지정
const useStore = create<TodoState>()((set) => ({
	// State ...
}));
```

**set / shallow merge**

create 메서드에 store 객체를 리턴하는 콜백함수를 입력할 수 있다.

입력하는 콜백 메서드의 첫 번째 파라미터로 set 메서드를 입력받는다.

- set 메서드를 통해 상태를 변경할 수 있다.

set 메서드는 setState와 같이 콜백 함수를 입력할 수 있는데, 파라미터 값으로 prev(state)를 받는다.

state파라미터를 받아 객체를 반환하여 상태를 갱신하는데, 원하는 상태값만을 갱신할 수 있다. 이는 zustand 내부적으로 shallow merge `(정확히 shallow merge after shallow copy)` 가 구현되어 있기 때문이다.

shallow merge는 root level 객체(state 객체)에 대한 불변성을 유지한다. 따라서 중첩 객체에 대해서는 개발자가 직접 불변성을 유지해야 한다.

```tsx
const useStore = create<TodoState>()(set => ({
	todos: [],
	user: {name: "", age: 123}
	addTodo: () => {
		// implements ...

		set((state) => ( {
		todos: [...state.todos]
		// 객체 안에 나머지 상태(user) 또는 setter값을 입력하지 않아도 상태 유지(shallow copy + shallow merge)
		} ))
	},
	toggleTodo: () => {
		// implements ...
	}
	// State ...
}))
```
