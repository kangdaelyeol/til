import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, setFilter } from '../store/todoSlice';

export default function Controls() {
	const state = useSelector((state) => state.todo);
	const dispatch = useDispatch();

	const [text, setText] = useState('');

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = () => {
		dispatch(addTodo({ text }));
		setText('');
	};

	return (
		<div className={controlClassName}>
			<input
				className={inputClassName}
				value={text}
				onChange={handleChange}
				type='text'
				size={1}
			/>
			<button className={buttonClassName} onClick={handleSubmit}>
				추가
			</button>
			<select
				className={selectClassName}
				value={state.data.filterType}
				onChange={(e) => dispatch(setFilter({ option: e.target.value }))}
			>
				<option value='ALL'>전체</option>
				<option value='TODO'>할 일</option>
				<option value='COMPLETED'>완료</option>
			</select>
		</div>
	);
}

const controlClassName = `flex gap-[6px] h-[30px]`;

const inputClassName = `grow border-[1px] border-gray-500 border-solid rounded-[6px] bg-transparent py-[4px] px-[12px] text-[14px] text-white leading-[20px]`;

const buttonClassName = `border-[1px] border-gray-500 border-solid rounded-[6px] bg-transparent py-0 px-[12px] text-white shrink-0`;

const selectClassName = `border-[1px] border-solid border-gray-500 rounded-[6px] bg-transparent py-0 px-[12px] text-white shrink-0`;
