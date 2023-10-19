import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

import { BlogRoutes } from '../modules/blogs/blog.route';
import { BookingRoutes } from '../modules/booking/booking.route';
import { ContentRoutes } from '../modules/contents/content.route';
import { CourseRoutes } from '../modules/course/course.routes';
import { FeedbackRoutes } from '../modules/feedback/feedback.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { ServiceRoutes } from '../modules/service/service.routes';
import { TutorRoutes } from '../modules/tutor/tutor.route';
import { UserRoutes } from '../modules/user/user.route';


const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profile',
    route: ProfileRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/tutors',
    route: TutorRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/contents',
    route: ContentRoutes,
  },
  {
    path: '/feedbacks',
    route: FeedbackRoutes,
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
