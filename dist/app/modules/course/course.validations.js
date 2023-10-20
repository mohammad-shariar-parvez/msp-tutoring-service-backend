"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidations = void 0;
const zod_1 = require("zod");
const course_interface_1 = require("./course.interface");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required"
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        location: zod_1.z.string({
            required_error: "Location is required"
        }),
        duration: zod_1.z.string().optional(),
        article: zod_1.z.string().optional(),
        status: zod_1.z.enum([...course_interface_1.CourseStatus], {
            required_error: "Status is required"
        }),
        imageUrl: zod_1.z.string({
            required_error: "Image is required"
        }),
        description: zod_1.z.string({
            required_error: "description  is required"
        }),
        serviceId: zod_1.z.string({
            required_error: "serviceId  is required"
        }),
        courseTutorId: zod_1.z.string({
            required_error: "courseTutorId   is required"
        }),
    })
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.string().optional(),
        duration: zod_1.z.string().optional(),
        article: zod_1.z.string().optional(),
        status: zod_1.z.enum([...course_interface_1.CourseStatus]).optional(),
        imageUrl: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        serviceId: zod_1.z.string().optional(),
        courseTutorId: zod_1.z.string().optional(),
    })
});
exports.CourseValidations = {
    create,
    update
};
