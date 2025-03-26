import { CustomError } from "../../middleware/Error";
import { ILaunch, LaunchModel } from "../../models/launches/launches.model";
import PlanetService from "../planets/planets.service";

class LaunchService {
  constructor(private readonly planetService: PlanetService) {}
  async getAllLaunches(): Promise<ILaunch[]> {
    return await LaunchModel.find().sort({ flightNumber: 1 });
  }

  async getUpcoming(): Promise<ILaunch[]> {
    return await LaunchModel.find({ upcoming: true });
  }

  async getHistory(): Promise<ILaunch[]> {
    return await LaunchModel.find({ upcoming: false });
  }

  async addNewLaunch(
    data: Omit<ILaunch, "flightNumber" | "upcoming" | "success" | "customers">
  ): Promise<ILaunch> {
    if (!data.mission || !data.rocket || !data.launchDate || !data.target) {
      throw new CustomError("Missing required fields", 400);
    }
    const planet = await this.planetService.getPlanet(data.target);
    if (!planet) {
      throw new CustomError(`Planet "${data.target}" not found`, 400);
    }
    const latestLaunch = await LaunchModel.findOne().sort("-flightNumber"); // returns the latest launch
    const nextFlightNumber = latestLaunch ? latestLaunch.flightNumber + 1 : 1;

    const newLaunch = new LaunchModel({
      ...data,
      flightNumber: nextFlightNumber,
      upcoming: true,
      success: false,
      customers: ["Zero to Mastery", "NASA"],
    });

    return await newLaunch.save();
  }

  async abortLaunch(id: string): Promise<number> {
    const result = await LaunchModel.updateOne(
      { _id: id },
      { $set: { upcoming: false, success: false } }
    );

    if (result.modifiedCount === 0) {
      throw new CustomError("Launch not found", 404);
    }
    return 1;
  }
}

export default LaunchService;
