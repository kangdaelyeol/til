## 안티 패턴 - 조건부 랜더링

- 조건에 따라 요소를 랜더링하는 경우 그 조건을 컴포넌트 내부가 아닌 외부에서 알 수 있게 하는 것이 좋다.

```js
const Fruits = ({ fruits }) => {
	// 안티 패턴 - 해당 컴포넌트의 랜더링 유무(조건)을 외부에서 확인할 수 있어야 함.
	if (fruits.length > 0) return <div>{fruits.join(', ')}</div>;
	else return null;
};

export default Fruits;
```

## key

- 배열의 map 메서드를 통해 랜더링 되는 요소는 key 속성값을 가져야 한다.

- 배열 요소에서 할당되는 각 key값은 리엑트 내부에서 상태 변경 감지를 할 때 사용된다.

### key 값의 조건

- **안정적인 값이어야 한다** - 리엑트 내부에서 이전 랜더와 현재 랜더트리의 키값을 비교하여 랜더링 될 요소를 결정하는데, 키값이 매번 변하면 매번 상태가 변한다고 간주되므로 불필요한 랜더링이 발생할 수 있다.

- **고유한 값이어야 한다** - 각 요소는 고유한 키값을 가져 이전 랜더트리와 비교될 수 있는 상태를 가져야 한다.

  - 따라서 index값을 key값으로 주는 것은 지양해야 한다. 배열 요소가 shift연산으로 맨 앞에 추가가 된다면 변경 감지 메커니즘에 문제가 생긴다.

```js
// react 내부 메커니즘에 의해 key속성을 가지고 이전 렌더링 트리와 현재 랜더링 트리를 비교해 랜더할 요소를 결정한다.
// key 값을 통해 요소의 변화를 감지한다.
// key 값은 각 루프마다 독립적이므로, 다른 루프간 중복된 값의 사용이 가능하다.
// key 값은 안정적인 값이어야 한다. 매 랜더링마다 동적으로 변하는 값이 되면 요소의 변화를 매 랜더링마다 감지하게 된다.
function App() {
	return (
		<div>
			{data.map((item) => (
				<div key={item}>{item}</div>
			))}
		</div>
	);
}
```

## JSX - javascript XML

- JSX는 JS의 **문법 확장** 이다.

- JS 환경에서 React의 HTML과 유사한 문법 구조를 통해 Component 작성을 할 수 있도록 만들어주는 문법 확장이다.

- 각 정의된 컴포넌트는 반드시 최상위 요소로써 하나의 요소를 반환해야 한다.

- 불필요한 상위 요소를 정의하는 것을 방지하기 위해 Fragement Tag를 사용할 수 있다 - 이는 Empty tag와 같다(shorthand)

## React - Synthetic event

- React 환경에서는 브라우저에서 제공하는 native event와 유사한 [synthetic event](https://react.dev/reference/react-dom/components/common#react-event-object) 객체를 제공한다.

- 일반적으로 native event의 기능을 제공하는 동시에, 브라우저간의 이벤트 구현 차이를 통합시켜준다. 즉 일관된 크로스 브라우저 이벤트 객체라고 할 수 있다.

```js
function App() {
	const alertUserText = (e) => {
		e.preventDefault();
		// 기본 native event와 동일하게, HTMLFormControlsCollection 데이터 타입이 있는 elements 프로퍼티에 접근이 가능하다.
		if (e.target.elements instanceof HTMLFormControlsCollection)
			alert(e.target.elements.user.value);
	};
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
```

## React - State

- useState를 통해 사용되는 [State는 Snapshot과 같이 행동한다.](https://react.dev/learn/state-as-a-snapshot) 즉 한 번 설정된 값은 해당 랜더링 페이지에 변하지 않고, 리랜더링(re-render)을 발생시키는 트리거로써의 역할을 한다.

```jsx
const Counter = () => {
	const [count, setCount] = useState(0);

	const countState = () => {
		// 각 count는 랜더링시 값이 결정되므로(behave like a snapshot) 모두 같은 값을 가지게 된다. 따라서 각 setState에 입력되는 인수의 값은 같다.
		setCount(count + 1);
		setCount(count + 1);
		setCount(count + 1);
	};

	return (
		<div className=''>
			<span>{count}</span>
			<button onClick={countState}>count!</button>
		</div>
	);
};
```

## Rendering

- trigger -> rendering -> committing

- first rendering / subsequent rendering

  - first(initial) rendering - call the root component

  - subsequent rendering - call the function component whose state update triggered the render -> changes to match the latest rendering

  `Pitfall` - rendering must be a pure calculation(function)

  - same input -> same output: Given the same inputs, a component should always return the same JSX.

  - It minds its own business: it should not change any objects or values that existed before rendering

  - otherwise: you can encounter confusing bugs and unpredictable behavior as your codebase grows in complexity

- browser rendering - refer to it as `painting` to avoid confusion throughtout the docs.
