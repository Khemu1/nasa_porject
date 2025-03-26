const request = require("supertest");
const { app } = require("../../app.ts");
const { connectDB, disconnectDB } = require("../../config/database.config.ts");
const { loadFile } = require("../../utils/planet/index.ts");
describe("Testing planets API", () => {
  beforeAll(async () => {
    loadFile();
    await connectDB();
  });
  afterAll(async () => {
    await disconnectDB();
  });
  describe("Test GET /planets", () => {
    test("should respond with 200 success and return an array of planets", async () => {
      const response = await request(app).get("/api/planets");

      console.log("Response body:", response.body);

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
