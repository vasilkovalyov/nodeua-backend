import express, { Express } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./src/routes/auth";
import nodesRouter from "./src/routes/node";
import userRouter from "./src/routes/user";
import paymentRouter from "./src/routes/payment";

import databaseConnect from "./database";
import { createSuperAdmin } from "./src/services/user/user-service";

(async () => {
  const server: Express = express();

  dotenv.config({ path: ".env.local" });
  dotenv.config();

  const PORT = process.env.PORT || 8080;
  const WEBSITE_URL = process.env.WEBSITE_API_URL || "http://localhost:3000";

  server.use(bodyParser.json({ limit: "50mb" }));
  server.use(
    cors({
      credentials: true,
      origin: [WEBSITE_URL]
    })
  );

  createSuperAdmin();
  server.use(express.urlencoded({ extended: true }));
  server.use(compression());
  server.use(cookieParser());
  server.use(express.json());

  server.get("/", (_, res) => {
    return res.json({
      message: "node js message"
    });
  });

  server.use("/api", authRouter);
  server.use("/api", nodesRouter);
  server.use("/api", userRouter);
  server.use("/api", paymentRouter);

  try {
    databaseConnect(process.env.MONGO_URL)
      .then(() => {
        server.listen(PORT, () => console.log(`Server app working on port http://localhost:${PORT}`));
      })
      .catch((e) => console.log(e));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
