import express, { Request, Response } from "express";
import controller from "./agentRole.controller";
import middleware from "./agentRole.middleware";
import authorize from "../../../commen/helpers/authorize";
import asyncHandler from "express-async-handler"
import log from '../../../commen/logger/logger.service';

const router = express.Router();

// [ROUTE]: /api/v1/guest-role

// get logged in user role 
router.get("/", asyncHandler(controller.getGuestRole));

// get all guest roles
router.get("/all", authorize("getAllGuestRoles"), asyncHandler(controller.getAllGuestRoles), log);

// get guest role by id
router.get("/:id", authorize("getGuestRoleByID"), asyncHandler(controller.getGuestRoleByID));

// create guest role
router.post("/", authorize("createGuestRole"), asyncHandler(middleware.createGuestRole), asyncHandler(controller.createGuestRole));

// update guest role
router.put("/:id", authorize("updateGuestRole"), asyncHandler(middleware.updateGuestRole), asyncHandler(controller.updateGuestRole));

// delete guest role
router.delete("/:id", authorize("deleteGuestRole"), asyncHandler(controller.deleteGuestRole));

export default router;