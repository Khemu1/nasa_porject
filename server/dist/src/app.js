"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const planets_route_1 = require("./routes/planets/planets.route");
const Error_1 = require("./middleware/Error");
const cors_1 = __importDefault(require("cors"));
const node_path_1 = __importDefault(require("node:path"));
const morgan_1 = __importDefault(require("morgan"));
const launches_route_1 = require("./routes/launches/launches.route");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.static(node_path_1.default.join(__dirname, "..", "public")));
exports.app.use((0, cors_1.default)({ origin: "*" }));
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use(express_1.default.json({
    type: ["application/json"],
}));
// middleware to prevent caching
exports.app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
});
// Logging middleware
exports.app.use((req, _res, next) => {
    const startTime = new Date();
    next();
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    console.log(`${req.method} - ${req.url} - ${duration}ms.`);
});
// Routes
exports.app.use("/planets", planets_route_1.planetRouter);
exports.app.use("/launches", launches_route_1.launchesRouter);
exports.app.get("/*", (_req, res) => {
    res.sendFile(node_path_1.default.join(__dirname, "..", "public", "index.html"));
});
// it must always the last middleware
exports.app.use(Error_1.errorHandler);
