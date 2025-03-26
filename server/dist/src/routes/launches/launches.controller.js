"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class LaunchController {
    constructor(launchService) {
        this.launchService = launchService;
        this.getUpComing = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const upcoming = yield this.launchService.getUpcoming();
                res.status(200).json(upcoming);
            }
            catch (error) {
                next(error);
            }
        });
        this.getHistory = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const history = yield this.launchService.getHistory();
                res.status(200).json(history);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAll = (_req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const launches = yield this.launchService.getAllLaunches();
                res.status(200).json(launches);
            }
            catch (error) {
                next(error);
            }
        });
        this.abortlaunch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.launchService.abortLaunch(id);
                res.status(200).json(result);
            }
            catch (error) {
                next(error);
            }
        });
        this.addLaunch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const newLaunch = yield this.launchService.addNewLaunch(data);
                res.status(201).json(newLaunch);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = LaunchController;
