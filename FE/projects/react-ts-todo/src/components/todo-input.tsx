import { ChangeEvent, useState } from 'react';

interface TodoInputProps {
	onAddTodo: (text: string) => void;
}

export default function TodoInput({ onAddTodo }: TodoInputProps) {
	console.log('TodoInput rendered');

	const [newTodo, setNewTodo] = useState<string>('');

	const addTodo = () => {
		onAddTodo(newTodo);
		setNewTodo('');
	};

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
