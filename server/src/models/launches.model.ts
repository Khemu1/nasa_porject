import { CustomError } from "../middleware/Error";

export interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string;
  launchDate: Date;
  target: string;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}

// Sample data
const data: Launch[] = [
  {
    flightNumber: 1,
    mission: "Mars Orbiter",
    rocket: "Falcon 9",
    launchDate: new Date("2025-06-01"),
    target: "Mars",
    customers: ["NASA"],
    upcoming: true,
    success: false,
  },
  {
    flightNumber: 2,
    mission: "Moon Lander",
    rocket: "Starship",
    launchDate: new Date("2026-08-15"),
    target: "Moon",
    customers: ["SpaceX", "ESA"],
    upcoming: true,
    success: true,
  },
  {
    flightNumber: 3,
    mission: "Moon Lander 2",
    rocket: "Starship",
    launchDate: new Date("2027-08-15"),
    target: "Moon",
    customers: ["SpaceX", "ESA"],
    upcoming: false,
    success: true,
  },
];

const launches = new Map<number, Launch>();

export const mapLaunches = () => {
  data.forEach((launch) => {
    launches.set(launch.flightNumber, launch);
  });
  console.log("Launches mapped successfully.");
};

export const abortlaunch = (id: number) => {
  if (isNaN(id)) {
    throw new CustomError("invalid id", 400);
  }
  const launch = launches.get(id);
  if (!launch) {
    throw new CustomError("launch not found", 404);
  }
  const updated = { ...launch, upcoming: false };
  launches.set(id, updated);
  return updated;
};

export const getAll = () => {
  return Array.from(launches.values()).sort(
    (a, b) => a.flightNumber - b.flightNumber
  );
};
export const getUpComing = () => {
  return Array.from(launches.values()).filter((l) => l.upcoming);
};
export const getHistory = () => {
  return Array.from(launches.values()).filter((l) => !l.upcoming);
};

export const newLaunch = (
  data: Omit<Launch, "flightNumber" | "upcoming" | "success" | "customers">
) => {
  const id = launches.size + 1;
  const launch: Launch = {
    ...data,
    flightNumber: id,
    upcoming: true,
    success: false,
    customers: ["Zero to Mastery", "NASA"],
  };
  launches.set(id, launch);

  console.log("map ", launches);
  return launch;
};
