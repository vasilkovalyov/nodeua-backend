import { Request } from "express";

export type UserMiddlewareAuthParams = {
  userId: string;
};

export type RequestWithAuthUserType = Request & {
  user: UserMiddlewareAuthParams;
};
