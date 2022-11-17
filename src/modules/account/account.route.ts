import express from "express";
import controller from "./account.controller";
import middleware from "./account.middleware";
import asyncHandler from "express-async-handler"

// [ROUTE] /api/v1/account
const router = express.Router();

// get accounts paginated
router.get("/", asyncHandler(controller.getAccounts));

router.get("/:id", asyncHandler(controller.getAccountByID));

// for testing purposes only
router.post("/", asyncHandler(controller.createAccount));

router.put("/:id", asyncHandler(middleware.updateAccount), asyncHandler(controller.updateAccount));

router.delete("/:id", asyncHandler(controller.deleteAccount));

export default router;