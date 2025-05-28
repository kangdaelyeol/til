# Zustand

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
