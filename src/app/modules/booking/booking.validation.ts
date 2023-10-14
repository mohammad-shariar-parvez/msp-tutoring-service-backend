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
			endDate: z.string({
				required_error: 'endTime is required'
			}),
			// Quantity must be an integer and greater than or equal to 1
		})



});


const updateBookingZodSchema = z.object({
	body: z.object({
		status: z.enum([...Object.values(Status)] as [string, ...string[]], {}),

	})
});

export const BookingValidation = {
	createBookingZodSchema,
	updateBookingZodSchema
}

