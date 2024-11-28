import { useState } from 'react';
import './TodoItem.css';

export default function TodoItem({
	text,
	completed,
	id,
	onToggle,
	onDelete,
	onEditText,
}) {
	const [edit, setEdit] = useState(false);

	const handleToggleEdit = () => {
		setEdit((prev) => !prev);
	};

	const handleChange = (e) => {
		onEditText(id, e.target.value);
	};

	return (
		<div className='todo-item'>
			<input
				onChange={() => onToggle(id)}
				className='todo-checkbox'
				type='checkbox'
				checked={completed}
			/>

			{edit ? (
				<input
					onChange={handleChange}
					className='todo-item-input'
					value={text}
					size={1}
				/>
			) : (
				<p className={['todo-item-text', completed && 'completed'].join(' ')}>
					{text}
				</p>
			)}
			<button onClick={handleToggleEdit} className='todo-item-button'>
				수정
			</button>
			<button onClick={() => onDelete(id)} className='todo-item-button'>
				삭제
			</button>
		</div>
	);
}
