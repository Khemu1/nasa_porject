import { Router } from "express";
import { launchesRouter } from "./launches/launches.route";
import { planetRouter } from "./planets/planets.route";
import { CustomError } from "../middleware/Error";

export const api = Router();
api.use("/planets", planetRouter);
api.use("/launches", launchesRouter);

api.use("*", () => {
  throw new CustomError("Page not found", 404, "", true);
});
