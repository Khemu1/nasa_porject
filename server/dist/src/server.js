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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const planets_model_1 = require("./models/planets.model");
const launches_model_1 = require("./models/launches.model");
const PORT = process.env.PORT || 8000;
const server = http_1.default.createServer(app_1.app);
server.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, planets_model_1.processPlanets)();
    (0, launches_model_1.mapLaunches)();
    console.log(`Server is running on port ${PORT}`);
}));
