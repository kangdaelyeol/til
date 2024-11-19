import './App.css';

function App() {
	const alertUserText = (e) => {
		e.preventDefault();
		if (e.target.elements instanceof HTMLFormControlsCollection)
			alert(e.target.elements.user.value);
		console.log(e.target.elements);
		console.log(e.currentTarget);
	};
	// react환경은 synthetic event를 제공한다.
	// 각 브라우저의 JS엔진마다 달랐던 기본 JS event구현 환경을 통합한 이벤트 처리 환경을 제공해준다.
	return (
		<div>
			{/* react - synthetic event */}
			<form onSubmit={alertUserText}>
				<input type='text' name='user' />
				<button>submit</button>
			</form>
		</div>
	);
}

export default App;
