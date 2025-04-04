import { CustomError } from "../../middleware/Error";
import { ILaunch, LaunchModel } from "../../models/launches/launches.model";
import PlanetService from "../planets/planets.service";

class LaunchService {
  constructor(private readonly planetService: PlanetService) {}
  async getAllLaunches(query?: {
    page?: number;
    limit?: number;
  }): Promise<ILaunch[]> {
    const { page = 1, limit = 10 } = query || {};
    return await LaunchModel.find()
      .sort({ flightNumber: 1 })
      .limit(limit)
      .skip((page - 1) * limit);
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
  static getLaunchData = async () => {
    try {
      const firstLaunchExists = await LaunchModel.findOne({
        mission: "FalconSat",
        flightNumber: 1,
      });

      if (firstLaunchExists) {
        console.log("won't be fetching data from spaceX, data already exists");
        return;
      }
      console.log("Starting to fetch data from SpaceX");

      const response = await fetch(process.env.SPACEX_URL ?? "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: {},
          options: {
            pagination: false,
            populate: [
              { path: "rocket", select: { name: 1 } },
              { path: "payloads", select: { customers: 1 } },
            ],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error while fetching data from SpaceX! Status: ${response.status}`
        );
      }

      const data: { docs: ILaunchData[] } = await response.json();
      console.log("Successfully fetched SpaceX data:", data.docs.length);

      console.log("starting insetion");

      await Promise.all(
        data.docs.map(async (launchData) => {
          return await LaunchModel.findOneAndUpdate(
            {
              mission: launchData.name,
              flightNumber: launchData.flight_number,
            },
            {
              $set: {
                rocket: launchData.rocket.name,
                launchDate: launchData.date_local,
                customers: launchData.payloads.flatMap(
                  (payload) => payload.customers
                ),
                upcoming: launchData.upcoming,
                success: launchData.success,
              },
            },
            { upsert: true, new: true }
          );
        })
      );

      return data;
    } catch (error) {
      console.error("Error getting launch data from SpaceX:", error);
    }
  };
}

export default LaunchService;
