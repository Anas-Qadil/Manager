import express, { Request, Response } from "express";
import roleAccess from "../../../controllers/authorization/role_access";

const router = express.Router();

// get role access of the logged in user
router.get("/", roleAccess.getUserRoleAccess);

// get role access of a specific user
router.get("/:id", roleAccess.getRoleAccessByID);

// create a new role access
router.post("/", roleAccess.createRoleAccess);

// update a role access
router.put("/:id", roleAccess.updateRoleAccess);

// delete a role access | means that the role access will be archived
router.delete("/:id", roleAccess.deleteRoleAccess);

export default router;