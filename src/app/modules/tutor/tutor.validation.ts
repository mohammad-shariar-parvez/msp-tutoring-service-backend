import { z } from 'zod';

const createTutorZodSchema = z.object({
	body: z.object({
		firstName: z.string(),
		middleName: z.string(),
		lastName: z.string(),
		experience: z.string(),
		bio: z.string(),
		imageUrl: z.string(),
		gender: z.string(),
	}),
});
const updateTutorZodSchema = z.object({
	body: z.object({
		firstName: z.string().optional(),
		middleName: z.string().optional(),
		lastName: z.string().optional(),
		experience: z.string().optional(),
		bio: z.string().optional(),
		imageUrl: z.string().optional(),
		gender: z.string().optional(),
	}),
});

export const tutorValidation = {
	createTutorZodSchema,
	updateTutorZodSchema
};

