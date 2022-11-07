import request from "supertest";
import server from "../../../server";

jest.setTimeout(600000)

let token = ""; // token for admin user
let createdPermissionId = ""; // this will be used to update and delete the permission
const randomNumber = Math.floor(Math.random() * 1000) + 1; // this will be used to create a new permission
let updatedPermissionId = ""; // this will be used to update the permission

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
});

// POST: /api/v1/permissions
describe("POST: /api/v1/permissions", () => {
  it("should return 201", async () => {
    const res = await request(server)
      .post("/api/v1/permissions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Unit ${randomNumber}`,
        description: `this is a unit test permission ${randomNumber}`,
      });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    createdPermissionId = res.body.data.id;
  });
});

// PUT: /api/auth/permission
describe("PUT: /api/v1/permissions/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .put(`/api/v1/permissions/${createdPermissionId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: `Unit ${randomNumber} updated`,
        description: `this is a unit test permission ${randomNumber} updated`,
      });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
    updatedPermissionId = res.body.data.id;
  });
});

// DELETE: /api/v1/permissions/:id
describe("DELETE: /api/v1/permissions/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .delete(`/api/v1/permissions/${createdPermissionId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.archive).toBe(true);
  });
});


// GET: /api/auth/permissions/:id
describe("GET: /api/v1/permissions/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .get(`/api/v1/permissions/${updatedPermissionId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
  });
});

// GET: /api/auth/permissions (get logged int user permissions)
describe("GET: /api/v1/permissions", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .get("/api/v1/permissions")
      .set("Authorization", `Bearer ${token}`);
    if (res.status === 200) {
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("id");
    } else 
      expect(res.status).toBe(404);
  });
});

/*  ********* ALL TESTS BELOW SHOULD FAIL ********* */

// POST: /api/v1/permissions
describe("POST: /api/v1/permissions", () => {
  it("should return 400", async () => {
    const res = await request(server)
      .post("/api/v1/permissions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: undefined,
      });
    expect(res.status).toBe(400);
  });
});

// PUT: /api/auth/permission
describe("PUT: /api/v1/permissions/:id", () => {
  it("should return 400", async () => {
    const res = await request(server)
      .put(`/api/v1/permissions/65656465465465465`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "undefined",
      });
    expect(res.status).toBe(404);
  });
});

// GET: /api/auth/permissions/:id
describe("GET: /api/v1/permissions/:id", () => {
  it("should return 400", async () => {
    const res = await request(server)
      .get(`/api/v1/permissions/65656465465465465`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});