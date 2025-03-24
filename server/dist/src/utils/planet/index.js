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
exports.loadFile = void 0;
const csv_parse_1 = require("csv-parse");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const promises_1 = require("node:stream/promises");
// swtiched to using stream/promises instead
const loadFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = [];
    const sourcePath = path_1.default.join(__dirname, "..", "..", "database", "kepler_data.csv");
    const parser = (0, csv_parse_1.parse)({
        comment: "#",
        columns: true,
    });
    parser.on("data", (row) => {
        if (returnHabitablePlanets(row))
            result.push(row);
    });
    yield (0, promises_1.pipeline)(fs_1.default.createReadStream(sourcePath), parser);
    console.log("Parsing is done");
    console.log("Total planets that meet the condition:", result.length);
    return result;
});
exports.loadFile = loadFile;
const returnHabitablePlanets = (planet) => {
    return (planet["koi_disposition"] === "CONFIRMED" &&
        parseFloat(planet["koi_insol"]) > 0.36 &&
        parseFloat(planet["koi_insol"]) < 1.11 &&
        parseFloat(planet["koi_prad"]) < 1.6);
};
