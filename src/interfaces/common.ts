import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IUser = {
  userId: string,
  email: string;
  role: string,
  iat: number,
  exp: number;
};

export type IProfile = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  profileImage: string;
  useEmail: string;
  contactNo: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  role: string,
  iat: number,
  exp: number;
  // Assuming User is defined as another type
};