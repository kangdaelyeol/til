import { Children } from 'react';

// wrapper / contatiner component
// children 을 prop으로 가지며 컴포넌트를 받는다.
// 공식문서에 children prop을 가지는 컴포넌트에 대한 공식 명칭은 기제되어 있지 않아 이에 대한 공식 명칭은 아니다. 그냥 보편적으로 사용되는 컴포넌트의 이름이다.

const Container = ({ children }) => {
	console.log(Children.toArray(children));
	return <div>{children}</div>;
};

export default Container;
