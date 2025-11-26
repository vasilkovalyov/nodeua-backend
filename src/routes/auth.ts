import { Router } from "express";
import { loginController, logoutController, refreshTokenController, registrationController } from "../controllers/auth";

import authMiddleware from "../middlewares/auth";

const router = Router();

router.post("/auth/login", loginController);
router.post("/auth/logout", authMiddleware, logoutController);
router.post("/auth/refresh-token", refreshTokenController);
router.post("/auth/registration", registrationController);

export default router;
