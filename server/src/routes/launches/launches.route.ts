import { Router } from "express";
import { launchController } from "../../DPI/dpi";

export const launchesRouter = Router();

launchesRouter.get("/upcoming", launchController.getUpComing);
launchesRouter.get("/history", launchController.getHistory);
launchesRouter.get("/", launchController.getAll);
launchesRouter.delete("/:id", launchController.abortlaunch);
launchesRouter.post("/", launchController.addLaunch);
