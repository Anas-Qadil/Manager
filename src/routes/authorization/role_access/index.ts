import express, { Request, Response } from "express";
import controller from "../../../controllers/authorization/role_access";
import middleware from "../../../middlewares/authorization/role_access";

const router = express.Router();

// get all roles
router.get("/all", controller.getAllRole);

// get role  of a specific user
router.get("/:id", controller.getRoleByID);

// create a new role
router.post("/", middleware.createRole, controller.createRole);

// update a role 
router.put("/:id", middleware.updateRole, controller.updateRole);

// delete a role  | means that the role  will be archived
router.delete("/:id", controller.deleteRole);

export default router;