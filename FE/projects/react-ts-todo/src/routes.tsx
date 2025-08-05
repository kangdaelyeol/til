// plain object 방식의 router

import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/layout/layout';
import Login from './components/login';
import { PropsWithChildren } from 'react';
import { userAtom } from './store';
import { useAtomValue } from 'jotai';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
	const user = useAtomValue(userAtom);

	if (!user) {
		return <Navigate to='/login' replace />;
	}

	return children;
};

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
			{
				path: '/protected',
				// loader: async () => {
				// 	try {
				// 		const user = await getUser();
				// 		return { user };
				// 	} catch {
				// 		return redirect('/login');
				// 	}
				// },
				element: (
					<ProtectedRoute>
						<div>protected</div>
					</ProtectedRoute>
				),
			},
			{
				path: '/login',
				element: <Login />,
			},
		],
	},
]);

export default router;
