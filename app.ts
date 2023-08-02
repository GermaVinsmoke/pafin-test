import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "@controllers/auth.controller";
import userRouter from "@controllers/user.controller";
import { errorResponder } from "@utils/errorResponder";
import { errorLogger } from "@utils/errorLogger";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(errorLogger);
app.use(errorResponder);

export default app;
