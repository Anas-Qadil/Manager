import express from "express";
import controller from "./user.controller";
import middleware from "./user.middleware";
import asyncHandler from "express-async-handler"

// [ROUTE] /api/v1/user
const router = express.Router();

// get paginated users
router.get("/",	asyncHandler(controller.getUsers));

router.get("/:id", asyncHandler(controller.getUserByID));

router.post("/", asyncHandler(middleware.createUser), asyncHandler(controller.createUser));

router.put("/:id", asyncHandler(middleware.updateUser), asyncHandler(controller.updateUser));

router.delete("/:id", asyncHandler(controller.deleteUser));

export default router;