import jwt from "jsonwebtoken";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
