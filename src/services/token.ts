import jwt from "jsonwebtoken";
import expires from "../utils/expires";

export type TokenVerifyResponseType = {
  _id: string;
  iat: number;
  exp: number;
};

type TokenType = "access" | "refresh";

export function generateTokens(payload: { _id: string }) {
  return {
    accessToken: generateAccessToken(payload._id),
    refreshToken: generateRefreshToken(payload._id)
  };
}

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET || "", { expiresIn: expires.expiresAccessToken });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET || "", { expiresIn: expires.expiresRefreshToken });
}

export function validateToken(token: string, type: TokenType = "access"): TokenVerifyResponseType {
  const tokenString = type === "access" ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET;
  const userData = jwt.verify(token, tokenString as string);
  return userData as TokenVerifyResponseType;
}
