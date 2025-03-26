import { Request, Response, NextFunction } from "express";

import LaunchService from "./launches.service";
import { ILaunch } from "../../models/launches/launches.model";

export default class LaunchController {
  constructor(private readonly launchService: LaunchService) {}

  getUpComing = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const upcoming = await this.launchService.getUpcoming();
      res.status(200).json(upcoming);
    } catch (error) {
      next(error);
    }
  };
  getHistory = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const history = await this.launchService.getHistory();

      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  };
  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const launches = await this.launchService.getAllLaunches();

      res.status(200).json(launches);
    } catch (error) {
      next(error);
    }
  };
  abortlaunch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await this.launchService.abortLaunch(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  addLaunch = async (
    req: Request<
      {},
      {},
      Omit<ILaunch, "flightNumber" | "upcoming" | "success" | "customers">
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      const newLaunch = await this.launchService.addNewLaunch(data);
      res.status(201).json(newLaunch);
    } catch (error) {
      next(error);
    }
  };
}
