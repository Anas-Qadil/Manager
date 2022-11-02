import request from "supertest";
import server from "../../../server";

// // Path: __tests__/__authentification__/authorize/index.test.ts
describe("POST /authorize", () => {
  test("it should return 200", async () => {
    const response = await request(server)
            .post("/api/auth/authorize")
            .set("Authorization", "Bearer " + process.env.JWT_TOKEN);
    expect(response.statusCode).toBe(200);
  });
});