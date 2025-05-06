import { forwardRef, InputHTMLAttributes, Ref, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
	name: string;
	email: string;
	phone: string;
};

export default function JoinForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const submit = (data: FormData) => {
		console.log(data);
	};

	useEffect(() => {
		console.log(
			errors,
			Object.values(errors).map((error) => error.message)
		);
	}, [errors]);

	return (
		<div>
			<form onSubmit={handleSubmit(submit)}>
				<div className=''>
					<Input id='name' type='text' required {...register('name')} />
				</div>
				<div className=''>
					<Input id='email' type='email' required {...register('email')} />
				</div>
				<div className=''>
					<Input
						id='phone'
						type='tel'
						required
						{...register('phone', {
							pattern: { value: /\d{10,11}/, message: 'invalid phone number' },
						})}
					/>
				</div>
				<div className=''>
					<button type='submit'>Join</button>
					<button type='reset'>Reset</button>
				</div>
			</form>
		</div>
	);
}

const Input = forwardRef(function Input(
	{ id, name, ...props }: InputHTMLAttributes<HTMLInputElement>,
	ref: Ref<HTMLInputElement>
) {
	return (
		<>
			<label htmlFor={id}>{name}</label>
			<input id={id} name={name} ref={ref} {...props} />
		</>
	);
});
