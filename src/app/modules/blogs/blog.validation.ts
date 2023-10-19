import { z } from 'zod';


const create = z.object({
	body:
		z.object({

			title: z.string({
				required_error: 'title is required'
			}),
			imageUrl: z.string({
				required_error: 'image is required'
			}),
			content: z.string({
				required_error: 'content is required'
			}),

			// Quantity must be an integer and greater than or equal to 1
		})



});
const update = z.object({
	body:
		z.object({

			title: z.string({
				required_error: 'title is required'
			}).optional(),
			imageUrl: z.string({
				required_error: 'image is required'
			}).optional(),
			content: z.string({
				required_error: 'content is required'
			}).optional(),

			// Quantity must be an integer and greater than or equal to 1
		})



});




export const BlogValidation = {
	create, update

}

