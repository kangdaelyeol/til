import { useEffect, useReducer } from 'react';
import Controls from './components/Controls';
import Layout from './components/Layout';
import Title from './components/Title';
import TodoList from './components/TodoList';
import {
	reducer,
	TODO_SUBMIT,
	TODO_DELETE,
	TODO_DELETE_COMPLETED,
	TODO_TOGGLE,
	TODO_TOGGLE_ALL,
	TODO_EDIT_TEXT,
	TODO_FILTER_TYPE,
} from '../reducer';
function App() {
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

	const handleSubmit = (text) => {
		dispatch({ type: TODO_SUBMIT, text });
	};

	const handleFilterType = (option) => {
		dispatch({ type: TODO_FILTER_TYPE, option });
	};

	const handleDelete = (id) => {
		dispatch({ type: TODO_DELETE, id });
	};

	const handleDeleteCompleted = () => {
		dispatch({ type: TODO_DELETE_COMPLETED });
	};

	const handleToggle = (id) => {
		dispatch({ type: TODO_TOGGLE, id });
	};

	const handleToggleAll = (flag) => {
		dispatch({ type: TODO_TOGGLE_ALL, flag });
	};

	const handleEditText = (id, text) => {
		dispatch({ type: TODO_EDIT_TEXT, id, text });
	};

	const filteredList = state.data.filter((item) => {
		if (state.filterType === 'ALL') return true;
		else if (state.filterType === 'TODO') return !item.completed;
		else return item.completed;
	});

	return (
		<div>
			<Layout>
				<Title />
				<Controls
					onSubmit={handleSubmit}
					filterType={state.filterType}
					onChangeFilterType={handleFilterType}
				/>
				<TodoList
					onToggleAll={handleToggleAll}
					onToggle={handleToggle}
					onDelete={handleDelete}
					onDeleteCompleted={handleDeleteCompleted}
					onEditText={handleEditText}
					data={filteredList}
				/>
			</Layout>
		</div>
	);
}

export default App;
