const request = require("supertest");
const { app } = require("../../app.ts");
const { connectDB, disconnectDB } = require("../../config/database.config.ts");
const { loadFile } = require("../../utils/planet/index.ts");

const ROUTE = "/api/v1/planets";
describe("Testing planets API", () => {
  beforeAll(async () => {
    await connectDB();
    await loadFile();
  });
  afterAll(async () => {
    await disconnectDB();
  });
  describe("Test GET /planets", () => {
    test("should respond with 200 success and return an array of planets", async () => {
      const response = await request(app).get(ROUTE);

      console.log("Response body:", response.body);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
