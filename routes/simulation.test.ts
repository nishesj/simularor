import request from "supertest";
import app from "../app";

describe("get  matches /api/v1/matches", () => {
  test("should return array of matches", async () => {
    const res = await request(app).get("/api/v1/simulations");
    expect(res.statusCode).toEqual(200);
    expect(res.body.matches).toBeDefined();
    expect(res.body.totalScore).toBeDefined();
    expect(res.body.scores).toBeDefined();
    expect(res.body.id).toBeDefined();
    expect(res.body.matches.length).toEqual(3);
  });
});
