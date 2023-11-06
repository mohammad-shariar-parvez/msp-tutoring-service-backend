import { z } from 'zod';

const createTutorZodSchema = z.object({
	body: z.object({
		firstName: z.string({
			required_error: "firstName  is required"
		}),
		middleName: z.string().nullable().optional(),
		lastName: z.string({
			required_error: "lastName  is required"
		}),
		experience: z.string({
			required_error: "experience  is required"
		}),
		bio: z.string({
			required_error: "bio  is required"
		}),
		imageUrl: z.string({
			required_error: "imageUrl  is required"
		}),
		gender: z.string({
			required_error: "gender  is required"
		}),
		location: z.string({
			required_error: "location  is required"
		}),
	}),
});
const updateTutorZodSchema = z.object({
	body: z.object({
		firstName: z.string().optional(),
		middleName: z.string().nullable().optional(),
		lastName: z.string().optional(),
		experience: z.string().optional(),
		bio: z.string().optional(),
		imageUrl: z.string().optional(),
		gender: z.string().optional(),
		location: z.string().optional(),
	}),
});

export const tutorValidation = {
	createTutorZodSchema,
	updateTutorZodSchema
};

