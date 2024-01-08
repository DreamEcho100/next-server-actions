'use client';
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
import { useFormStatus, useFormState } from 'react-dom';
import { useEffect } from 'react';
import { loginUserAction } from './actions';
import { toast } from 'react-toastify';

function FormContent(props: {}) {
	const status = useFormStatus();

	return (
		<fieldset className='flex flex-col gap-4 max-w-[250px] border rounded-sm p-2'>
			<legend className='mb-4 capitalize'>server actions</legend>
			<label className='flex flex-col gap-0.5'>
				<strong>Please enter your username</strong>
				<input
					name='username'
					className='px-2 py-1 rounded-sm border-b text-slate-800 capitalize'
					value='johndoe'
				/>
			</label>
			<label className='flex flex-col gap-0.5'>
				<strong>Please enter your password</strong>
				<input
					name='password'
					type='password'
					className='px-2 py-1 rounded-sm border-b text-slate-800 capitalize'
					defaultValue='12345678'
				/>
			</label>
			<button
				type='submit'
				aria-disabled={status.pending}
				disabled={status.pending}
				className='rounded-sm px-3 py-1 mt-1 bg-slate-700 text-white w-fit capitalize'
			>
				{status.pending ? 'loading...' : 'submit'}
			</button>
		</fieldset>
	);
}

const initialState = {
	data: { success: '' },
	serverError: undefined,
	validationErrors: undefined
};

function Form() {
	const [state, formAction] = useFormState(loginUserAction, initialState);

	useEffect(() => {
		if (state.data) {
			toast.success('Successfully logged in!');
			return;
		}

		if (state.serverError) toast.error(state.serverError);

		if (state.validationErrors) {
			let key: keyof typeof state.validationErrors;
			for (key in state.validationErrors) {
				const field = state.validationErrors[key];
				field && toast.error(`${key}: ${field.toString()}`);
			}
		}
	}, [state]);

	return (
		<div>
			<form action={formAction}>
				<FormContent />
			</form>
			<code>
				<pre className='whitespace-break-spaces'>
					{JSON.stringify(state, null, 2)}
				</pre>
			</code>
		</div>
	);
}

export default function ReactExample() {
	return <Form />;
}
