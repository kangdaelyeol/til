import { useEffect, useReducer } from 'react';
import Controls from './components/Controls';
import Layout from './components/Layout';
import Title from './components/Title';
import TodoList from './components/TodoList';

import { TodoProvider } from './context';

function App() {
	

	return (
		<TodoProvider>
			<Layout>
				<Title />
				<Controls />
				<TodoList />
			</Layout>
		</TodoProvider>
	);
}

export default App;
