import request from "supertest";
import server from "../../../server";

jest.setTimeout(600000);

let token = ""; // token for admin user
let createdPermissionId = ""; // this will be used to update and delete the permission
const randomNumber = Math.floor(Math.random() * 1000) + 1; // this will be used to create a new permission
let createdRole = ""; // this will be used to update and delete the role
let guestID  = ""; // this will be used to update and delete the guest role
let guest_roleID = ""; // this will be used to update and delete the guest role
let updatedGuestRole = ""; // this will be used to update the guest role


/*  ********* ALL TESTS BELOW SHOULD PASS ********* */
beforeAll(async () => {
  // get token
  const res = await request(server)
    .post("/api/v1/auth/sign-in")
    .send({
      username: "anas",
      password: "anas",
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

  // create a role
  const role = await request(server)
    .post("/api/v1/role")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: `Unit ${randomNumber}`,
      permissionIDs: [createdPermissionId],
    });
  createdRole = role.body.data.id;

  // create a guest account
  const guest = await request(server)
    .post("/api/v1/auth/sign-up")
    .set("Authorization", `Bearer ${token}`)
    .send({
      username: `Unit${randomNumber}`,
      password: `Unit${randomNumber}`,
      matricule: `Unit ${randomNumber}`,
    });
  guestID = guest.body.data.id;
});

// POST: /api/v1/guest-role
describe("POST: /api/v1/guest-role", () => {
  it("should return 201", async () => {
    const res = await request(server)
      .post("/api/v1/guest-role")
      .set("Authorization", `Bearer ${token}`)
      .send({
        roleID: createdRole,
        guestID: guestID,
      });
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("id");
    guest_roleID = res.body.data.id;
  });
});

// PUT: /api/v1/guest-role
describe("PUT: /api/v1/guest-role/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .put(`/api/v1/guest-role/${guest_roleID}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        roleID: createdRole,
        guestID: guestID,
      });
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
    updatedGuestRole = res.body.data.id;
  });
});

// DELETE: /api/v1/guest-role
describe("DELETE: /api/v1/guest-role/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .delete(`/api/v1/guest-role/${updatedGuestRole}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
  });
});

// GET: /api/v1/guest-role
describe("GET: /api/v1/guest-role", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .get("/api/v1/guest-role")
      .set("Authorization", `Bearer ${token}`);
    if (res.status === 200) {
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("id");
    } else {
      expect(res.status).toBe(404);
    }
  });
});

// GET: /api/v1/guest-role/:id
describe("GET: /api/v1/guest-role/:id", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .get(`/api/v1/guest-role/${guest_roleID}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id");
  });
});
