import Checkbox from './checkbox';
import TodoInput from './todo-input';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodoRequest, toggleTodo } from '../slices/todo-slice';
import { useEffect } from 'react';
export interface Todo {
	id: number;
	text: string;
	done: boolean;
}

export default function TodoContainer() {
	const todo = useSelector((state: RootState) => state.todo);
	const dispatch = useDispatch();

	const onAddTodo = (todo: string) => {
		dispatch(addTodo({ todo }));
	};

	const onToggleTodo = (id: number) => {
		dispatch(toggleTodo({ id }));
	};

	useEffect(() => {
		dispatch(fetchTodoRequest());
	}, [dispatch]);

	return (
		<div className=''>
			<TodoInput onAddTodo={onAddTodo} />
			<TodoList todos={todo.todos} onToggleTodo={onToggleTodo} />
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
