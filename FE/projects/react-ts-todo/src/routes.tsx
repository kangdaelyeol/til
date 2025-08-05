// plain object 방식의 router

import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/layout';

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				lazy: async () => {
					const { default: TodoContainer } = await import(
						'./components/todo-container/todo-container'
					);

					return { Component: TodoContainer };
				},

				children: [
					{
						index: true,
						lazy: async () => {
							const { TodoList } = await import(
								'./components/todo-container/todo-container'
							);

							return { Component: TodoList };
						},
					},
					{
						path: '/:filter',
						lazy: async () => {
							const { TodoList } = await import(
								'./components/todo-container/todo-container'
							);

							return { Component: TodoList };
						},
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
