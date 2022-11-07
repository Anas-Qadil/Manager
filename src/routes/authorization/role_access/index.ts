import express, { Request, Response } from "express";
import role from "../../../controllers/authorization/role_access";

const router = express.Router();

// get role access of the logged in user
router.get("/", role.getUserRole);

// get all role 
router.get("/all", role.getAllRole);

// get role  of a specific user
router.get("/:id", role.getRoleByID);

// create a new role
router.post("/", role.createRole);

// update a role 
router.put("/:id", role.updateRole);

// delete a role  | means that the role  will be archived
router.delete("/:id", role.deleteRole);

export default router;