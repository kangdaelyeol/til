import Checkbox from '../checkbox';
import TodoInput from '../todo-input';
import { useDispatch } from 'react-redux';
import { fetchTodoRequest } from '../../slices/todo-slice';
import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import './todo-container.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos } from '../../services/todo-api';
export interface Todo {
	id: number;
	text: string;
	done: boolean;
}

export default function TodoContainerWithQuery() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodoRequest());
	}, [dispatch]);

	return (
		<div className=''>
			<TodoInput />
			<div className=''>
				<NavLink
					className={({ isActive }) =>
						`todo-container__link ${isActive && 'todo-container__link--active'}`
					}
					to=''
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
					to=''
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
					to=''
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

export const TodoListWithQuery = () => {
	const location = useLocation();

	const filter = location.state?.filter ?? 'all';

	const { isLoading, data: todos = [] } = useQuery({
		queryKey: ['todos', filter],
		queryFn: async () => {
			const todos = await getTodos();
			return filterTodos(todos, filter);
		},
		staleTime: 1000 * 60, // 데이터 유효기간 시간 지나면 데이터 새로 요청
		gcTime: 1000 * 60 * 5, // 캐싱된 데이터가 버려지는 시간
	});

	// const filteredTodos = useSelector((state: RootState) => {
	// 	return filterTodos(state.todo.todos, filter);
	// });

	const queryClient = useQueryClient();

	const handleToggleTodo = (id: number) => {
		queryClient.setQueryData(['todos', filter], (todos: Todo[]) =>
			todos.map((todo) =>
				todo.id === id ? { ...todo, done: !todo.done } : todo
			)
		);
	};

	return isLoading ? (
		<div>Loading...</div>
	) : (
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
	);
};

function filterTodos(todos: Todo[], filter: 'all' | 'active' | 'completed') {
	if (todos.length === 0) return todos;

	if (filter === 'active') {
		return todos.filter((todo) => !todo.done);
	} else if (filter == 'completed') {
		return todos.filter((todo) => todo.done);
	}

	return todos;
}
