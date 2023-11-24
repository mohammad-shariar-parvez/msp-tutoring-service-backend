import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth =
  (...requiredRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        //get authorization token
        const token = req.headers.authorization;
        // console.log("TUTOR TOKEN", req.headers);
        // console.log("TUTOR TOKEN AUTH", req.headers.authorization);


        //Check whether token exist 
        if (!token) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
        // console.log("from auth----______________--", verifiedUser);
        req.user = verifiedUser; // role  , userid ,email

        //Check whether valid user exist on database
        // case- user deleted but he has refresh token
        // checking deleted user's refresh token
        // const isUserExist = await prisma.user.findUnique({
        //   where: {
        //     id: verifiedUser.userId
        //   }
        // });
        // console.log("IS USER-----------", isUserExist);

        // if (!isUserExist) {
        //   throw new ApiError(httpStatus.NOT_FOUND, 'Token user does not exist in Database');
        // }
        //Check whether valid Role exist on database 
        // console.log("requiredRoles------", requiredRoles);
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {


          throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }
        next();
      } catch (error) {
        next(error);
      }
    };

export default auth;
