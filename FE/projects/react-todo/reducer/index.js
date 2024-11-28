export const TODO_SUBMIT = 'todoSubmit';
export const TODO_DELETE = 'todoDelete';
export const TODO_DELETE_COMPLETED = 'todoDeleteCompleted';
export const TODO_TOGGLE = 'todoToggle';
export const TODO_TOGGLE_ALL = 'todoToggleAll';
export const TODO_EDIT_TEXT = 'todoEditText';
export const TODO_FILTER_TYPE = 'todoFilterType';

export const reducer = (state, action) => {
	switch (action.type) {
		case TODO_SUBMIT:
			return {
				...state,
				data: state.data.concat({
					text: action.text,
					id: state.id,
					conpleted: false,
				}),
				id: state.id + 1,
			};
		case TODO_DELETE:
			return {
				...state,
				data: state.data.filter((item) => item.id !== action.id),
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
					item.id === action.id ? { ...item, completed: !item.completed } : item
				),
			};
		case TODO_TOGGLE_ALL:
			return {
				...state,
				data: state.data.map((item) => ({ ...item, completed: action.flag })),
			};
		case TODO_EDIT_TEXT:
			return {
				...state,
				data: state.data.map((item) =>
					item.id === action.id ? { ...item, text: action.text } : item
				),
			};
		case TODO_FILTER_TYPE:
			return {
				...state,
				filterType: action.option,
			};
		default:
			return state;
	}
};
