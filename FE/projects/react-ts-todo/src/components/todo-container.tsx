import { useCallback, useEffect } from 'react';
import Checkbox from './checkbox';
import TodoInput from './todo-input';
import { useDispatch, useSelector } from '../hooks/useRedux';
import { addTodo, fetchTodoRequest, toggleTodo } from '../slices/todo-slice';

export interface Todo {
	id: number;
	text: string;
	done: boolean;
}

export default function TodoContainer() {
	const todos = useSelector((state) => state.todo.todos);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodoRequest());
	}, [dispatch]);

	const handleAddTodo = useCallback(
		(newTodo: string) => {
			dispatch(addTodo({ todo: newTodo }));
		},
		[dispatch]
	);

	const handleToggleTodo = (id: number) => {
		dispatch(toggleTodo({ id }));
	};

	return (
		<div className=''>
			<TodoInput onAddTodo={handleAddTodo} />
			<ul>
				{todos.map((todo) => {
					return (
						<li key={todo.id}>
							<Checkbox
								id={`todo-${todo.id}`}
								checked={todo.done}
								label={todo.text}
								onChange={() => handleToggleTodo(todo.id)}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
