'use server'; // don't forget to add this!

import { z } from 'zod';

// This schema is used to validate input from client.
const schema = z.object({
	username: z.string().min(3).max(10),
	password: z.string().min(8).max(100)
});

export async function loginUserAction(prevState: any, formData: FormData) {
	const input = schema.safeParse({
		username: formData.get('username'),
		password: formData.get('password')
	});

	if (!input.success) {
		return {
			validationErrors: input.error.flatten().fieldErrors
		};
	}

	if (input.data.username === 'johndoe' && input.data.password === '12345678') {
		return {
			data: { success: 'Successfully logged in' }
		};
	}

	return { serverError: 'Incorrect credentials' };
}
