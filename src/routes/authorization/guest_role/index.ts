import express, { Request, Response } from "express";
import controller from "../../../controllers/authorization/guest_role";
import middleware from "../../../middlewares/authorization/guest_role";

const router = express.Router();

// router.get("/", );
router.get("/", controller.getGuestRole);

router.get("/all", controller.getAllGuestRoles);

router.get("/:id", controller.getGuestByID);

router.post("/", middleware.createGuestRole, controller.createGuestRole);

router.put("/:id", middleware.updateGuestRole, controller.updateGuestRole);

export default router;