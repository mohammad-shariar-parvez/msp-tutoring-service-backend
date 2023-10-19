import { z } from "zod";

const create = z.object({
    body: z.object({
        title: z.string({
            required_error: "Title is required"
        }),

        imageUrl: z.string({
            required_error: 'Image is required',
        }),

    })
});

const update = z.object({
    body: z.object({
        title: z.string().optional(),
        imageUrl: z.string().optional(),

    })
});

export const ServiceValidations = {
    create,
    update
};