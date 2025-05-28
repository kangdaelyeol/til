import './App.css';
import TodoApp from './components/todo-app';
import StoreContextProvider from './contexts/store-context';

// 179b

function App() {
	return (
		<>
			<StoreContextProvider>
				<TodoApp />
			</StoreContextProvider>
		</>
	);
}
export default App;
