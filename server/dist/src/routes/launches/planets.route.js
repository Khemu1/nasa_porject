"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchesRouter = void 0;
const express_1 = require("express");
const dpi_1 = require("../../DPI/dpi");
exports.launchesRouter = (0, express_1.Router)();
exports.launchesRouter.get("/", dpi_1.planetController.getAllPlanets);
