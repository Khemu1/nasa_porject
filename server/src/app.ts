import express from "express";
import { planetRouter } from "./routes/planets/planets.route";
import { errorHandler } from "./middleware/Error";
import cors from "cors";
import path from "node:path";
import morgan from "morgan";
import { launchesRouter } from "./routes/launches/launches.route";

export const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(errorHandler);
// Middleware to prevent caching
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

// Logging middleware
app.use((req, _res, next) => {
  const startTime = new Date();
  next();
  const endTime = new Date();
  const duration = endTime.getTime() - startTime.getTime();
  console.log(`${req.method} - ${req.url} - ${duration}ms.`);
});

// Routes
app.use("/planets", planetRouter);
app.use("/launches", launchesRouter);

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
