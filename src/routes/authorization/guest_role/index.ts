import express, { Request, Response } from "express";
import controller from "../../../controllers/authorization/guest_role";
import middleware from "../../../middlewares/authorization/guest_role";
import check_access from '../../../middlewares/authorization/access';
import asyncHandler from "express-async-handler"
import log from '../../../middlewares/log';

const router = express.Router();

// [ROUTE]: /api/v1/guest-role

// get logged in user role 
router.get("/", asyncHandler(controller.getGuestRole));

// get all guest roles
router.get("/all", check_access("getAllGuestRoles"), asyncHandler(controller.getAllGuestRoles), log);

// get guest role by id
router.get("/:id", check_access("getGuestRoleByID"), asyncHandler(controller.getGuestRoleByID));

// create guest role
router.post("/", check_access("createGuestRole"), asyncHandler(middleware.createGuestRole), asyncHandler(controller.createGuestRole));

// update guest role
router.put("/:id", check_access("updateGuestRole"), asyncHandler(middleware.updateGuestRole), asyncHandler(controller.updateGuestRole));

// delete guest role
router.delete("/:id", check_access("deleteGuestRole"), asyncHandler(controller.deleteGuestRole));

export default router;