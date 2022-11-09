import express from "express";
import controller from "../../../controllers/authorization/role_access";
import middleware from "../../../middlewares/authorization/role_access";
import check_access from "../../../middlewares/authorization/access";
import asyncHandler from "express-async-handler"

const router = express.Router();

// [ROUTE]: /api/v1/role

// get logged in roles
router.get("/", asyncHandler(controller.getRoles));

// get all roles
// router.get("/all", check_access("getAllRole"), asyncHandler(controller.getAllRole));

// get role  of a specific user
router.get("/:id", check_access("getRoleByID"), asyncHandler(controller.getRoleByID));

// create a new role
router.post("/", check_access("createRole"), asyncHandler(middleware.createRole), asyncHandler(controller.createRole));

// update a role 
router.put("/:id", check_access("updateRole"), asyncHandler(middleware.updateRole), asyncHandler(controller.updateRole));

// delete a role  | means that the role  will be archived
router.delete("/:id", check_access("deleteRole"), asyncHandler(controller.deleteRole));

export default router;