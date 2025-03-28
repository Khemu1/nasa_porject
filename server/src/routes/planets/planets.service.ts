import { IPlanet, PlanetModel } from "../../models/planets/planets.model";

class PlanetService {
  async getPlanets(): Promise<IPlanet[]> {
    const plents = await PlanetModel.find().sort({ keplerName: 1 });
    console.log("fetched planets", plents.length);
    return plents;
  }
  async getPlanet(keplerName: string): Promise<IPlanet | null> {
    return await PlanetModel.findOne({ keplerName });
  }
}

export default PlanetService;
