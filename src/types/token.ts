import { Request } from "express";

export type TokenDataType = {
  userId: string;
  exp: number;
};

export interface RequestWithAuthUserType extends Request {
  user?: TokenDataType;
}
