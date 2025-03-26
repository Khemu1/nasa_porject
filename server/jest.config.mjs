import * as dotev from "dotenv";
dotev.config({
  path: [".env.test"],
});
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  transform: {},
};
