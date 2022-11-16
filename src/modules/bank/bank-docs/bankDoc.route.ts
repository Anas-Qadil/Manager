import express from 'express';
import controller from './bankDoc.controller';
import middleware from './bankDoc.middleware';
import asyncHandler from 'express-async-handler';

// [Route] /api/v1/bank-docs
const router = express.Router();

// get all bank docs paginated
router.get("/", asyncHandler(controller.getBankDocs));

router.get("/:id", asyncHandler(controller.getBankDocByID));

router.put("/:id", asyncHandler(middleware.updateBankDoc), asyncHandler(controller.updateBankDoc));

router.delete("/:id", asyncHandler(controller.deleteBankDoc));

export default router;
