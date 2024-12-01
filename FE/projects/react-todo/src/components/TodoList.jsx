import { useContext } from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css';
import { TodoContext } from '../context';
import { TODO_DELETE_COMPLETED, TODO_TOGGLE_ALL } from '../reducer';
import styled from '@emotion/styled';

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
		<Component className={styles['todo-list']}>
			<Header className={styles['todo-header']}>
				<Checkbox
					className={styles['todo-checkbox']}
					type='checkbox'
					checked={isAllCompleted}
					onChange={(e) =>
						dispatch({
							type: TODO_TOGGLE_ALL,
							payload: { flag: e.target.checked },
						})
					}
				/>
				<HeaderText className={styles['todo-header-text']}>할 일</HeaderText>
				{completedCount > 0 && (
					<HeaderButton
						onClick={() => dispatch({ type: TODO_DELETE_COMPLETED })}
					>
						{completedCount}개 선택 삭제
					</HeaderButton>
				)}
			</Header>
			<div>
				{filteredList.map((item) => (
					<TodoItem key={item.id} {...item} />
				))}
			</div>
		</Component>
	);
}

const Component = styled.div`
	border: var(--border-style);
	border-radius: 6px;
	margin-top: 16px;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	height: 40px;
	padding: 0 12px;
	gap: 12px;
`;

const HeaderText = styled.p`
	flex-grow: 1;
`;

const HeaderButton = styled.button`
	border: var(--border-style);
	border-radius: 6px;
	background-color: transparent;
	padding: 0 12px;
	color: white;
	flex-shrink: 0;
	height: 30px;
`;

const Checkbox = styled.input`
	width: 16px;
	height: 16px;
`;
