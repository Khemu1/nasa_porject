/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  statusCode: number;
  status: string;
  safe: boolean;
  type: string;
  details?: string;
  errors?: Record<string, string>;

  constructor(
    message: string,
    statusCode: number = 500,
    type: string = "server error",
    safe: boolean = false,
    details?: string,
    errors?: Record<string, string>
  ) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype); // ensure correct prototype chain
    Error.captureStackTrace(this, this.constructor); // ensure proper stack trace

    this.statusCode = statusCode;
    this.status = statusCode >= 200 && statusCode < 300 ? "success" : "fail";
    this.safe = safe;
    this.details = details;
    this.type = type;
    this.errors = errors;
  }
}

export const sendDevError = (
  error: CustomError,
  _req: Request,
  res: Response
) => {
  const { statusCode, status, message, stack, type, details, errors } = error;

  console.error("🚨 Error Details:", {
    statusCode,
    status,
    message,
    type,
    details,
    errors,
    stack,
  });

  res.status(statusCode).json({
    status,
    message,
    stack,
    type,
    details,
    errors: errors || {},
  });
};

export const sendProdError = (
  error: CustomError,
  _req: Request,
  res: Response
) => {
  const { statusCode, status, message, safe, type, details, errors } = error;

  if (safe) {
    res.status(statusCode).json({
      status,
      message,
      type,
      details,
      errors: errors || {},
    });
  } else {
    console.error("Critical Error (Hidden in Response)", {
      statusCode,
      message,
      type,
      details,
      errors,
    });

    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  const isProd = process.env.NODE_ENV === "production";

  console.error("Error Caught:", err.message);
  console.error("Stack Trace:", err.stack);

  isProd ? sendProdError(err, req, res) : sendDevError(err, req, res);
};
