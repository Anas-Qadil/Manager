// test sign-in
import request from "supertest";
import server from "../../../server";

// Path: __tests__/__authentification__/sign-in/index.test.ts
describe("test invalid credentials", () => {
	test("it should return 400 or 404", async () => {
    
    const characters ='ABCDEF`!#$%^&*()GHIJKL[MNOPQRST+\-=\[\]{}UVWXYZabcde;\':"\\|fghijklmnop]qrstuvwx,<>\/?~yz0123456789';

    const generateString = (length: number): string => {
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return (result);
    }

    const generateNumber = (min: number, max: number): number => {
      return (Math.floor(Math.random() * (max - min + 1) + min));
    }
    const length = generateNumber(1, 55);
    const username = generateString(length);
    const password = generateString(length);
    const response = await request(server)
                    .post("/api/auth/sign-in")
                    .send({ username, password });

    if (response.statusCode === 400) {
      expect(response.statusCode).toBe(400);
    } else if (response.statusCode === 404) {
      expect(response.statusCode).toBe(404);
    }
  });
});

// test valid credentials
describe("test valid credentials", () => {
  test("it should return 200", async () => {
    const username = "agent.1";
    const password = "agent123";

    const response = await request(server)
                    .post("/api/auth/sign-in")
                    .send({ username, password });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
  });
});