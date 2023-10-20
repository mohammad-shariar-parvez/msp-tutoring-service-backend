"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blogs/blog.route");
const booking_route_1 = require("../modules/booking/booking.route");
const content_route_1 = require("../modules/contents/content.route");
const course_routes_1 = require("../modules/course/course.routes");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const profile_route_1 = require("../modules/profile/profile.route");
const review_route_1 = require("../modules/review/review.route");
const service_routes_1 = require("../modules/service/service.routes");
const tutor_route_1 = require("../modules/tutor/tutor.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.ProfileRoutes,
    },
    {
        path: '/courses',
        route: course_routes_1.CourseRoutes,
    },
    {
        path: '/services',
        route: service_routes_1.ServiceRoutes,
    },
    {
        path: '/bookings',
        route: booking_route_1.BookingRoutes,
    },
    {
        path: '/tutors',
        route: tutor_route_1.TutorRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/contents',
        route: content_route_1.ContentRoutes,
    },
    {
        path: '/feedbacks',
        route: feedback_route_1.FeedbackRoutes,
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
