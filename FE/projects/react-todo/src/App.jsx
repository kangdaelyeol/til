import { useState, useRef } from 'react';
import Controls from './components/Controls';
import Layout from './components/Layout';
import Title from './components/Title';
import TodoList from './components/TodoList';
function App() {
	const idRef = useRef(0);
	const [data, setData] = useState([]);
	const [filterType, setFilterType] = useState('ALL');

	const handleSubmit = (text) => {
		setData((prev) =>
			prev.concat({
				id: (idRef.current += 1),
				text,
				completed: false,
			})
		);
	};

	const handleFilterType = (type) => {
		setFilterType(type);
	};

	const handleDelete = (id) => {
		setData((prev) => prev.filter((item) => item.id !== id));
	};

	const handleDeleteCompleted = () => {
		setData((prev) => prev.filter((item) => !item.completed));
	};

	const handleToggle = (id) => {
		setData((prev) =>
			prev.map((item) =>
				item.id === id ? { ...item, completed: !item.completed } : item
			)
		);
	};

	const handleToggleAll = (flag) => {
		setData((prev) => prev.map((item) => ({ ...item, completed: flag })));
	};

	const handleEditText = (id, text) => {
		setData((prev) =>
			prev.map((item) => (item.id === id ? { ...item, text } : item))
		);
	};

	const filteredList = data.filter((item) => {
		if (filterType === 'ALL') return true;
		else if (filterType === 'TODO') return !item.completed;
		else return item.completed;
	});

	return (
		<div>
			<Layout>
				<Title />
				<Controls
					onSubmit={handleSubmit}
					filterType={filterType}
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
