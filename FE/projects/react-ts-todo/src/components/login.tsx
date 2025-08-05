import { FormEvent } from 'react';
import { login } from '../services/user-api';
import { useSetAtom } from 'jotai';
import { userAtom } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const setUser = useSetAtom(userAtom);
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const username = e.currentTarget.username.value;
		const password = e.currentTarget.password.value;

		try {
			const user = await login(username, password);
			setUser(user);
			navigate('/');
		} catch {
			alert('invalid username or password');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<div>
					<label htmlFor='username'>username</label>
					<input type='text' name='username' id='username' />
				</div>
				<div>
					<label htmlFor='password'>password</label>
					<input type='text' name='password' id='password' />
				</div>
			</div>
			<button type='submit'>login</button>
		</form>
	);
}
