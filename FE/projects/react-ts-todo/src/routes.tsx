// plain object 방식의 router

import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/layout';
import TodoContainer, {
	TodoList,
} from './components/todo-container/todo-container';

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <TodoContainer />,
				children: [
					{
						index: true,
						element: <TodoList />,
					},
					{
						path: 'active',
						element: <TodoList filter='active' />,
					},
					{
						path: 'completed',
						element: <TodoList filter='completed' />,
					},
				],
			},
			{
				path: '/about',
				element: <div>About</div>,
			},
		],
	},
]);

export default router;
