"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.sendProdError = exports.sendDevError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500, type = "server error", safe = false, details, errors) {
        super(message);
        this.details = "";
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
exports.CustomError = CustomError;
const sendDevError = (error, _req, res) => {
    const { statusCode = 500, status = "error", message, stack, type, details, errors, } = error;
    res.status(statusCode).json({
        status,
        message,
        stack,
        type,
        details,
        errors: errors || {},
    });
};
exports.sendDevError = sendDevError;
const sendProdError = (error, _req, res) => {
    const { statusCode = 500, status = "error", message, safe, type, details, errors, } = error;
    if (safe) {
        res.status(statusCode).json({
            status,
            message,
            type,
            details,
            errors: errors || {},
        });
    }
    else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};
exports.sendProdError = sendProdError;
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error(err);
    const isProd = process.env.NODE_ENV === "production";
    isProd ? (0, exports.sendProdError)(err, req, res) : (0, exports.sendDevError)(err, req, res);
};
exports.errorHandler = errorHandler;
