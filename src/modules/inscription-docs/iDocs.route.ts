import express from 'express';
import controller from './iDocs.controller';
import middleware from './iDocs.middleware';
import asyncHandler from 'express-async-handler';

// [ROUTE] /api/inscription-docs
const router = express.Router();

// get all docs paginated
router.get("/", asyncHandler(controller.getInscriptionDocs));

router.get("/:id", asyncHandler(controller.getInscriptionDocByID));

// this route is for test purposes only (to be removed)
router.post("/", asyncHandler(middleware.createInscriptionDoc), asyncHandler(controller.createInscriptionDoc));

router.put("/:id", asyncHandler(middleware.updateInscriptionDoc), asyncHandler(controller.updateInscriptionDoc));

router.delete("/:id", asyncHandler(controller.deleteInscriptionDoc));

export default router;