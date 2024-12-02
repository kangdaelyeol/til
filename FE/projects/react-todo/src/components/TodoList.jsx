import { useContext } from 'react';
import TodoItem from './TodoItem';
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
		<div className={todoListClassName}>
			<div className={headerClassName}>
				<input
					className='h-[16px] w-[16px]'
					type='checkbox'
					checked={isAllCompleted}
					onChange={(e) =>
						dispatch({
							type: TODO_TOGGLE_ALL,
							payload: { flag: e.target.checked },
						})
					}
				/>
				<p className='grow'>할 일</p>
				{completedCount > 0 && (
					<button
						className={headerButtonClassName}
						onClick={() => dispatch({ type: TODO_DELETE_COMPLETED })}
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

const todoListClassName = `border-[1px] border-solid border-gray-500 rounded-[6px] mt-[16px]`;

const headerClassName = `flex items-center h-[40px] py-0 px-[12px] gap-[12px]`;

const headerButtonClassName = `border-[1px] border-solid border-gray-500 bg-transparent py-[0] px-[12px] text-white shrink-0 h-[30px]`;
