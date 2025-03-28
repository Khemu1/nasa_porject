import { createServer } from "http";
import * as dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/database.config";
import { loadFile } from "./utils/planet";
import LaunchService from "./routes/launches/launches.service";
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = createServer(app);

server.listen(PORT, async () => {
  await connectDB();
  await loadFile();
  await LaunchService.getLaunchData();
  console.log(`Server is running on port ${PORT}`);
});
