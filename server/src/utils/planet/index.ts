import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { pipeline } from "node:stream/promises";
import { Planet } from "../../models/planets.model";

// swtiched to using stream/promises instead

export const loadFile = async (): Promise<Planet[]> => {
  const result: Planet[] = [];
  const sourcePath = path.join(
    __dirname,
    "..",
    "..",
    "database",
    "kepler_data.csv"
  );

  const parser = parse({
    comment: "#",
    columns: true,
  });

  parser.on("data", (row) => {
    if (returnHabitablePlanets(row)) result.push(row);
  });

  await pipeline(fs.createReadStream(sourcePath), parser);

  console.log("Parsing is done");
  console.log("Total planets that meet the condition:", result.length);

  return result;
};

const returnHabitablePlanets = (planet: { [key: string]: string }) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    parseFloat(planet["koi_insol"]) > 0.36 &&
    parseFloat(planet["koi_insol"]) < 1.11 &&
    parseFloat(planet["koi_prad"]) < 1.6
  );
};
