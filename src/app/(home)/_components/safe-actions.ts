'use server'; // don't forget to add this!

import { z } from 'zod';
import { safeAction } from './utils';

// This schema is used to validate input from client.
const schema = z.object({
	username: z.string().min(3).max(10),
	password: z.string().min(8).max(100)
});

export const loginUserSafeAction = safeAction(schema, async (input, ctx) => {
	if (input.username === 'johndoe' && input.password === '12345678') {
		return {
			success: 'Successfully logged in'
		};
	}

	return { failure: 'Incorrect credentials' };
});
