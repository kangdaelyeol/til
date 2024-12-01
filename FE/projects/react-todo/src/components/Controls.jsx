import { useState } from 'react';
import styles from './Controls.module.css';
import { useContext } from 'react';
import { TodoContext } from '../context';
import { TODO_FILTER_TYPE, TODO_SUBMIT } from '../reducer';
import styled from '@emotion/styled';

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
		<Control>
			<Input value={text} onChange={handleChange} type='text' size={1} />
			<Button onClick={handleSubmit}>추가</Button>
			<Select
				value={state.data.filterType}
				onChange={(e) =>
					dispatch({
						type: TODO_FILTER_TYPE,
						payload: { option: e.target.value },
					})
				}
			>
				<option value='ALL'>전체</option>
				<option value='TODO'>할 일</option>
				<option value='COMPLETED'>완료</option>
			</Select>
		</Control>
	);
}

const Control = styled.div`
	display: flex;
	gap: 6px;
	height: 30px;
`;

const Input = styled.input`
	flex-grow: 1;
	border: var(--border-style);
	border-radius: 6px;
	background-color: transparent;
	padding: 4px 12px;
	font-size: 14px;
	line-height: 20px;
	color: white;
`;

const Button = styled.button`
	border: var(--border-style);
	border-radius: 6px;
	background-color: transparent;
	padding: 0 12px;
	color: white;
	flex-shrink: 0;
`;

const Select = styled.select`
	border: var(--border-style);
	border-radius: 6px;
	background-color: transparent;
	padding: 0 12px;
	color: white;
	flex-shrink: 0;
`;
