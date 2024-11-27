import { createContext, useState, useContext } from 'react';

// 컨텍스트 상태의 일관성을 위해 초기 구조 정의
const ThemeContext = createContext({ theme: 'light', onToggle: () => {} });

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState('light');

	const changeTheme = () => {
		setTheme((pre) => (pre === 'light' ? 'dark' : 'light'));
	};

	return (
		<ThemeContext.Provider value={{ theme, changeTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const ThemeComponent = () => {
	const { theme, changeTheme } = useContext(ThemeContext);

	return (
		<div
			style={{
				backgroundColor: theme === 'light' ? '#fff' : '#000',
				color: theme === 'light' ? '#000' : '#fff',
			}}
		>
			<h1 onClick={changeTheme}>hello!</h1>
		</div>
	);
};

/* 
	props drilling 문제점을 보완하기 위해 useContext를 사용한다.
	
	useContext는 기본적으로 useContext, createContext 메서드가 필요하며, 공통된 상태를 제공할 provider 역할의 컴포넌트와 상태를 가져와 쓸 일반 컴포넌트가 필요하다.
	상태를 가져와 사용할 컴포넌트의 컨텍스트는 createContext에 의해 생성된 컨텍스트의 Provider를 제공하는 컨텍스트와 일치해야 한다.

	일반적으로 Provider 컴포넌트와 일반 컴포넌트를 내보내며, 공통된 컨텍스트 상태를 사용해야 할 경우 컨텍스트도 내보낸다.
 */
