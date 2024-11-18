import { Fragment } from 'react';
import './App.css';
import Container from './Container';

// JSX - js 확장 문법
// 각 컴포넌트는 반드시 최상위 하나의 요소로써 반환문을 가져야 함
// - 불필요한 상위 요소를 정의해 감싸는 문제를 해결하기 위해 Fragment 태그를 제공한다.
// - 단축 문법으로 빈 테그(Empty tag)를 사용한다

function HelloWorld() {
	return (
		<Fragment>
			<h1>HelloWorld</h1>
			<h1>HelloWorld</h1>
		</Fragment>
	);
}


function App() {
	return (
		<div>
      
			<Container>
				<HelloWorld />
				<HelloWorld />
				<HelloWorld />
			</Container>
		</div>
	);
}

export default App;
