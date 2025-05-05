import { useState } from 'react';
import './App.css';
import Checkbox from './components/checkbox';
import TodoInput from './components/todo-input';

interface Todo {
	id: number;
	text: string;
	done: boolean;
}

function App() {
	console.log('App rendered');
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodo = (text: string) => {
		setTodos((prev) => {
			return [
				...prev,
				{
					id: todos.length + 1,
					text,
					done: false,
				},
			];
		});
	};

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
