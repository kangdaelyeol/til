import { useState } from 'react';
import './Controls.css';

export default function Controls({ onSubmit, filterType, onChangeFilterType }) {
	const [text, setText] = useState('');

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = () => {
		onSubmit(text);
		setText('');
	};

	return (
		<div className='controls'>
			<input
				value={text}
				onChange={handleChange}
				type='text'
				className='input'
				size={1}
			/>
			<button onClick={handleSubmit} className='button'>
				추가
			</button>
			<select
			value={filterType}
				onChange={(e) => onChangeFilterType(e.target.value)}
				className='select'
			>
				<option value='ALL'>전체</option>
				<option value='TODO'>할 일</option>
				<option value='COMPLETED'>완료</option>
			</select>
		</div>
	);
}
