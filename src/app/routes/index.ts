import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';

import { BookingRoutes } from '../modules/booking/booking.route';
import { CourseRoutes } from '../modules/course/course.routes';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { ServiceRoutes } from '../modules/service/service.routes';
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
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
