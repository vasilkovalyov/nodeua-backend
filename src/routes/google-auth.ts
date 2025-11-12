import { Router } from "express";
import passport from "passport";
import { generateAccessToken, generateRefreshToken } from "../services/token/token-service";
import { COOKIES_KEYS } from "../constants/cookies";
import { UserMiddlewareAuthParams } from "../types/request";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get("/auth/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user: UserMiddlewareAuthParams) => {
    const WEBSITE_API_URL: string = process.env.WEBSITE_API_URL!;

    if (err) {
      const errorType =
        err.message === "no_email" ? "no_email" : err.message === "blocked_domain" ? "blocked_domain" : "google_failed";

      return res.redirect(`${WEBSITE_API_URL}/auth/login?error=${errorType}`);
    }

    if (!user) {
      return res.redirect(`${WEBSITE_API_URL}/auth/login?error=unauthorized`);
    }

    try {
      const userId = user.userId;

      const token = generateAccessToken(userId);
      const refreshToken = generateRefreshToken(userId);

      res.cookie(COOKIES_KEYS.accessToken, token, { secure: true, httpOnly: true, sameSite: "none" });
      res.cookie(COOKIES_KEYS.refreshToken, refreshToken, { secure: true, httpOnly: true, sameSite: "none" });

      res.redirect(`${WEBSITE_API_URL}?userId=${userId}`);
    } catch (tokenErr) {
      console.error("Token creation failed:", tokenErr);
      res.redirect(`${WEBSITE_API_URL}/auth/login?error=token_failed`);
    }
  })(req, res, next);
});

export default router;
