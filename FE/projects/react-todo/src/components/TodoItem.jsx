import { useState } from 'react';
import './TodoItem.css';
import { useContext } from 'react';
import { TodoContext } from '../context';
import { TODO_DELETE, TODO_EDIT_TEXT, TODO_TOGGLE } from '../reducer';

export default function TodoItem({ text, completed, id }) {
	const { dispatch } = useContext(TodoContext);
	const [edit, setEdit] = useState(false);

	const handleToggleEdit = () => {
		setEdit((prev) => !prev);
	};

	return (
		<div className='todo-item'>
			<input
				onChange={() => dispatch({ type: TODO_TOGGLE, payload: { id } })}
				className='todo-checkbox'
				type='checkbox'
				checked={completed}
			/>

			{edit ? (
				<input
					onChange={(e) =>
						dispatch({
							type: TODO_EDIT_TEXT,
							payload: { id, text: e.target.value },
						})
					}
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
			<button
				onClick={() => dispatch({ type: TODO_DELETE, payload: { id } })}
				className='todo-item-button'
			>
				삭제
			</button>
		</div>
	);
}
