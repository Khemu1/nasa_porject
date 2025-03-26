import LaunchController from "../routes/launches/launches.controller";
import LaunchService from "../routes/launches/launches.service";
import PlanetController from "../routes/planets/planets.controller";
import PlanetService from "../routes/planets/planets.service";

const planetService = new PlanetService();
const launchService = new LaunchService(planetService);
const planetController = new PlanetController(planetService);
const launchController = new LaunchController(launchService);

export { planetController, launchController, launchService, planetService };
