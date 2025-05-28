import { create } from 'zustand';
import { Todo } from './components/todo-container';
import { getTodos } from './services/todo-api';

interface TodoState {
	todos: Todo[];
	addTodo: (_: string) => void;
	toggleTodo: (_: number) => void;
	fetchTodo: () => Promise<void>;
}

const useStore = create<TodoState>()((set) => ({
	todos: [],
	addTodo: (newTodo: string) => {
		set((state) => ({
			todos: [
				...state.todos,
				{
					id: Date.now(),
					text: newTodo,
					done: false,
				},
			],
		}));
	},
	toggleTodo: (id: number) => {
		set((state) => ({
			todos: state.todos.map((todo) =>
				todo.id === id ? { ...todo, done: !todo.done } : todo
			),
		}));
	},
	fetchTodo: async () => {
		const todos = await getTodos();
		set(() => ({
			todos,
		}));
	},
}));

export default useStore;
