"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string({
            required_error: 'description is required'
        }),
        // Quantity must be an integer and greater than or equal to 1
    })
});
const createQuestion = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required'
        }),
        location: zod_1.z.string({
            required_error: 'location is required'
        }),
        phone: zod_1.z.string({
            required_error: 'phone is required'
        }),
        requirement: zod_1.z.string({
            required_error: 'requirement is required'
        }),
        // Quantity must be an integer and greater than or equal to 1
    })
});
exports.FeedbackValidation = {
    create, createQuestion
};
