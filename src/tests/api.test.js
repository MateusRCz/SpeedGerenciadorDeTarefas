const request = require("supertest");
const app = require("../../app");

describe("API Health Check", () => {
  it('Retornou 200 e { status: "ok" }', async () => {
    const res = await request(app).get("/api/health-check");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
