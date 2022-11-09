import express from 'express';
import { getGuest, getGuests, getGuestByID, updateGuest, deleteGuest } from '../../controllers/guest/index';
import middleware from '../../middlewares/guest';
import asyncHandler from "express-async-handler";
import check_access from '../../middlewares/authorization/access';
import log from '../../middlewares/log';

const router = express.Router();

// [ROUTE] /api/v1/guest

// get logged in guest
router.get("/", asyncHandler(getGuest));

// get all guests
// router.get("/all", check_access("getAllGuests"), asyncHandler(getGuests), log);

// get guest by id
router.get("/:id", check_access("getGuestByID"), asyncHandler(getGuestByID));

// delete guest by id
router.delete("/:id", check_access("deleteGuest"), asyncHandler(deleteGuest));

// update guest by id
router.put("/:id", check_access("updateGuest"), asyncHandler(middleware.updateGuest), asyncHandler(updateGuest));

export default router;