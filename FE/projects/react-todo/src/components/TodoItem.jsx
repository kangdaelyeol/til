import { useState } from 'react';
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
		<div className={todoClassName}>
			<input
				className={checkboxClassName}
				onChange={() => dispatch({ type: TODO_TOGGLE, payload: { id } })}
				type='checkbox'
				checked={completed}
			/>

			{edit ? (
				<input
					className={inputClassName}
					onChange={(e) =>
						dispatch({
							type: TODO_EDIT_TEXT,
							payload: { id, text: e.target.value },
						})
					}
					value={text}
					size={1}
				/>
			) : (
				<p
					className={[
						textClassName,
						completed && 'text-line-decoration: line-through',
					].join(' ')}
				>
					{text}
				</p>
			)}
			<button className={buttonClassName} onClick={handleToggleEdit}>
				수정
			</button>
			<button
				className={buttonClassName}
				onClick={() => dispatch({ type: TODO_DELETE, payload: { id } })}
			>
				삭제
			</button>
		</div>
	);
}

const todoClassName = `flex items-center h-[65px] gap-[12px] py-0 px-[12px]`;

const checkboxClassName = `w-[16px] h-[16px]`;

const inputClassName = `grow-[1] border-[1px] border-gray-500 border-solid bg-transparent py-[4px] px-[12px] text-[14px] text-white leading-[20px]`;

const textClassName = `grow-[1]`;

const buttonClassName = `w-[30px] h-[30px] bg-black text-white cursor-pointer rounded-[10px] shrink-0 transition-[.2s] hover:bg-gray-500`;
