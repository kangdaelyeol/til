import { PropsWithChildren, useCallback, useState } from 'react';
import './App.css';
import Checkbox from './checkbox';
import TodoInput from './todo-input';

interface Todo {
	id: number;
	text: string;
	done: boolean;
}

function App() {
	return (
		<Layout>
			<TodoContainer />
		</Layout>
	);
}

function Layout({ children }: PropsWithChildren) {
	const [direction, setDirection] = useState<'column' | 'row'>('column');

	console.log('layout rendered');

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: direction,
			}}
		>
			<h1>Todo app</h1>
			<button
				onClick={() =>
					setDirection((prev) => (prev === 'column' ? 'row' : 'column'))
				}
			>
				Change Layout
			</button>
			{children}
		</div>
	);
}

function TodoContainer() {
	const [todos, setTodos] = useState<Todo[]>([]);

	console.log('TodoContainer rendered');

	const addTodo = useCallback((text: string) => {
		setTodos((prev) => {
			return [
				...prev,
				{
					id: prev.length + 1,
					text,
					done: false,
				},
			];
		});
	}, []);

	const toggleTodo = (id: number) => {
		setTodos((prev) => {
			const newTodo = prev.map((todo) => {
				if (todo.id === id) return { ...todo, done: !todo.done };

				return todo;
			});
			return newTodo;
		});
	};

	return (
		<div className=''>
			<TodoInput onAddTodo={addTodo} />
			<ul>
				{todos.map((todo) => {
					return (
						<li key={todo.id}>
							<Checkbox
								id={`todo-${todo.id}`}
								checked={todo.done}
								label={todo.text}
								onChange={() => toggleTodo(todo.id)}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default App;
