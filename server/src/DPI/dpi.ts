import LaunchController from "../routes/launches/launches.controller";
import PlanetController from "../routes/planets/planets.controller";

const planetController = new PlanetController();
const launchController = new LaunchController();

export { planetController, launchController };
