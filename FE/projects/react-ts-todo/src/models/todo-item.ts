import { makeAutoObservable } from 'mobx';
import { Todo } from '../components/todo-container/todo-container';

export default class TodoItem implements Todo {
	id: number;
	text: string;
	done: boolean;

	constructor({
		id = Date.now(),
		text = '',
		done = false,
	}: Partial<Todo> = {}) {
		makeAutoObservable(this);
		this.id = id;
		this.text = text;
		this.done = done;
	}

	toggle = () => {
		this.done = !this.done;
	};
}
