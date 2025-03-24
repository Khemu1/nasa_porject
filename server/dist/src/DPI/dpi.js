"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchController = exports.planetController = void 0;
const launches_controller_1 = __importDefault(require("../routes/launches/launches.controller"));
const planets_controller_1 = __importDefault(require("../routes/planets/planets.controller"));
const planetController = new planets_controller_1.default();
exports.planetController = planetController;
const launchController = new launches_controller_1.default();
exports.launchController = launchController;
