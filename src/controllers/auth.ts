import { Request, Response } from "express";

import status from "../utils/status";
import ApiError from "../services/api-error";
import { validateToken, generateTokens } from "../services/token/token-service";
import { loginService, registrationService } from "../services/auth";
import { AuthMessages } from "../constants/response-messages";
import { COOKIES_KEYS } from "../constants/cookies";

export async function loginController(req: Request, res: Response) {
  try {
    const loginResult = await loginService(req.body);
    if (loginResult) {
      res.cookie(COOKIES_KEYS.refreshToken, loginResult.refreshToken, {
        domain: process.env.DOMAIN,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none"
      });
      res.cookie(COOKIES_KEYS.accessToken, loginResult.accessToken, {
        domain: process.env.DOMAIN,
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none"
      });
    }

    const { _id, email } = loginResult;

    res.status(status.SUCCESS).json({
      _id,
      email
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    res.clearCookie(COOKIES_KEYS.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    res.clearCookie(COOKIES_KEYS.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    res.status(status.SUCCESS).json(true);
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
}

export async function registrationController(req: Request, res: Response) {
  try {
    const response = await registrationService(req.body);
    res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
}

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw ApiError.BadRequestError(AuthMessages.problemWithToken);

    const tokenData = validateToken(refreshToken, "refresh");
    if (!tokenData) throw ApiError.BadRequestError(AuthMessages.problemWithToken);

    const tokensData = generateTokens({
      _id: tokenData.userId,
      isAdmin: tokenData.isAdmin
    });

    if (!tokensData) {
      throw new Error("Error token");
    }

    res.cookie(COOKIES_KEYS.refreshToken, tokensData.refreshToken, {
      domain: process.env.DOMAIN,
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none"
    });
    res.cookie(COOKIES_KEYS.accessToken, tokensData.accessToken, {
      domain: process.env.DOMAIN,
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none"
    });

    res.status(status.SUCCESS).json({
      accessToken: tokensData.accessToken
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(status.BAD_REQUEST).json({
        message: e.message
      });
    }

    res.status(status.BAD_REQUEST).json({
      message: AuthMessages.errorResponse
    });
  }
}
