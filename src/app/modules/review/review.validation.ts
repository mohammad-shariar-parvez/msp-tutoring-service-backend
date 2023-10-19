import { z } from 'zod';


const create = z.object({
	body:
		z.object({
			courseId: z.string({
				required_error: 'courseId ID is required'
			}),
			review: z.string({
				required_error: 'review is required'
			}),
			rating: z.number({
				required_error: 'rating is required'
			}),
			// Quantity must be an integer and greater than or equal to 1
		})



});




export const ReviewValidation = {
	create

}

