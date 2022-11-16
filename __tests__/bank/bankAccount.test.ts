import request from "supertest";
import server from "../../server";

jest.setTimeout(600000);

let token = "";
let createdBankAccount = "";

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

// POST: /api/v1/bank-account
describe("POST: /api/v1/bank-account", () => {
	it("should return 201", async () => {
		const res = await request(server)
			.post("/api/v1/bank-account")
			.set("Authorization", `Bearer ${token}`)
			.send({
				bankName: "unit bankName",
				rib: "unit rib",
				companyID: "63724a2fc9d076cee6b503d7",
				userID: "63724a2fc9d076cee6b503d7"
			});
		expect(res.status).toBe(201);
		createdBankAccount = res.body.data.id;
	});
});

// GET: /api/v1/bank-account
describe("GET: /api/v1/bank-account", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.get("/api/v1/bank-account?page=1&limit=6")
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.data).toBeDefined();
		expect(res.body.count).toBeDefined();
		expect(res.body.data.length).toBeLessThanOrEqual(6);
	});
});

// GET: /api/v1/bank-account/:id
describe("GET: /api/v1/bank-account/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.get(`/api/v1/bank-account/${createdBankAccount}`)
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.data).toBeDefined();
		expect(res.body.data).toHaveProperty("id");
	});
});

// PUT: /api/v1/bank-account/:id
describe("PUT: /api/v1/bank-account/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.put(`/api/v1/bank-account/${createdBankAccount}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				bankName: "unit bankName updated",
				rib: "unit rib updated",
			});
		expect(res.status).toBe(200);
		expect(res.body.data).toBeDefined();
		expect(res.body.data).toHaveProperty("id");
	});
});

// DELETE: /api/v1/bank-account/:id
describe("DELETE: /api/v1/bank-account/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.delete(`/api/v1/bank-account/${createdBankAccount}`)
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.data).toBeDefined();
		expect(res.body.data).toHaveProperty("id");
		expect(res.body.data.archive).toBe(true);
	});
});
