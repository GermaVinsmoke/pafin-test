import { NextFunction, Request, Response } from "express";
import { ResponseError } from "@interfaces/error";

export const errorResponder = (
  error: ResponseError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.header("Content-Type", "application/json");

  const status = error.statusCode || 500;
  response
    .status(status)
    .json({ error: status === 500 ? "Something went wrong" : error.message });
};
