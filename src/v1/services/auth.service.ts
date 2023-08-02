import bcrypt from "bcrypt";
import { checkExistingUser, insertUser } from "@repositories/auth.repository";
import { generateAccessToken } from "@utils/generateAccessToken";
import { badRequest, unauthorized } from "@utils/error";
import { ILogin, ISignup } from "@interfaces/auth";

const signup = async ({ name, email, password, confirmPassword }: ISignup) => {
  const userRes = await checkExistingUser(email);

  if (userRes?.rowCount) {
    throw badRequest("User already exists");
  }

  const isMatch = password === confirmPassword;

  if (!isMatch) {
    throw badRequest("Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userInsertRes = await insertUser(name, email, hashedPassword);

  const userData = userInsertRes?.rows[0];

  const accessToken = generateAccessToken(userData);

  return {
    accessToken,
    userData,
  };
};

const login = async ({ email, password }: ILogin) => {
  const userRes = await checkExistingUser(email);

  if (!userRes?.rowCount) {
    throw unauthorized("Invalid credentials");
  }

  const { password: userPassword, ...rest } = userRes.rows[0];

  const passwordMatch = await bcrypt.compare(password, userPassword);

  if (!passwordMatch) {
    throw unauthorized("Invalid credentials");
  }

  const accessToken = generateAccessToken(rest);

  return {
    accessToken,
    userData: rest,
  };
};

export { signup, login };
