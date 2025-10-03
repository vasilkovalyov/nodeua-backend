import express from "express";
import { loginController, refreshTokenController, registrationController } from "../controllers/auth";

const router = express.Router();

router.post("/login", (req, res) => loginController(req, res));
router.post("/refresh-token", (req, res) => refreshTokenController(req, res));
router.post("/registration", (req, res) => registrationController(req, res));

export default router;
