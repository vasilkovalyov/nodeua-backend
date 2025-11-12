import express from "express";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registrationController,
  profileController
} from "../controllers/auth";

import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.post("/auth/login", loginController);
router.post("/auth/logout", logoutController);
router.post("/auth/refresh-token", refreshTokenController);
router.post("/auth/registration", registrationController);
router.get("/auth/profile", authMiddleware, profileController);

export default router;
