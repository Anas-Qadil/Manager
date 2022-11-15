import express from 'express';
import controller from './bank.controller';
import middleware from './bank.middleware';
import asyncHandler from 'express-async-handler';

// [Route] /api/v1/bank
const router = express.Router();

// get all bank accounts paginated
router.get("/", asyncHandler(controller.getBankAccounts));

router.get("/:id", asyncHandler(controller.getBankAccountByID));

router.post("/", asyncHandler(middleware.createBankAccount), asyncHandler(controller.createBankAccount));

router.put("/:id", asyncHandler(middleware.updateBankAccount), asyncHandler(controller.updateBankAccount));

router.delete("/:id", asyncHandler(controller.deleteBankAccount));

export default router;