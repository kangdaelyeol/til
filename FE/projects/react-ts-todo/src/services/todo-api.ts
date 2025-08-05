import { Todo } from '../components/todo-container/todo-container';

export const getTodos = (): Promise<Todo[]> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			return resolve([
				{
					id: 1,
					text: 'Learn React',
					done: true,
				},
				{
					id: 2,
					text: 'Learn Redux',
					done: false,
				},
			]);
		}, 1000);
	});
};
