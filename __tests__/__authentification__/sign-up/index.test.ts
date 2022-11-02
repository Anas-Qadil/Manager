import request from 'supertest';
import server from '../../../server';

// Path: __tests__/index.test.ts
describe("Server.ts tests", () => {
  test("Math test", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(404);
  });
});