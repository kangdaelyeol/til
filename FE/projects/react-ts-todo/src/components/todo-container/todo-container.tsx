import Checkbox from '../checkbox';
import TodoInput from '../todo-input';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodoRequest, toggleTodo } from '../../slices/todo-slice';
import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './todo-container.css';
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
				<NavLink
					className={({ isActive }) =>
						`todo-container__link ${isActive && 'todo-container__link--active'}`
					}
					to='/'
					state={{
						filter: 'all',
					}}
				>
					all
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`todo-container__link ${isActive && 'todo-container__link--active'}`
					}
					to='/'
					replace
					state={{
						filter: 'active',
					}}
				>
					active
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`todo-container__link ${isActive && 'todo-container__link--active'}`
					}
					to='/'
					state={{
						filter: 'completed',
					}}
				>
					completed
				</NavLink>
			</div>
			<Outlet />
		</div>
	);
}

export const TodoList = () => {
	const location = useLocation();

	const filter = location.state?.filter ?? 'all';

	const filteredTodos = useSelector((state: RootState) => {
		return filterTodos(state.todo.todos, filter);
	});

	const dispatch = useDispatch();

	const onToggleTodo = (id: number) => {
		dispatch(toggleTodo({ id }));
	};

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

function filterTodos(todos: Todo[], filter: 'all' | 'active' | 'completed') {
	console.log(todos);
	if (todos.length === 0) return todos;

	if (filter === 'active') {
		return todos.filter((todo) => !todo.done);
	} else if (filter == 'completed') {
		return todos.filter((todo) => todo.done);
	}

	return todos;
}
