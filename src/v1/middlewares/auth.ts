import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { forbidden, unauthorized } from "@utils/error";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw unauthorized("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw unauthorized("Unauthorized");
    }

    req.body.user = decoded;
    next();
  });
};

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.user;
  const { id } = req.params;

  if (user.id !== id) {
    throw forbidden("Forbidden");
  }

  next();
};

export { verifyToken, authorization };
