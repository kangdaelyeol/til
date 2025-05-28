import Checkbox from './checkbox';
import TodoInput from './todo-input';
import {
	addTodoAtom,
	fetchTodoAtom,
	todosAtom,
	toggleTodoAtom,
} from '../store';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
export interface Todo {
	id: number;
	text: string;
	done: boolean;
}

export default function TodoContainer() {
	const [todos] = useAtom(todosAtom);
	const addTodo = useSetAtom(addTodoAtom);
	const toggleTodo = useSetAtom(toggleTodoAtom);
	const fetchTodo = useSetAtom(fetchTodoAtom);

	useEffect(() => {
		fetchTodo();
	}, [fetchTodo]);

	return (
		<div className=''>
			<TodoInput onAddTodo={addTodo} />
			<TodoList todos={todos} onToggleTodo={toggleTodo} />
		</div>
	);
}

interface TodoListProps {
	todos: Todo[];
	onToggleTodo: (_: number) => void;
}

const TodoList = ({ todos, onToggleTodo }: TodoListProps) => {
	return (
		<ul>
			{todos.map((todo) => {
				return (
					<li key={todo.id}>
						<Checkbox
							id={`todo-${todo.id}`}
							checked={todo.done}
							label={todo.text}
							onChange={() => onToggleTodo(todo.id)}
						/>
					</li>
				);
			})}
		</ul>
	);
};
