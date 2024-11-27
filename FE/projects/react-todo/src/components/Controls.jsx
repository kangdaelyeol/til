import './Controls.css';

export default function Controls() {
	return (
		<div className='controls'>
			<input type='text' className='input' />
			<button className='button'>추가</button>
			<select className='select'>
				<option value=''>전체</option>
				<option value=''>할 일</option>
				<option value=''>완료</option>
			</select>
		</div>
	);
}
