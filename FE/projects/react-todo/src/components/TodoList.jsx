import TodoItem from './TodoItem';
import './TodoList.css';

export default function TodoList({
	data,
	onToggle,
	onToggleAll,
	onDelete,
	onDeleteCompleted,
	onEditText
}) {
	const isAllCompleted =
		data.length > 0 && data.every((item) => item.completed);
	const completedCount = data.filter((item) => item.completed).length;
	return (
		<div className='todo-list'>
			<div className='todo-header'>
				<input
					className='todo-checkbox'
					type='checkbox'
					checked={isAllCompleted}
					onChange={(e) => onToggleAll(e.target.checked)}
				/>
				<p className='todo-header-text'>할 일</p>
				{completedCount > 0 && (
					<button onClick={onDeleteCompleted} className='todo-header-button'>
						{completedCount}개 선택 삭제
					</button>
				)}
			</div>
			<div>
				{data.map((item) => (
					<TodoItem
						onDelete={onDelete}
						onToggle={onToggle}
						key={item.id}
						{...item}
						onEditText={onEditText}
					/>
				))}
			</div>
		</div>
	);
}
