import { z } from "zod";
import { CourseStatus } from "./course.interface";

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
        duration: z.string().optional(),
        article: z.string().optional(),

        status: z.enum([...CourseStatus] as [string, ...string[]], {
            required_error: "Status is required"
        }),

        imageUrl: z.string({
            required_error: "Image is required"
        }),
        description: z.string({
            required_error: "description  is required"
        }),
        serviceId: z.string({
            required_error: "serviceId  is required"
        }),
        courseTutorId: z.string({
            required_error: "courseTutorId   is required"
        }),
    })
});

const update = z.object({
    body: z.object({
        title: z.string().optional(),
        price: z.number().optional(),
        location: z.string().optional(),
        duration: z.string().optional(),
        article: z.string().optional(),
        status: z.enum([...CourseStatus] as [string, ...string[]]).optional(),

        imageUrl: z.string().optional(),
        description: z.string().optional(),
        serviceId: z.string().optional(),
        courseTutorId: z.string().optional(),
    })
});

export const CourseValidations = {
    create,
    update
};