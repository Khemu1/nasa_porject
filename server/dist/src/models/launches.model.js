"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newLaunch = exports.getHistory = exports.getUpComing = exports.getAll = exports.abortlaunch = exports.mapLaunches = void 0;
const Error_1 = require("../middleware/Error");
// Sample data
const data = [
    {
        flightNumber: 1,
        mission: "Mars Orbiter",
        rocket: "Falcon 9",
        launchDate: new Date("2025-06-01"),
        target: "Mars",
        customers: ["NASA"],
        upcoming: true,
        success: false,
    },
    {
        flightNumber: 2,
        mission: "Moon Lander",
        rocket: "Starship",
        launchDate: new Date("2026-08-15"),
        target: "Moon",
        customers: ["SpaceX", "ESA"],
        upcoming: true,
        success: true,
    },
    {
        flightNumber: 3,
        mission: "Moon Lander 2",
        rocket: "Starship",
        launchDate: new Date("2027-08-15"),
        target: "Moon",
        customers: ["SpaceX", "ESA"],
        upcoming: false,
        success: true,
    },
];
const launches = new Map();
const mapLaunches = () => {
    data.forEach((launch) => {
        launches.set(launch.flightNumber, launch);
    });
    console.log("Launches mapped successfully.");
};
exports.mapLaunches = mapLaunches;
const abortlaunch = (id) => {
    if (isNaN(id)) {
        throw new Error_1.CustomError("invalid id", 400);
    }
    const launch = launches.get(id);
    if (!launch) {
        throw new Error_1.CustomError("launch not found", 404);
    }
    const updated = Object.assign(Object.assign({}, launch), { upcoming: false });
    launches.set(id, updated);
    return updated;
};
exports.abortlaunch = abortlaunch;
const getAll = () => {
    return Array.from(launches.values()).sort((a, b) => a.flightNumber - b.flightNumber);
};
exports.getAll = getAll;
const getUpComing = () => {
    return Array.from(launches.values()).filter((l) => l.upcoming);
};
exports.getUpComing = getUpComing;
const getHistory = () => {
    return Array.from(launches.values()).filter((l) => !l.upcoming);
};
exports.getHistory = getHistory;
const newLaunch = (data) => {
    const id = launches.size + 1;
    const launch = Object.assign(Object.assign({}, data), { flightNumber: id, upcoming: true, success: false, customers: ["Zero to Mastery", "NASA"] });
    launches.set(id, launch);
    console.log("map ", launches);
    return launch;
};
exports.newLaunch = newLaunch;
