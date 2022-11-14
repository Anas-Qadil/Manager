import request from "supertest";
import server from "../../server";

jest.setTimeout(600000)

let token = ""; // token for admin user
let createdPermissionId = ""; // this will be used to update and delete the permission
let createdRole = ""; // this will be used to update and delete the role
const randomNumber = Math.floor(Math.random() * 1000) + 1; // this will be used to create a new role
let updatedRole = ""; // this will be used to update the role

/*  ********* ALL TESTS BELOW SHOULD PASS ********* */

beforeAll(async () => {
  // get token
  const res = await request(server)
	.post("/api/v1/auth/sign-in")
	.send({
	  username: "anas",
	  password: "anas"
	});
  token = res.body.token;

  // create a permission
  const permission = await request(server)
    .post("/api/v1/permissions")
    .set("Authorization", `Bearer ${token}`)
    .send({
        name: `Unit ${randomNumber}`,
        description: `this is a unit test permission ${randomNumber}`,
    });
    createdPermissionId = permission.body.data.id;

});

// POST: /api/v1/role
describe("POST: /api/v1/role", () => {
  it("should return 201", async () => {
    const res = await request(server)
      .post("/api/v1/role")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Unit ${randomNumber}`
      });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    createdRole = res.body.data.id;
  });
});

// PUT: /api/v1/role
describe("PUT: /api/v1/role/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .put(`/api/v1/role/${createdRole}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Unit ${randomNumber} updated`,
        permissionIDs: [createdPermissionId]
      });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
    updatedRole = res.body.data.id;
  });
});

// DELETE: /api/v1/role/:id
describe("DELETE: /api/v1/role/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .delete(`/api/v1/role/${updatedRole}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});

// GET: /api/v1/role/:id
describe("GET: /api/v1/role/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .get(`/api/v1/role/${updatedRole}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});

/* ********* ALL TESTS BELOW SHOULD FAIL! ********* */

// POST: /api/v1/role
describe("POST: /api/v1/role", () => {
  it("should return 400", async () => {
    const res = await request(server)
      .post("/api/v1/role")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
  });
});