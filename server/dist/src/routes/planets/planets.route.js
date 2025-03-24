"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planetRouter = void 0;
const express_1 = require("express");
const dpi_1 = require("../../DPI/dpi");
exports.planetRouter = (0, express_1.Router)();
exports.planetRouter.get("/", dpi_1.planetController.getAllPlanets);
