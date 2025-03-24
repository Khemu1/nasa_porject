import http from "http";
import { app } from "./app";
import { processPlanets } from "./models/planets.model";
import { mapLaunches } from "./models/launches.model";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, async () => {
  await processPlanets();
  mapLaunches();
  console.log(`Server is running on port ${PORT}`);
});
