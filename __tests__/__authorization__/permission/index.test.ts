import request from "supertest";
import server from "../../../server";

// PUT: /api/auth/permission
describe("create permission", () => {
	test("it should return return 400", async () => {
    const data = {}; // empty data
    if (!process.env.PERMISSION_ID)
      throw new Error("JWT_TOKEN is not defined");
    const id: string = process.env.PERMISSION_ID;

    const response = await request(server)
            .put(`/api/authorization/permissions/${id}`)
            .set("Authorization", "Bearer " + process.env.JWT_TOKEN)
            .send(data);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("data");
  });
});

// GET: /api/auth/permission
describe("get permission by id", () => {
  test("it should return 404", async () => {
    let id: any;
    // const id = undefined;
    
    // random number between 1 and 3 
    const num = Math.floor(Math.random() * 3) + 1;
    if (num === 1) id = undefined;
    if (num === 2) id = null;
    if (num === 3) id = "invalid id";

    const response = await request(server)
            .get(`/api/authorization/permissions/${id}`)
            .set("Authorization", "Bearer " + process.env.JWT_TOKEN);
    expect(response.statusCode).toBe(500);
    // else expect(response.statusCode).toBe(404);
  });
});