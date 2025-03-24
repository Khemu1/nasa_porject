/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  message: string;
  statusCode: number;
  status: string;
  safe: boolean;
  type: string;
  details: string = "";
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
    this.message = message;
    this.statusCode = statusCode;
    this.status = statusCode >= 200 && statusCode < 300 ? "success" : "fail";
    this.safe = safe;
    this.details = details || "";
    this.type = type;
    this.errors = errors;
    // this.stack = new Error().stack;
  }
}

export const sendDevError = (
  error: CustomError,
  _req: Request,
  res: Response
) => {
  const {
    statusCode = 500,
    status = "error",
    message,
    stack,
    type,
    details,
    errors,
  } = error;
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
  const {
    statusCode = 500,
    status = "error",
    message,
    safe,
    type,
    details,
    errors,
  } = error;

  if (safe) {
    res.status(statusCode).json({
      status,
      message,
      type,
      details,
      errors: errors || {},
    });
  } else {
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
  console.error(err);
  const isProd = process.env.NODE_ENV === "production";

  isProd ? sendProdError(err, req, res) : sendDevError(err, req, res);
};
