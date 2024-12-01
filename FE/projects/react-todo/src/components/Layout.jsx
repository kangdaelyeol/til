import styled from '@emotion/styled';

export default function Layout({ children }) {
	return <Component>{children}</Component>;
}

const Component = styled.div`
	border: 1px solid gray;
	padding: 32px;
	border-radius: 6px;
	width: 50%;
	margin: auto;
`;
