import { FormEvent } from 'react';
import { login } from '../slices/common-slice';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const username = e.currentTarget.username.value;
		const password = e.currentTarget.password.value;

		try {
			dispatch(login({ username, password }));
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
