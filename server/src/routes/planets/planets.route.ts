import { Router } from "express";
import { planetController } from "../../DPI/dpi";

export const planetRouter = Router();

planetRouter.get("/", planetController.getAllPlanets);
