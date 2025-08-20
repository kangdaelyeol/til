import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { Provider as StoreProvider } from 'react-redux';
import store from './store';

function App() { 
	return (
		<>
			<StoreProvider store={store}>
				<RouterProvider router={router} />
			</StoreProvider>
		</>
	);
}
export default App;
