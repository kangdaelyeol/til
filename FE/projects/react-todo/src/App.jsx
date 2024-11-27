import Controls from './components/Controls';
import Layout from './components/Layout';
import Title from './components/Title';
import TodoList from './components/TodoList';
function App() {
	return (
		<div>
			<Layout>
				<Title />
				<Controls />
				<TodoList />
			</Layout>
		</div>
	);
}

export default App;
