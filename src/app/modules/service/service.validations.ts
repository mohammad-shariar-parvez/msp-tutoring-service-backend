import { z } from "zod";

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),
        price: z.number({
            required_error: 'Price is required',
        }),
        location: z.string({
            required_error: "Location is required"
        }),
    })
});

const update = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }).optional(),
        price: z.number({
            required_error: 'Price is required',
        }).optional(),
        location: z.string({
            required_error: "Location is required"
        }).optional(),
    })
});

export const ServiceValidations = {
    create,
    update
};