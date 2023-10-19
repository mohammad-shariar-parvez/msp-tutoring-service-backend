import { z } from 'zod';


const create = z.object({
	body:
		z.object({
			question: z.string({
				required_error: 'question is required'
			}),
			answer: z.string({
				required_error: 'answer is required'
			}),
			// Quantity must be an integer and greater than or equal to 1
		})



});
const update = z.object({
	body:
		z.object({
			question: z.string({
				required_error: 'question is required'
			}).optional(),
			answer: z.string({
				required_error: 'answer is required'
			}).optional(),
			// Quantity must be an integer and greater than or equal to 1
		})



});





export const BlogValidation = {
	create, update

}

