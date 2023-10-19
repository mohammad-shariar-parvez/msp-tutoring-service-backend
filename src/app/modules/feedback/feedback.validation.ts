import { z } from 'zod';


const create = z.object({
	body:
		z.object({
			description: z.string({
				required_error: 'description is required'
			}),
			// Quantity must be an integer and greater than or equal to 1
		})



});
const createQuestion = z.object({
	body:
		z.object({
			name: z.string({
				required_error: 'name is required'
			}),
			location: z.string({
				required_error: 'location is required'
			}),
			phone: z.string({
				required_error: 'phone is required'
			}),
			requirement: z.string({
				required_error: 'requirement is required'
			}),
			// Quantity must be an integer and greater than or equal to 1
		})



});






export const FeedbackValidation = {
	create, createQuestion

}

