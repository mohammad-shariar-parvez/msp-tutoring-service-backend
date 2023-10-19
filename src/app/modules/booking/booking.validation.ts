import { Status } from '@prisma/client';
import { z } from 'zod';


const createBookingZodSchema = z.object({
	body:
		z.object({
			courseId: z.string({
				required_error: 'Book ID is required'
			}),
			startDate: z.string({
				required_error: 'startTime is required'
			}),
			startTime: z.string({
				required_error: 'startTime is required'
			}),
			// Quantity must be an integer and greater than or equal to 1
		})



});


const updateBookingZodSchema = z.object({
	body: z.object({
		status: z.enum([...Object.values(Status)] as [string, ...string[]], {}).optional(),

	}),
	startDate: z.string({
		required_error: 'startTime is required'
	}).optional(),
	startTime: z.string({
		required_error: 'startTime is required'
	}).optional(),
});

export const BookingValidation = {
	createBookingZodSchema,
	updateBookingZodSchema
}

