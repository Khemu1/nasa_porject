"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.sendProdError = exports.sendDevError = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, statusCode = 500, type = "server error", safe = false, details, errors) {
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
exports.CustomError = CustomError;
const sendDevError = (error, _req, res) => {
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
exports.sendDevError = sendDevError;
const sendProdError = (error, _req, res) => {
    const { statusCode, status, message, safe, type, details, errors } = error;
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
exports.sendProdError = sendProdError;
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const isProd = process.env.NODE_ENV === "production";
    console.error("Error Caught:", err.message);
    console.error("Stack Trace:", err.stack);
    isProd ? (0, exports.sendProdError)(err, req, res) : (0, exports.sendDevError)(err, req, res);
};
exports.errorHandler = errorHandler;
