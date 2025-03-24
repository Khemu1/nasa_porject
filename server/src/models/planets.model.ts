import { loadFile } from "../utils/planet";

export interface Planet {
  kepler_name: string;
  name: string;
  mass: number;
  radius: number;
  distance: number;
  orbital_period: number;
  eccentricity: number;
  semi_major_axis: number;
  inclination: number;
  ascending_node_longitude: number;
  periapsis_argument: number;
  longitude_of_ascending_node: number;
  mean_anomaly: number;
  orbital_velocity: number;
  orbital_eccentricity_anomaly: number;
  orbital_period_days: number;
  semi_major_axis_au: number;
  semi_major_axis_km: number;
  semi_major_axis_ly: number;
  semi_major_axis_pc: number;
  semi_major_axis_au_rounded: number;
  semi_major_axis_km_rounded: number;
}

export let planets: Planet[] = [];

export const processPlanets = async () => {
  planets = await loadFile();
};
// Immediately resolve the promise
