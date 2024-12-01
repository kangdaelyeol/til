import { useContext } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import { TodoContext } from '../context';
import { TODO_DELETE_COMPLETED, TODO_TOGGLE_ALL } from '../reducer';

export default function TodoList() {
	const { state, dispatch } = useContext(TodoContext);

	const completedCount = state.data.filter((item) => item.completed).length;

	const filteredList = state.data.filter((item) => {
		switch (state.filterType) {
			case 'TODO':
				return !item.completed;
			case 'COMPLETED':
				return item.completed;
			case 'ALL':
				return true;
		}
	});

	const isAllCompleted =
		filteredList.length > 0 && filteredList.every((item) => item.completed);
	return (
		<div className='todo-list'>
			<div className='todo-header'>
				<input
					className='todo-checkbox'
					type='checkbox'
					checked={isAllCompleted}
					onChange={(e) =>
						dispatch({
							type: TODO_TOGGLE_ALL,
							payload: { flag: e.target.checked },
						})
					}
				/>
				<p className='todo-header-text'>할 일</p>
				{completedCount > 0 && (
					<button
						onClick={() => dispatch({ type: TODO_DELETE_COMPLETED })}
						className='todo-header-button'
					>
						{completedCount}개 선택 삭제
					</button>
				)}
			</div>
			<div>
				{filteredList.map((item) => (
					<TodoItem key={item.id} {...item} />
				))}
			</div>
		</div>
	);
}
