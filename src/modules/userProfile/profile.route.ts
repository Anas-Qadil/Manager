import express from 'express';
import controller from './profile.controller';
import asyncHandler from 'express-async-handler';
import authorize from "../../commen/helpers/authorize";
import middleware from './profile.middleware';

const router = express.Router();

// [ROUTE]:  /api/v1/user-profile

router.get("/:id", authorize("getUserProfileByID"), asyncHandler(controller.getUserProfileByID));

router.post("/", authorize("createUserProfile"), asyncHandler(middleware.createUserProfile), asyncHandler(controller.createUserProfile));

router.put("/:id", authorize("updateUserProfile"), asyncHandler(controller.updateUserProfile));

router.delete("/:id", authorize("deleteUserProfile"), asyncHandler(controller.deleteUserProfile));

export default router;