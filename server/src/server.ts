import http from "http";
import * as dotenv from "dotenv";
import { app } from "./app";
import { connectDB } from "./config/database.config";
import { loadFile } from "./utils/planet";
dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, async () => {
  await connectDB();
  await loadFile();
  console.log(`Server is running on port ${PORT}`);
});
