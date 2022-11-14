import request from "supertest";
import server from "../../server";

jest.setTimeout(600000);
let token = ""; // token for admin user
let createdProfile = ""; // this will be used to update and delete the profile

beforeAll(async () => {
  // get token
  const res = await request(server)
    .post("/api/v1/auth/sign-in")
    .send({
      username: "anas",
      password: "anas"
    });
  token = res.body.token;
});

const fakeProfileData = {
	"fullName": "unit test",
	"ref": "unit test",
	"idCardNumber": "123456789",
	"idCardExpiryDate": "2020-01-01",
	"dateOfBirth": "1990-01-01",
	"placeOfBirth": "Jakarta",
	"nationality": "Indonesia",
	"gender": "M",
	"city": "Jakarta",
	"address": "Jl. Jalan",
	"imageUrl": "https://www.w3schools.com/howto/img_avatar.png",
	"agentID": "6372246a959e42539c7328a" + (Math.floor(Math.random() * 5) + 1).toString(),
}

// POST: /api/v1/profile
describe("POST: /api/v1/user-profile", () => {
	it("should return 201", async () => {
		const res = await request(server)
			.post("/api/v1/user-profile")
			.set("Authorization", `Bearer ${token}`)
			.send(fakeProfileData);

		expect(res.status).toBe(201);
		expect(res.body.data).toHaveProperty("id");
		createdProfile = res.body.data.id;
	});
});

// GET: /api/v1/user-role/:id
describe("GET: /api/v1/user-role/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.get(`/api/v1/user-profile/${createdProfile}`)
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
	});
});

// PUT: /api/v1/user-role/:id
describe("PUT: /api/v1/user-role/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.put(`/api/v1/user-profile/${createdProfile}`)
			.set("Authorization", `Bearer ${token}`)
			.send({...fakeProfileData, fullName: "unit test updated" });
		expect(res.status).toBe(200);
		expect(res.body.data).toHaveProperty("id");
		expect(res.body.data.fullName).toBe("unit test updated");
	});
});

// DELETE: /api/v1/user-role/:id
describe("DELETE: /api/v1/user-role/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.delete(`/api/v1/user-profile/${createdProfile}`)
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.data).toHaveProperty("id");
		expect(res.body.data.archive).toBe(true);
	});
});