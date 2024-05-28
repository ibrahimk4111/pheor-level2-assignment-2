import { NextFunction, Request, Response } from "express";
export const errorHandler = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,
  error: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode: number = error.status || 500;
  const message: string = error.name || error.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message: message,
    error,
  });
};
