import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    total: number;
    size: number;
    totalPage: number;
  };
  data: T | null;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type ILoginUserResponse = {
  token: string;
};

