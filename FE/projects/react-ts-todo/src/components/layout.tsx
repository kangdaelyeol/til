import { PropsWithChildren, useState } from 'react';

export default function Layout({ children }: PropsWithChildren) {
	const [direction, setDirection] = useState<'column' | 'row'>('column');

	console.log('layout rendered');

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: direction,
			}}
		>
			<h1>Todo app</h1>
			<button
				onClick={() =>
					setDirection((prev) => (prev === 'column' ? 'row' : 'column'))
				}
			>
				Change Layout
			</button>
			{children}
		</div>
	);
}
