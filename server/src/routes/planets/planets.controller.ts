import { Request, Response, NextFunction } from "express";
import PlanetService from "./planets.service";

export default class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  getAllPlanets = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const planets = await this.planetService.getPlanets();
      res.status(200).json(planets);
    } catch (error) {
      next(error);
    }
  };
}
