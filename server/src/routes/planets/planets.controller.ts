import { Request, Response, NextFunction } from "express";
import { planets } from "../../models/planets.model";

export default class PlanetController {
  constructor() {}

  getAllPlanets = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(planets);
    } catch (error) {
      next(error);
    }
  };
}
