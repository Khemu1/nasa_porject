"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launches_model_1 = require("../../models/launches.model");
const Error_1 = require("../../middleware/Error");
class LaunchController {
    constructor() {
        this.getUpComing = (_req, res, next) => {
            try {
                res.status(200).json((0, launches_model_1.getUpComing)());
            }
            catch (error) {
                next(error);
            }
        };
        this.getHistory = (_req, res, next) => {
            try {
                res.status(200).json((0, launches_model_1.getHistory)());
            }
            catch (error) {
                next(error);
            }
        };
        this.getAll = (_req, res, next) => {
            try {
                // don't forget to transform the map into an array -_-
                res.status(200).json((0, launches_model_1.getAll)());
            }
            catch (error) {
                next(error);
            }
        };
        this.abortlaunch = (req, res, next) => {
            try {
                const id = req.params.id;
                res.status(200).json((0, launches_model_1.abortlaunch)(+id));
            }
            catch (error) {
                next(error);
            }
        };
        this.addLaunch = (req, res, next) => {
            try {
                const data = req.body;
                console.log("req body", data);
                const requiredKeys = ["mission", "rocket", "launchDate", "target"];
                for (const key of requiredKeys) {
                    if (!data[key]) {
                        throw new Error_1.CustomError(`Missing required field: ${key}`, 400);
                    }
                }
                if (typeof data.mission !== "string" || data.mission.trim() === "") {
                    throw new Error_1.CustomError("invalid mission", 400);
                }
                if (typeof data.rocket !== "string" || data.rocket.trim() === "") {
                    throw new Error_1.CustomError("invalid rocket", 400);
                }
                if (typeof data.target !== "string" || data.target.trim() === "") {
                    throw new Error_1.CustomError("invalid target", 400);
                }
                const launchDate = new Date(data.launchDate);
                if (isNaN(launchDate.getTime())) {
                    throw new Error_1.CustomError("invalid launch date", 400);
                }
                data.launchDate = launchDate;
                const launch = (0, launches_model_1.newLaunch)(data);
                res.status(201).json(launch);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = LaunchController;
