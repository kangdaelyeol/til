import { useState } from 'react';
import styles from './Controls.module.css';
import { useContext } from 'react';
import { TodoContext } from '../context';
import { TODO_FILTER_TYPE, TODO_SUBMIT } from '../reducer';

export default function Controls() {
	const { state, dispatch } = useContext(TodoContext);

	const [text, setText] = useState('');

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = () => {
		dispatch({ type: TODO_SUBMIT, payload: { text } });
		setText('');
	};

	return (
		<div className={styles['controls']}>
			<input
				value={text}
				onChange={handleChange}
				type='text'
				className={styles['input']}
				size={1}
			/>
			<button onClick={handleSubmit} className={styles['button']}>
				추가
			</button>
			<select
				value={state.data.filterType}
				onChange={(e) =>
					dispatch({
						type: TODO_FILTER_TYPE,
						payload: { option: e.target.value },
					})
				}
				className={styles['select']}
			>
				<option value='ALL'>전체</option>
				<option value='TODO'>할 일</option>
				<option value='COMPLETED'>완료</option>
			</select>
		</div>
	);
}
