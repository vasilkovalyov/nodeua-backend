import { Request, Response } from "express";

import ApiError from "../services/api-error";
import { validateToken, generateTokens } from "../services/token/token-service";
import { loginService, registrationService, profileService } from "../services/auth";
import status from "../utils/status";
import { AuthMessages } from "../constants/response-messages";

export async function loginController(req: Request, res: Response) {
  try {
    const response = await loginService(req.body);
    if (response) {
      res.cookie("refreshToken", response.refreshToken, {
        domain: process.env.DOMAIN,
        path: "/",
        secure: true
      });
      res.cookie("token", response.accessToken, {
        domain: process.env.DOMAIN,
        path: "/",
        secure: false
      });
    }
    const { ...params } = response;

    return res.status(status.SUCCESS).json(params);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      message: e.message
    });
  }
}

export async function registrationController(req: Request, res: Response) {
  try {
    const response = await registrationService(req.body);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}

export async function profileController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await profileService(id);
    return res.status(status.SUCCESS).json(response);
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message
    });
  }
}

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) throw ApiError.BadRequestError(AuthMessages.problemWithToken);

    const tokenData = validateToken(refreshToken, "refresh");
    if (!tokenData) throw ApiError.BadRequestError(AuthMessages.problemWithToken);

    const tokensData = generateTokens({
      _id: tokenData.userId
    });

    if (!tokensData) {
      throw new Error("Error token");
    }

    res.cookie("refreshToken", tokensData.refreshToken, {
      domain: process.env.DOMAIN,
      path: "/",
      secure: false
    });
    res.cookie("token", tokensData.accessToken, {
      domain: process.env.DOMAIN,
      path: "/",
      secure: false
    });

    return res.status(status.SUCCESS).json({
      accessToken: tokensData.accessToken
    });
  } catch (e) {
    if (!(e instanceof Error)) return;
    return res.status(status.BAD_REQUEST).json({
      error: e.message,
      message: "Refresh token expired"
    });
  }
}
