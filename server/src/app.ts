import express from "express";
import { errorHandler } from "./middleware/Error";
import cors from "cors";
import path from "node:path";
import morgan from "morgan";
import { api } from "./routes/api";
import helmet from "helmet";

export const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(
  express.json({
    type: ["application/json"],
  })
);
app.use(helmet());
// middleware to prevent caching
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

app.use("/api/v1", api);

app.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// it must always the last middleware
app.use(errorHandler);
