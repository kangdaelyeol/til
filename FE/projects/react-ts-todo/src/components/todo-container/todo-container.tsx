import Checkbox from '../checkbox';
import TodoInput from '../todo-input';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodoRequest, toggleTodo } from '../../slices/todo-slice';
import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export interface Todo {
	id: number;
	text: string;
	done: boolean;
}

export default function TodoContainer() {
	const dispatch = useDispatch();

	const onAddTodo = (todo: string) => {
		dispatch(addTodo({ todo }));
	};

	useEffect(() => {
		dispatch(fetchTodoRequest());
	}, [dispatch]);

	return (
		<div className=''>
			<TodoInput onAddTodo={onAddTodo} />
			<div className=''>
				<NavLink to='/'>all</NavLink>
				<NavLink to='/active'>active</NavLink>
				<NavLink to='/completed'>completed</NavLink>
			</div>
			<Outlet />
		</div>
	);
}

interface TodoListProps {
	filter?: 'all' | 'active' | 'completed';
}

export const TodoList = ({ filter }: TodoListProps) => {
	const { todos } = useSelector((state: RootState) => state.todo);

	const dispatch = useDispatch();

	const onToggleTodo = (id: number) => {
		dispatch(toggleTodo({ id }));
	};

	const filteredTodos = filterTodos(todos, filter);

	return (
		<ul>
			{filteredTodos.map((todo) => {
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

function filterTodos(todos: Todo[], filter: TodoListProps['filter']) {
	if (filter === 'active') {
		return todos.filter((todo) => !todo.done);
	} else if (filter == 'completed') {
		return todos.filter((todo) => todo.done);
	}

	return todos;
}
