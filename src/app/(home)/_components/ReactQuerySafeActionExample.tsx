'use client';
import {
	QueryClient,
	QueryClientProvider,
	useMutation
} from '@tanstack/react-query';
import { loginUserSafeAction } from './safe-actions';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Form() {
	const [values, setValues] = useState({
		username: 'johndoe',
		password: '12345678'
	});
	const mutation = useMutation({ mutationFn: loginUserSafeAction });

	return (
		<div>
			<form
				action={async () => {
					const { data, serverError, validationErrors } =
						await mutation.mutateAsync(values);

					console.log('data', data);
					console.log('serverError', serverError);
					console.log('validationErrors', validationErrors);

					if (data) {
						return toast.success('Successfully logged in!');
					}

					if (serverError) toast.error(serverError);

					if (validationErrors) {
						let key: keyof typeof validationErrors;
						for (key in validationErrors) {
							const field = validationErrors[key];
							field && toast.error(`${key}: ${field.toString()}`);
						}
					}
				}}
			>
				<fieldset className='flex flex-col gap-4 max-w-[250px] border rounded-sm p-2'>
					<legend className='mb-4 capitalize'>
						react query + server actions
					</legend>
					<label className='flex flex-col gap-0.5'>
						<strong>Please enter your username</strong>
						<input
							name='username'
							className='px-2 py-1 rounded-sm border-b text-slate-800 capitalize'
							value={values.username}
							onChange={(event) =>
								setValues((prev) => ({
									...prev,
									[event.target.name]: event.target.value
								}))
							}
						/>
					</label>
					<label className='flex flex-col gap-0.5'>
						<strong>Please enter your password</strong>
						<input
							name='password'
							type='password'
							className='px-2 py-1 rounded-sm border-b text-slate-800 capitalize'
							value={values.password}
							onChange={(event) =>
								setValues((prev) => ({
									...prev,
									[event.target.name]: event.target.value
								}))
							}
						/>
					</label>
					<button
						type='submit'
						aria-disabled={mutation.isPending}
						disabled={mutation.isPending}
						className='rounded-sm px-3 py-1 mt-1 bg-slate-700 text-white w-fit capitalize'
					>
						{mutation.isPending ? 'loading...' : 'submit'}
					</button>
				</fieldset>
			</form>
			<code>
				<pre className='whitespace-break-spaces'>
					{JSON.stringify(mutation.data, null, 2)}
				</pre>
			</code>
		</div>
	);
}

const queryClient = new QueryClient();

export default function ReactQuerySafeActionExample() {
	return (
		<QueryClientProvider client={queryClient}>
			<Form />
		</QueryClientProvider>
	);
}
