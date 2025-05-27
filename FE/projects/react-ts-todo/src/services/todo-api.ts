export const getTodos = () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			return resolve([
				{
					id: 1,
					text: 'Learn React',
					dont: true,
				},
				{
					id: 2,
					text: 'Learn Redux',
					dont: false,
				},
			]);
		}, 1000);
	});
};
