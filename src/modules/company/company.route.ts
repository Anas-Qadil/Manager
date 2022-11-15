import express from 'express';
import controller from "./company.controller";
import middleware from "./company.middleware";
import asyncHandler from "express-async-handler";

// [Route] /api/v1/company
const router = express.Router();

router.get('/', asyncHandler(controller.getAllCompanies));

router.post("/", asyncHandler(middleware.createCompany), asyncHandler(controller.createCompany));

router.put("/", asyncHandler(middleware.updateCompany), asyncHandler(controller.updateCompany));

router.delete("/", asyncHandler(controller.deleteCompany));

export default router;