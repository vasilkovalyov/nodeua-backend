import jwt from "jsonwebtoken";
import expires from "../../utils/expires";
import { TokenType, TokenVerifyResponseType } from "./token.type";

export function generateTokens(payload: { _id: string; isAdmin?: boolean }) {
  return {
    accessToken: generateAccessToken(payload._id, payload.isAdmin || false),
    refreshToken: generateRefreshToken(payload._id, payload.isAdmin || false)
  };
}

export function generateAccessToken(userId: string, isAdmin?: boolean) {
  const objParams = {
    userId
  };
  if (isAdmin) {
    Object.assign(objParams, { isAdmin: true });
  }

  return jwt.sign(objParams, process.env.JWT_ACCESS_SECRET || "", {
    expiresIn: expires.expiresAccessToken
  });
}

export function generateRefreshToken(userId: string, isAdmin?: boolean) {
  const objParams = {
    userId
  };
  if (isAdmin) {
    Object.assign(objParams, { isAdmin: true });
  }

  return jwt.sign(objParams, process.env.JWT_REFRESH_SECRET || "", {
    expiresIn: expires.expiresRefreshToken
  });
}

export function validateToken(token: string, type: TokenType = "access"): TokenVerifyResponseType {
  const tokenString = type === "access" ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
  const userData = jwt.verify(token, tokenString as string);

  return userData as TokenVerifyResponseType;
}
