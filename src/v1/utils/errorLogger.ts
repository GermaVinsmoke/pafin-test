import { NextFunction, Request, Response } from "express";
import { ResponseError } from "@interfaces/error";
import logger from "../../../logger";

export const errorLogger = (
  error: ResponseError,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logger.error(error.message);
  next(error);
};
