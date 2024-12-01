import styled from '@emotion/styled';
import Controls from './components/Controls';
import Layout from './components/Layout';
import Title from './components/Title';
import TodoList from './components/TodoList';

import { TodoProvider } from './context';

// styled component -> tagged template literal 방식을 기반으로 한 colocation 디자인 기법
// JS 코드를 직접 입력할 수 있어 용이하지만 런타임에 생성되어 성능 비효율적이다.
const size = '10px';
const Component = styled.div`
	font-size: ${size};
	background-color: ${(props) => props.bg};
	color: lime;
`;
const tag = (strings, ...values) => {
	console.log(strings);
	return strings.reduce((pre, cur, ind) => {
		const v = values[ind] ? `<b>${values[ind]}</b>` : '';
		return pre + cur + v;
	}, '');
};

function App() {
	return (
		<TodoProvider>
			<Layout>
				<Title />
				<Controls />
				<TodoList />
			</Layout>
		</TodoProvider>
	);
}

export default App;
