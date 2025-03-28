import { parse } from "csv-parse";
import fs from "fs";
import path from "path";
import { pipeline } from "node:stream/promises";
import { PlanetModel } from "../../models/planets/planets.model";

// swtiched to using stream/promises instead

export const loadFile = async (): Promise<void> => {
  const sourcePath = path.join(
    __dirname,
    "..",
    "..",
    "data",
    "kepler_data.csv"
  );

  const parser = parse({
    comment: "#",
    columns: true,
  });

  parser.on("data", async (row: { [key: string]: string }) => {
    try {
      if (returnHabitablePlanets(row))
        await PlanetModel.findOneAndUpdate(
          { keplerName: row.kepler_name },
          { $set: { keplerName: row.kepler_name } },
          { upsert: true, new: true }
        );
    } catch (error) {
      console.error("Error while parsing CSV:", error);
      throw error;
    }
  });

  await pipeline(fs.createReadStream(sourcePath), parser);

  console.log("Parsing is done");
};

const returnHabitablePlanets = (planet: { [key: string]: string }) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    parseFloat(planet["koi_insol"]) > 0.36 &&
    parseFloat(planet["koi_insol"]) < 1.11 &&
    parseFloat(planet["koi_prad"]) < 1.6
  );
};
