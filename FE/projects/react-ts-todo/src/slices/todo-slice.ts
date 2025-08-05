import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../components/todo-container/todo-container';

interface TodoState {
	todos: Todo[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: TodoState = {
	todos: [],
	status: 'idle',
	error: null,
};

const todoSlice = createSlice({
	name: 'todo', // slice 이름, 상태 데이터를 구분하는 네임스페이스로 활용됨
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<{ todo: string }>) => {
			state.todos.push({
				id: state.todos.length + 1,
				text: action.payload.todo,
				done: false,
			});
		},
		toggleTodo: (state, action: PayloadAction<{ id: number }>) => {
			const todo = state.todos.find((todo) => todo.id === action.payload.id);

			if (todo) {
				todo.done = !todo.done;
			}
		},
		fetchTodoRequest: (state) => {
			state.status = 'loading';
		},
		fetchTodoSuccess: (state, action: PayloadAction<{ todos: Todo[] }>) => {
			state.status = 'succeeded';
			state.todos = action.payload.todos;
		},
		fetchTodoFailure: (state, action: PayloadAction<{ error: string }>) => {
			state.status = 'failed';
			state.error = action.payload.error;
		},
	},
});

// Duck pattern에서 action creater는 함수 형태로 export 되어야 하기 때문에 구조분해 export를 하고, 리듀서는 default export한다.
export const {
	addTodo,
	toggleTodo,
	fetchTodoSuccess,
	fetchTodoFailure,
	fetchTodoRequest,
} = todoSlice.actions;

export default todoSlice.reducer;
