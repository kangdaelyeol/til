import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { Todo } from './todo-container/todo-container';

// const generateLargeDataset = (size: number) => {
// 	return Array.from({ length: size }, (_, index) => ({
// 		index,
// 		done: index % 2 !== 0,
// 		text: `할 일: ${index + 1}`,
// 	}));
// };

export default function TodoInput() {
	const [newTodo, setNewTodo] = useState<string>('');

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (text: string) => {
			return new Promise<string>((resolve) => {
				setTimeout(() => {
					resolve(text);
				}, 1000);
			});
		},
		onSuccess: (text: string) => {
			queryClient.setQueryData(['todos', 'all'], (todos: Todo[]) => {
				console.log(todos);
				return [...todos, { id: Date.now(), text, done: false }];
			});

			queryClient.invalidateQueries({
				queryKey: ['todos'],
			});
			setNewTodo('');
		},
		onError: (e) => {
			console.log(e);
			setNewTodo('');
		},
	});

	const onInputTodo = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodo(e.currentTarget.value);
	};

	return (
		<div>
			<input type='text' value={newTodo} onChange={onInputTodo} />
			<button onClick={() => mutation.mutate(newTodo)}>추가</button>
		</div>
	);
}
