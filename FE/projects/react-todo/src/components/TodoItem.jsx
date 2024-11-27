import './TodoItem.css';

export default function TodoItem() {
	return (
		<div className='todo-item'>
			<input className='todo-checkbox' type='checkbox' />
			<p className='todo-item-text'>할 일</p>
			<button className='todo-item-button'>수정</button>
			<button className='todo-item-button'>삭제</button>
		</div>
	);
}
