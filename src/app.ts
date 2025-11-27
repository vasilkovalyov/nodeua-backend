import express, { Express } from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";

import authRouter from "./routes/auth";
import nodeRouter from "./routes/node";
import adminNodeRouter from "./routes/admin-node";
import userRouter from "./routes/user";
import paymentRouter from "./routes/payment";
import googleAuthRouter from "./routes/google-auth";

import { createSuperAdmin } from "./services/user/user-service";

import { googleAuth } from "./services/passport";

const app: Express = express();

dotenv.config({ path: ".env.local" });
dotenv.config();

const WEBSITE_URL = process.env.WEBSITE_API_URL || "http://localhost:3000";

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    credentials: true,
    origin: [WEBSITE_URL, "http://localhost:3000"]
  })
);

createSuperAdmin();
googleAuth();

app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "node js message"
  });
});

app.use("/api", authRouter);
app.use("/api", nodeRouter);
app.use("/api/user", userRouter);
app.use("/api", paymentRouter);
app.use("/api", googleAuthRouter);
app.use("/api/admin", adminNodeRouter);

export default app;
