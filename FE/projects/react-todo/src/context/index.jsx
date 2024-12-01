import { createContext, useEffect, useReducer } from 'react';
import { reducer } from '../reducer';

export const TodoContext = createContext({
	data: [],
	id: 0,
	filterType: 'ALL',
});

export const TodoProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		data: JSON.parse(localStorage.getItem('DATA')),
		id: localStorage.getItem('ID'),
		filterType: localStorage.getItem('FILTER_TYPE'),
	});

	useEffect(() => {
		localStorage.setItem('DATA', JSON.stringify(state.data));
		localStorage.setItem('ID', state.id);
		localStorage.setItem('FILTER_TYPE', state.filterType);
	}, [state]);

	return (
		<TodoContext.Provider value={{ state, dispatch }}>
			{children}
		</TodoContext.Provider>
	);
};
