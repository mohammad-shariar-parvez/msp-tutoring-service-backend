"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blogs/blog.route");
const booking_route_1 = require("../modules/booking/booking.route");
const category_routes_1 = require("../modules/category/category.routes");
const content_route_1 = require("../modules/contents/content.route");
const course_routes_1 = require("../modules/course/course.routes");
const feedback_route_1 = require("../modules/feedback/feedback.route");
const notification_router_1 = require("../modules/notification/notification.router");
const payment_routes_1 = require("../modules/payments/payment.routes");
const profile_route_1 = require("../modules/profile/profile.route");
const review_route_1 = require("../modules/review/review.route");
const subject_routes_1 = require("../modules/subject/subject.routes");
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
        path: '/subjects',
        route: subject_routes_1.SubjectRoutes,
    },
    {
        path: '/courses',
        route: course_routes_1.CourseRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.CategoryRoutes,
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
    },
    {
        path: '/payments',
        route: payment_routes_1.paymentRoutes
    },
    {
        path: '/notification',
        route: notification_router_1.NotificationRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
