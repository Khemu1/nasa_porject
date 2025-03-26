import { Schema, model, models, Document } from "mongoose";

export interface IPlanet extends Document {
  _id: string;
  keplerName: string;
}

const PlanetSchema = new Schema<IPlanet>({
  keplerName: {
    type: String,
    required: true,
  },
});

export const PlanetModel =
  models.planet || model<IPlanet>("Planet", PlanetSchema);
