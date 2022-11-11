import express from 'express';
import controller from './agent.controller';
import middleware from './agent.middleware';
import asyncHandler from "express-async-handler";
import authorize from "../../commen/helpers/authorize";
import log from '../../commen/logger/logger.service';

const router = express.Router();

// [ROUTE] /api/v1/guest

// get logged in guest
router.get("/", asyncHandler(controller.getGuest));
 
// get all guests
router.route("/all").get(asyncHandler(controller.getGuests), log);

// get guest by id
router.get("/:id", authorize("getGuestByID"), asyncHandler(controller.getGuestByID));

// delete guest by id
router.delete("/:id", authorize("deleteGuest"), asyncHandler(controller.deleteGuest));

// update guest by id
router.put("/:id", authorize("updateGuest"), asyncHandler(middleware.updateGuest), asyncHandler(controller.updateGuest));

export default router;