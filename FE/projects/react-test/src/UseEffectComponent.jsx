/**
 * useEffect -> 컴포넌트가 랜더링된 후 side effect를 다루기 위해 사용
 * 여기서 side effect는 DOM 조작 data fetch, timer 설정등 컴포넌트의 기본적은 랜더링 과정 이외의 발생하는 모든 작업을 말한다.
 */

import { useEffect, useState } from 'react';

export const Basic = ({ cnt, setCnt }) => {
	const [state, setState] = useState(0);
	// useEffect 함수는 side effect 효과가 발생할 콜백 함수와 의존성 배열을 받는다.
	useEffect(() => {
		// 논리적 component mount 단계가 발생할 때 첫 호출
		// 의존성 배열에 입력된 상태만 감지되어, 의존성이 변경될 때 실행된다. -> 외부 props는 감지되지 않는다.

		console.log('update', state);

		// clean up 함수를 반환할 수 있다
		// clean up 함수는 의존성 상태가 변경되거나 컴포넌트가 unmount될 때 호출된다.
		// 일반적으로 side effect에 의해 할당된 브라우저상의 메모리 누수를 방지하기 위해 컴포넌트가 리랜더링 또는 unmount 되기전 안전하게 헤제(free) 하기 위해 사용한다.
		return () => {
			console.log('cleanup', state);
		};
	}, [state]);

	return (
		<div>
			<h1>
				state count: {state} : {cnt}
			</h1>
			<button onClick={() => setState((prev) => prev + 1)}>
				increase count
			</button>
			<button onClick={() => setCnt((prev) => prev + 1)}>setCnt</button>
		</div>
	);
};
