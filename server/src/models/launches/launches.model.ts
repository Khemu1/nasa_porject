import { Schema, model, models, Document } from "mongoose";

export interface ILaunch extends Document {
  _id: string;
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  target: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

const launchesSchema = new Schema<ILaunch>({
  flightNumber: { type: Number, required: true, unique: true },
  mission: { type: String, required: true },
  rocket: { type: String, required: true },
  launchDate: { type: Date, required: true },
  target: { type: String, required: true },
  customers: [String],
  upcoming: { type: Boolean, required: true },
  success: { type: Boolean, required: true },
});
launchesSchema.set("toJSON", {
  transform: function (doc, ret) {
    // removes __v
    delete ret.__v;
    return ret;
  },
});

export const LaunchModel =
  models.Launch || model<ILaunch>("Launch", launchesSchema);
