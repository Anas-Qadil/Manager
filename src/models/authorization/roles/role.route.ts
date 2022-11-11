import express from "express";
import controller from "./role.controller";
import middleware from "./role.middleware";
import authorize from "../../../commen/helpers/authorize";
import asyncHandler from "express-async-handler"
import log from '../../../commen/logger/logger.service';

const router = express.Router();

// [ROUTE]: /api/v1/role

// get logged in roles
router.get("/", asyncHandler(controller.getRoles));

// get all roles
router.get("/all", authorize("getAllRole"), asyncHandler(controller.getAllRole), log);

// get role  of a specific user
router.get("/:id", authorize("getRoleByID"), asyncHandler(controller.getRoleByID));

// create a new role
router.post("/", authorize("createRole"), asyncHandler(middleware.createRole), asyncHandler(controller.createRole));

// update a role 
router.put("/:id", authorize("updateRole"), asyncHandler(middleware.updateRole), asyncHandler(controller.updateRole));

// delete a role  | means that the role  will be archived
router.delete("/:id", authorize("deleteRole"), asyncHandler(controller.deleteRole));

export default router;