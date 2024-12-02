import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

export const initialState = {
	data: [],
	id: 0,
	filterType: 'ALL',
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const res = await api.get('/todos');
	return res.data;
});

export const createTodoThunk = createAsyncThunk(
	'todos/createTodoThunk',
	async ({ text }) => {
		const res = await api.post('/todos', {
			id: Date.now().toString(),
			text,
			completed: false,
		});

		return res.data;
	}
);

export const deleteTodoThunk = createAsyncThunk(
	'todos/deleteTodoThunk',
	async ({ id }) => {
		await api.delete(`/todos/${id}`);

		return id;
	}
);

export const deleteTodoCompletedThunk = createAsyncThunk(
	'todos/deleteTodoCompletedThunk',
	async () => {
		const { data: completedTodoList } = await api.get('/todos?completed=true');

		await Promise.all(
			completedTodoList.map((item) => api.delete(`todos/${item.id}`))
		);
	}
);

export const toggleTodoThunk = createAsyncThunk(
	'todos/toggleTodoThunk',
	async ({ id, completed }) => {
		const res = await api.patch(`/todos/${id}`, { completed });

		return res.data;
	}
);

export const updateTodoThunk = createAsyncThunk(
	'todos/updateTodoThunk',
	async ({ id, text }) => {
		const res = await api.patch(`/todos/${id}`, {
			text,
		});
		return res.data;
	}
);

export const toggleTodoAllThunk = createAsyncThunk(
	'todos/toggleTodoAllThunk',
	async ({ flag }) => {
		const { data } = await api.get('/todos/');
		await Promise.all(
			data.map((item) => api.patch(`/todos/${item.id}`, { completed: flag }))
		);
		return flag;
	}
);
export const todoSlice = createSlice({
	name: 'todo',
	initialState,
	reducers: {
		addTodo: (state, action) => {
			state.data = state.data.concat({
				text: action.payload.text,
				id: state.id,
				completed: false,
			});
			state.id += 1;
		},
		deleteTodo: (state, action) => {
			state.data = state.data.filter((item) => item.id !== action.payload.id);
		},
		deleteCompletedTodo: (state) => {
			state.data = state.data.filter((item) => !item.completed);
		},
		toggleTodo: (state, action) => {
			state.data = state.data.map((item) =>
				item.id === action.payload.id
					? { ...item, completed: !item.completed }
					: item
			);
		},
		toggleTodoAll: (state, action) => {
			state.data = state.data.map((item) => ({
				...item,
				completed: action.payload.flag,
			}));
		},
		updateTodo: (state, action) => {
			state.data = state.data.map((item) =>
				item.id === action.payload.id
					? { ...item, text: action.payload.text }
					: item
			);
		},
		setFilter: (state, action) => {
			state.filterType = action.payload.option;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.data = action.payload;
			})
			.addCase(createTodoThunk.fulfilled, (state, action) => {
				state.data.push(action.payload);
			})
			.addCase(deleteTodoThunk.fulfilled, (state, action) => {
				state.data = state.data.filter((item) => item.id !== action.payload);
			})
			.addCase(toggleTodoThunk.fulfilled, (state, action) => {
				state.data = state.data.map((item) =>
					item.id === action.payload.id ? action.payload : item
				);
			})
			.addCase(updateTodoThunk.fulfilled, (state, action) => {
				state.data = state.data.map((item) =>
					item.id === action.payload.id ? action.payload : item
				);
			})
			.addCase(deleteTodoCompletedThunk.fulfilled, (state) => {
				state.data = state.data.filter((item) => !item.completed);
			})
			.addCase(toggleTodoAllThunk.fulfilled, (state, action) => {
				state.data = state.data.map((item) => ({
					...item,
					completed: action.payload,
				}));
			});
	},
});
/*
export const reducer = (state, action) => {
	switch (action.type) {
		case TODO_SUBMIT:
			return {
				...state,
				data: state.data.concat({
					text: action.payload.text,
					id: state.id,
					completed: false,
				}),
				id: state.id + 1,
			};
		case TODO_DELETE:
			return {
				...state,
				data: state.data.filter((item) => item.id !== action.payload.id),
			};
		case TODO_DELETE_COMPLETED:
			return {
				...state,
				data: state.data.filter((item) => !item.completed),
			};
		case TODO_TOGGLE:
			return {
				...state,
				data: state.data.map((item) =>
					item.id === action.payload.id
						? { ...item, completed: !item.completed }
						: item
				),
			};
		case TODO_TOGGLE_ALL:
			return {
				...state,
				data: state.data.map((item) => ({
					...item,
					completed: action.payload.flag,
				})),
			};
		case TODO_EDIT_TEXT:
			return {
				...state,
				data: state.data.map((item) =>
					item.id === action.payload.id
						? { ...item, text: action.payload.text }
						: item
				),
			};
		case TODO_FILTER_TYPE:
			return {
				...state,
				filterType: action.payload.option,
			};
		default:
			return state;
	}
};
*/

export const {
	addTodo,
	deleteTodo,
	deleteCompletedTodo,
	toggleTodo,
	toggleTodoAll,
	updateTodo,
	setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
