const Fruits = ({ fruits }) => {
	// 안티 패턴 - 해당 컴포넌트의 랜더링 유무(조건)을 외부에서 확인할 수 있어야 함.
	if (fruits.length > 0) return <div>{fruits.join(', ')}</div>;
	else return null;
};

export default Fruits;
