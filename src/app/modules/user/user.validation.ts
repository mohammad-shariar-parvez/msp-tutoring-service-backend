import { z } from 'zod';

const createUserZodSchema = z.object({
	body: z.object({
		email: z.string().optional(),

	}),
});
const updateUserZodSchema = z.object({
	body: z.object({
		name: z.string().optional(),
		email: z.string().optional(),
		password: z.string().optional(),
		contactNo: z.string().optional(),
		address: z.string().optional(),
		role: z.string().optional(),
	}),
});

export const userValidation = {
	updateUserZodSchema,
	createUserZodSchema
};