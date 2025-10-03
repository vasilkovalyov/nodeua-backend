import { Request } from "express";

export type TokenDataType = {
  id: string;
  exp: number;
};

export type RequestWithAuthUserType = Request & {
  user?: TokenDataType | null;
};
