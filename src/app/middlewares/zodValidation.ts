import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const ZodValidation = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error); 
      }
    }
  };
};
