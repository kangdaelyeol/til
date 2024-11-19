import { Fragment } from 'react';
import './App.css';
import Container from './Container';
import Fruits from './Fruits';

// JSX - js 확장 문법
// 각 컴포넌트는 반드시 최상위 하나의 요소로써 반환문을 가져야 함
// - 불필요한 상위 요소를 정의해 감싸는 문제를 해결하기 위해 Fragment 태그를 제공한다.
// - 단축 문법으로 빈 테그(Empty tag)를 사용한다

const data = ['a', 'b', 'c'];
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
			{/* <Container>
				<Fruits fruits={[]} />
			</Container> */}
			{null}
			{false}
			{true}
			{undefined}
			{''}
			{data.map((item) => (
				// react 내부 메커니즘에 의해 key속성을 가지고 이전 렌더링 트리와 현재 랜더링 트리를 비교해 랜더할 요소를 결정한다.
				// key 값을 통해 요소의 변화를 감지한다.
				// key 값은 각 루프마다 독립적이므로, 다른 루프간 중복된 값의 사용이 가능하다.
				// key 값은 안정적인 값이어야 한다. 매 랜더링마다 동적으로 변하는 값이 되면 요소의 변화를 매 랜더링마다 감지하게 된다.
				<div key={item}>{item}</div>
			))}
		</div>
	);
}

export default App;
