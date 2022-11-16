import request from "supertest";
import server from "../../server";

jest.setTimeout(600000);

let token = "";
let createdCompany = "";

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

// POST: /api/v1/company
describe("POST: /api/v1/company", () => {
	it("should return 201", async () => {
		const res = await request(server)
			.post("/api/v1/company")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "unit test name",
				address: "unit test address",
				city: "unit test city",
				country: "MOROCCO",
				rc: "unit test rc",
				cnssNumber: "unit test cnssNumber",
				idFiscal: "unit test idFiscal",
				taxNumber: "unit test taxNumber",
				companyCommunID: "unit test companyCommunID",
				agentID: "63724a2fc9d076cee6b503d7",
				userID: "63724a2fc9d076cee6b503d7"
			});
		expect(res.status).toBe(201);
		expect(res.body.data).toHaveProperty("id");
		createdCompany = res.body.data.id;
	});
});

// PUT: /api/v1/company
describe("PUT: /api/v1/company/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.put(`/api/v1/company/${createdCompany}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "unit test name updated",
				address: "unit test address updated",
				city: "unit test city updated",
				country: "MOROCCO",
				rc: "unit test rc updated",
				cnssNumber: "unit test cnssNumber updated",
				idFiscal: "unit test idFiscal updated",
				taxNumber: "unit test taxNumber updated",
				companyCommunID: "unit test companyCommunID updated",
				agentID: "63724a2fc9d076cee6b503d7",
				userID: "63724a2fc9d076cee6b503d7"
			});
		expect(res.status).toBe(200);
		expect(res.body.data).toHaveProperty("id");
	});
});

// GET: /api/v1/company/:id
describe("GET: /api/v1/company/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.get(`/api/v1/company/${createdCompany}`)
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.data).toHaveProperty("id");
	});
});

// GET: /api/v1/company [PAGINATION]
describe("GET: /api/v1/company [PAGINATION]", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.get("/api/v1/company?page=1&limit=5")
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("count");
		expect(res.body.data.length).toBeLessThan(6);
	});
});

// DELETE: /api/v1/company/:id
describe("DELETE: /api/v1/company/:id", () => {
	it("should return 200", async () => {
		const res = await request(server)
			.delete(`/api/v1/company/${createdCompany}`)
			.set("Authorization", `Bearer ${token}`);
		expect(res.status).toBe(200);
		expect(res.body.data).toHaveProperty("id");
		expect(res.body.data.archive).toBe(true);
	});
});