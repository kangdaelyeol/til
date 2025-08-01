import { Provider } from 'react-redux';
import './App.css';
import TodoApp from './components/todo-app';
import { store } from './store';

// 179b

function App() {
	return (
		<>
			<Provider store={store}>
				<TodoApp />
			</Provider>
		</>
	);
}
export default App;
