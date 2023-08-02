import express from "express";
import { login, signup } from "@services/auth.service";
import { validation } from "@middlewares/validation";
import { loginSchema, signupSchema } from "@validation/auth";

const router = express.Router();

router.post("/signup", validation(signupSchema), async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const { accessToken, userData } = await signup({
      name,
      email,
      password,
      confirmPassword,
    });

    res.status(200).json({
      accessToken,
      user: userData,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", validation(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken, userData } = await login({
      email,
      password,
    });

    res.status(200).json({
      accessToken,
      user: userData,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
