import { ChangeEvent, useEffect, useMemo, useState } from 'react';

interface TodoInputProps {
	onAddTodo: (text: string) => void;
}

const generateLargeDataset = (size: number) => {
	return Array.from({ length: size }, (_, index) => ({
		index,
		done: index % 2 !== 0,
		text: `할 일: ${index + 1}`,
	}));
};

const largeDataset = generateLargeDataset(10_000);

export default function TodoInput({ onAddTodo }: TodoInputProps) {
	console.log('TodoInput rendered');

	const [newTodo, setNewTodo] = useState<string>('');

	const addTodo = () => {
		onAddTodo(newTodo);
		setNewTodo('');
	};

	const filteredLargeDataset = useMemo(() => {
		console.log('generate dataset');
		return largeDataset.filter((todo) => todo.done);
	}, []);

	console.log(filteredLargeDataset);

	useEffect(() => {
		console.log('onAddTodo changed!');
	}, [onAddTodo]);

	const onInputTodo = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodo(e.currentTarget.value);
	};

	return (
		<div>
			<input type='text' value={newTodo} onChange={onInputTodo} />
			<button onClick={addTodo}>추가</button>
		</div>
	);
}
