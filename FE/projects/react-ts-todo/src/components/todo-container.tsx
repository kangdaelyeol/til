import { useEffect } from 'react';
import Checkbox from './checkbox';
import TodoInput from './todo-input';
import { observer } from 'mobx-react-lite';
import useStore from '../use-store';

export interface Todo {
	id: number;
	text: string;
	done: boolean;
}

const TodoContainer = observer(function () {
	const { todos, addTodo, toggleTodo, fetchTodo } = useStore();

	useEffect(() => {
		fetchTodo();
	}, [fetchTodo]);

	return (
		<div className=''>
			<TodoInput onAddTodo={addTodo} />
			<TodoList todos={todos} onToggleTodo={toggleTodo} />
		</div>
	);
});

interface TodoListProps {
	todos: Todo[];
	onToggleTodo: (_: number) => void;
}

const TodoList = observer(function ({ todos, onToggleTodo }: TodoListProps) {
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
});

export default TodoContainer;
