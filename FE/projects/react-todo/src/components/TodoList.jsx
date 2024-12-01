import { useContext } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';
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
		<div className={styles['todo-list']}>
			<div className={styles['todo-header']}>
				<input
					className={styles['todo-checkbox']}
					type='checkbox'
					checked={isAllCompleted}
					onChange={(e) =>
						dispatch({
							type: TODO_TOGGLE_ALL,
							payload: { flag: e.target.checked },
						})
					}
				/>
				<p className={styles['todo-header-text']}>할 일</p>
				{completedCount > 0 && (
					<button
						onClick={() => dispatch({ type: TODO_DELETE_COMPLETED })}
						className={styles['todo-header-button']}
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
