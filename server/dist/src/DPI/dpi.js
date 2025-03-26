"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.planetService = exports.launchService = exports.launchController = exports.planetController = void 0;
const launches_controller_1 = __importDefault(require("../routes/launches/launches.controller"));
const launches_service_1 = __importDefault(require("../routes/launches/launches.service"));
const planets_controller_1 = __importDefault(require("../routes/planets/planets.controller"));
const planets_service_1 = __importDefault(require("../routes/planets/planets.service"));
const planetService = new planets_service_1.default();
exports.planetService = planetService;
const launchService = new launches_service_1.default(planetService);
exports.launchService = launchService;
const planetController = new planets_controller_1.default(planetService);
exports.planetController = planetController;
const launchController = new launches_controller_1.default(launchService);
exports.launchController = launchController;
