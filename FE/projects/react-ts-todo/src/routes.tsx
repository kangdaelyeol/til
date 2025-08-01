// plain object 방식의 router

import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout';
import TodoContainer from './components/todo-container';

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <TodoContainer />,
			},
			{
				path: '/about',
				element: <div>About</div>,
			},
		],
	},
]);

export default router;
