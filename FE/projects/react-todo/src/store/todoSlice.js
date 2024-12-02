import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	data: [],
	id: 0,
	filterType: 'ALL',
};

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
