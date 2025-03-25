const request = require("supertest");
const { app } = require("../../app");

describe("Test GET /launches", () => {
  test("should respond with 200 success and return an array", async () => {
    const response = await request(app).get("/launches");

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
      target: "Mars",
    };

    const response = await request(app)
      .post("/launches")
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
      .post("/launches")
      .send(invalidLaunch)
      .set("Content-Type", "application/json");

    console.log("Response status:", response.status);
    console.log("Response body:", response.body);

    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("message");
  });
});
