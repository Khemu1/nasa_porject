"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const planets_model_1 = require("../../models/planets.model");
class PlanetController {
    constructor() {
        this.getAllPlanets = (req, res, next) => {
            try {
                res.status(200).json(planets_model_1.planets);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = PlanetController;
