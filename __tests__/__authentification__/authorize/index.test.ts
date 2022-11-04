import request from "supertest";
import server from "../../../server";

// // Path: __tests__/__authentification__/authorize/index.test.ts
describe("test for valid token", () => {
  test("it should return 200", async () => {
    const response = await request(server)
            .post("/api/v1/auth/authorize")
            .set("Authorization", "Bearer " + process.env.JWT_TOKEN);
    expect(response.statusCode).toBe(200);
  });
});

describe("test for invalid token", () => {
  test("it should return 401", async () => {
    const response = await request(server)
            .post("/api/v1/auth/authorize")
            .set("Authorization", "Bearer " + "invalid token");
    expect(response.statusCode).toBe(401);
  });
});