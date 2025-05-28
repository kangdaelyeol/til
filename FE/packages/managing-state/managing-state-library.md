# Jotai

jotai 라이브러리는 zustand 라이브러리와 비슷한 시기에 등장했으며, 상태관리 철학에 관하여 같은 지향점을 가지고 있음.

**Atom**

jotai는 atom이라는 단위를 사용한다.

atom은 상태 데이터의 최소단위다.

atom은 크게 Read-only Atom과 Write-only Atom으로 구분할 수 있다.

- 즉, Atom은 상태(Read-only)의 기능과 리듀서(Write-only)의 기능을 구현한다고 볼 수 있다.

**Store**

atom을 store에 모아서 선언한다.

경우에 따라 atom을 컴포넌트 단에 선언할 수 있다. (취향차이)

atom은 두 인수를 받을 수 있으며, 첫 인수는 getter(read)와 관련되고, 두 번째 인수는 setter(write)에 관한 것이다.

- getter는 단일값을 넘기면 상태값으로 사용되며, 콜백함수를 주는 경우 getter로 사용된다.

setter는 보통 콜백함수를 넘기며 atom을 컨트롤 할 수 있는 get, set, 그리고 UI 단에서 호출되어 넘겨받는 파라미터를 입력받는다.

```tsx
import { atom } from 'jotai'

const todoId = atom(0)

export const todosAtom = atom<Todos[]>([])

export const addTodoAtom(null, (get, set, newTodo: string) => {
	const id = get(todoId) // get을 통해 atom의 상태를 받는다.

	// set을 통해 atom 상태값을 수정한다. 두 번째 파라미터는 setState 처럼 이전 상태(prev)를 받아 제어할 수 있다.
	set(todosAtom, (prev) => ([...prev, {
			id,
			text: newTodo,
		}])
	)

	set(todoId, id + 1)
})
```

**useAtom**

store에서 정의한 atom을 UI단에서 useAtom hook을 통해 가져올 수 있다.

useAtom 훅은 useState처럼 [value, setValue] 형식의 배열을 반환한다.

- value만 정의된 read-only atom은 두 번째 배열 맴버인 setValue 선언을 생략할 수 있다.

setter만 정의된 write-only atom은 간단히 useSetAtom 훅으로 setter만을 가져올 수 있다.

```tsx
import { useAtom } from 'jotai';
import { todosAtom, addTodoAtom } from './store';

export default function TodoApp() {
	const [todos] = useAtom(todosAtom);
	const addTodo = useSetAtom(addTodoAtom); // useSetAtom -> setter부분만 가져옴
	// JSX ...
}
```
