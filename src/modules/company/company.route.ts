import express from 'express';
import controller from "./company.controller";
import middleware from "./company.middleware";
import asyncHandler from "express-async-handler";

// [Route] /api/v1/company
const router = express.Router();

// get all companies paginated
router.get('/', asyncHandler(controller.getCompanies));

router.get("/:id", asyncHandler(controller.getCompanyByID));

router.post("/", asyncHandler(middleware.createCompany), asyncHandler(controller.createCompany));

router.put("/:id", asyncHandler(middleware.updateCompany), asyncHandler(controller.updateCompany));

router.delete("/:id", asyncHandler(controller.deleteCompany));

export default router;