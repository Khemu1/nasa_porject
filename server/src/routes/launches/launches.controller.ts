import { Request, Response, NextFunction } from "express";
import {
  getAll,
  getHistory,
  getUpComing,
  abortlaunch as abort,
  Launch,
  newLaunch,
} from "../../models/launches.model";
import { CustomError } from "../../middleware/Error";

export default class LaunchController {
  constructor() {}

  getUpComing = (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(getUpComing());
    } catch (error) {
      next(error);
    }
  };
  getHistory = (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(getHistory());
    } catch (error) {
      next(error);
    }
  };
  getAll = (_req: Request, res: Response, next: NextFunction) => {
    try {
      // don't forget to transform the map into an array -_-
      res.status(200).json(getAll());
    } catch (error) {
      next(error);
    }
  };
  abortlaunch = (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      res.status(200).json(abort(+id));
    } catch (error) {
      next(error);
    }
  };

  addLaunch = (
    req: Request<
      {},
      {},
      Omit<Launch, "flightNumber" | "upcoming" | "success" | "customers">
    >,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = req.body;
      console.log("req body", data);
      const requiredKeys: Array<
        keyof Omit<
          Launch,
          "flightNumber" | "upcoming" | "success" | "customers"
        >
      > = ["mission", "rocket", "launchDate", "target"];

      for (const key of requiredKeys) {
        if (!data[key]) {
          throw new CustomError(`Missing required field: ${key}`, 400);
        }
      }

      if (typeof data.mission !== "string" || data.mission.trim() === "") {
        throw new CustomError("invalid mission", 400);
      }
      if (typeof data.rocket !== "string" || data.rocket.trim() === "") {
        throw new CustomError("invalid rocket", 400);
      }
      if (typeof data.target !== "string" || data.target.trim() === "") {
        throw new CustomError("invalid target", 400);
      }

      const launchDate = new Date(data.launchDate);
      if (isNaN(launchDate.getTime())) {
        throw new CustomError("invalid launch date", 400);
      }
      data.launchDate = launchDate;

      const launch = newLaunch(data);

      res.status(201).json(launch);
    } catch (error) {
      next(error);
    }
  };
}
