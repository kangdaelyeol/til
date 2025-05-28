import { makeAutoObservable } from 'mobx';
import TodoItem from './models/todo-item';
import { getTodos } from './services/todo-api';

class Store {
	todos: TodoItem[];

	constructor() {
		makeAutoObservable(this);
		this.todos = [] as TodoItem[];
	}

	addTodo = (newTodo: string) => {
		this.todos.push(new TodoItem({ text: newTodo }));
	};

	toggleTodo = (id: number) => {
		const todo = this.todos.find((todo) => todo.id === id);
		if (todo) {
			todo.toggle();
		}
	};

	fetchTodo = async () => {
		const todos = await getTodos();
		this.todos = todos.map((todo) => new TodoItem({ ...todo }));
	};
}

export default new Store();
