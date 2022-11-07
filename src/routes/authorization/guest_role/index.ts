import express, { Request, Response } from "express";
import controller from "../../../controllers/authorization/guest_role";
import middleware from "../../../middlewares/authorization/guest_role";

const router = express.Router();

// get logged in user role 
router.get("/", controller.getGuestRole);

// get guest role by id
router.get("/:id", controller.getGuestByID);

// get all guest roles
router.get("/all", controller.getAllGuestRoles);

// create guest role
router.post("/", middleware.createGuestRole, controller.createGuestRole);

// update guest role
router.put("/:id", middleware.updateGuestRole, controller.updateGuestRole);

// delete guest role
router.delete("/:id", controller.deleteGuestRole);

export default router;