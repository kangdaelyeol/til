// useRef는 상태를 저장하지만 상태 변경으로 인한 리랜더링이 필요하지 않을때 사용한다
// useRef를 HTML tag에 직접 적용한 경우 current 프로퍼티를 통해 DOM 요소에 직접 접근한다.
// 무분별한 DOM 요소로 직접적인 접근은 리엑트의 컴포넌트 상태 관리 철학과 어긋나기 때문에 특수한 상황이 아니면 useState를 사용한 상태 관리로 처리한다.

import { useState, useRef } from 'react';

export const Timer = () => {
	const [seconds, setSeconds] = useState(0);
	// setInterval 참조값의 변경으로 인한 리렌더링은 불필요하므로 useRef를 통해 상태를 관리한다.
	const timeRef = useRef(); // 초기값은 null이므로 null을 명시할 필요는 없다.

	const startTimer = () => {
		if (timeRef.current) return;
		timeRef.current = setInterval(() => {
			setSeconds((pre) => pre + 1);
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(timeRef.current);
		timeRef.current = null;
	};

	return (
		<div>
			<h1>time: {seconds}</h1>
			<button onClick={startTimer}>start</button>
			<button onClick={stopTimer}>stop</button>
		</div>
	);
};

export const FocusInput = () => {
	// DOM요소 접근을 통한 특수한 동작을 취하기 위해 useRef를 사용한다.
	const inputRef = useRef(); 
	const focusInput = () => {
		inputRef.current?.focus();
	};
	return (
		<div>
			<button onClick={focusInput}>focus</button>
			<input ref={inputRef} type='text' />
		</div>
	);
};
