import TodoItem from './TodoItem';
import './TodoList.css';

export default function TodoList() {
	return (
		<div className='todo-list'>
			<div className='todo-header'>
				<input className='todo-checkbox' type='checkbox' />
				<p className='todo-header-text'>할 일</p>
				<button className='todo-header-button'>삭제</button>
			</div>
      <TodoItem />
		</div>
	);
}
