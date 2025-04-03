const request = require("supertest");
const { app } = require("../../app.ts");
const { connectDB, disconnectDB } = require("../../config/database.config.ts");
const LaunchService = require("./launches.service.ts").default;

const ROUTE = "/api/v1/launches";

describe("Testing launches API", () => {
  beforeAll(async () => {
    await connectDB();
    await LaunchService.getLaunchData();
  });
  afterAll(async () => {
    await disconnectDB();
  });
  describe("Test GET /launches", () => {
    test("should respond with 200 success and return an array", async () => {
      const response = await request(app).get(ROUTE);

      console.log("Response body:", response.body);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("Test POST /launches", () => {
    test("should create a new launch and return 201", async () => {
      /**
       * @type {import("../../models/launches.model").Launch}
       */
      const newLaunch = {
        mission: "Mission 1",
        rocket: "Falcon 9",
        launchDate: "2025-12-01",
        target: "Kepler-1410 b",
      };

      const response = await request(app)
        .post(ROUTE)
        .send(newLaunch)
        .set("Content-Type", "application/json");

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      expect(response.status).toBe(201);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toHaveProperty("flightNumber");
    });

    test("should return 400 due to missing field or wrong field type", async () => {
      /**
       * @type {import("../../models/launches.model").Launch}
       */
      const invalidLaunch = {
        mission: "Mission 1",
        rocket: "Falcon 9",
        launchDate: "abcd", // Invalid date
        target: "Mars",
      };

      const response = await request(app)
        .post(ROUTE)
        .send(invalidLaunch)
        .set("Content-Type", "application/json");

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toHaveProperty("message");
    });

    test("should return 400 due not finding the planet", async () => {
      /**
       * @type {import("../../models/launches.model").Launch}
       */
      const invalidLaunch = {
        mission: "Mission 1",
        rocket: "Falcon 9",
        launchDate: "2025-12-01",
        target: "Mars",
      };

      const response = await request(app)
        .post(ROUTE)
        .send(invalidLaunch)
        .set("Content-Type", "application/json");

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      expect(response.status).toBe(400);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.body).toHaveProperty("message");
    });
  });
});
