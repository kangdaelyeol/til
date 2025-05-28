import { atom } from 'jotai';
import { Todo } from './components/todo-container';
import { getTodos } from './services/todo-api';

const idAtom = atom(0);

const incrementId = atom(null, (get, set) => {
	set(idAtom, get(idAtom) + 1);
});

export const todosAtom = atom<Todo[]>([]);

export const addTodoAtom = atom(null, (get, set, newTodo: string) => {
	set(todosAtom, (prev) => [
		...prev,
		{
			id: get(idAtom),
			done: false,
			text: newTodo,
		},
	]);
	set(incrementId);
});

export const toggleTodoAtom = atom(null, (_, set, id: number) => {
	set(todosAtom, (prev) =>
		prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
	);
});

export const fetchTodoAtom = atom(null, async (_, set) => {
	const todos = await getTodos();

	if (todos) {
		set(todosAtom, todos);
	}
});
