import { ChangeEvent } from 'react';

interface CheckBoxProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({
	id,
	label,
	checked,
	onChange,
}: CheckBoxProps) {
	return (
		<>
			<input id={id} type='checkbox' checked={checked} onChange={onChange} />
			<label htmlFor={id}>{label}</label>
		</>
	);
}
