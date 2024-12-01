import { useState } from 'react';
import styles from './TodoItem.module.css';
import { useContext } from 'react';
import { TodoContext } from '../context';
import { TODO_DELETE, TODO_EDIT_TEXT, TODO_TOGGLE } from '../reducer';
import styled from '@emotion/styled';

export default function TodoItem({ text, completed, id }) {
	const { dispatch } = useContext(TodoContext);
	const [edit, setEdit] = useState(false);

	const handleToggleEdit = () => {
		setEdit((prev) => !prev);
	};

	return (
		<Component>
			<Checkbox
				onChange={() => dispatch({ type: TODO_TOGGLE, payload: { id } })}
				type='checkbox'
				checked={completed}
			/>

			{edit ? (
				<Input
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
				<Text>{text}</Text>
			)}
			<Button onClick={handleToggleEdit}>수정</Button>
			<Button onClick={() => dispatch({ type: TODO_DELETE, payload: { id } })}>
				삭제
			</Button>
		</Component>
	);
}

const Component = styled.div`
	display: flex;
	align-items: center;
	height: 65px;
	gap: 12px;
	padding: 0 12px;
`;

const Checkbox = styled.input`
	width: 16px;
	height: 16px;
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

const Text = styled.p`
	flex-grow: 1;
	${(props) => props.completed && 'text-decoration: line-through'};
`;

const Button = styled.button`
	width: 30px;
	height: 30px;
	background-color: black;
	color: white;
	border: none;
	cursor: pointer;
	border-radius: 10px;
	flex-shrink: 0;
	transition: 0.2s;
	&:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}
`;
