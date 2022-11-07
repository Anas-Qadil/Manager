import express from 'express';
import { getGuest, getGuests, getGuestByID, updateGuest, deleteGuest } from '../../controllers/guest/index';
import middleware from '../../middlewares/guest';

const router = express.Router();

// get logged in guest
router.get("/", getGuest);

// get all guests
router.get("/all", getGuests);

// get guest by id
router.get("/:id", getGuestByID);

// delete guest by id
router.delete("/:id", deleteGuest);

// update guest by id
router.put("/:id", middleware.updateGuest, updateGuest);

export default router;