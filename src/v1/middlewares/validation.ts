import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { badRequest } from "@utils/error";

const validation =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      next(badRequest(error.message));
    }
  };

export { validation };
