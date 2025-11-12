import "express";

import { UserMiddlewareAuthParams } from "./request";

declare global {
  namespace Express {
    interface Request {
      user?: UserMiddlewareAuthParams;
    }
  }
}
