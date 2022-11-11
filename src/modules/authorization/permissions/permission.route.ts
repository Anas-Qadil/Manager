import express from 'express';
import controller from './permissions.controller';
import middleware from './permission.middleware';
import authorize from "../../../commen/helpers/authorize";
import log from '../../../commen/logger/logger.service';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// [ROUTE]: /api/v1/permissions

// get all permissions of the logged in user
router.get("/", asyncHandler(controller.getUserPermissions));

// get permission by id
router.get("/:id", authorize("getPermissionByID"), asyncHandler(controller.getPermissionByID));

// create a new permission
router.post("/", authorize("createPermission"), asyncHandler(middleware.createPermission), asyncHandler(controller.createPermission));

// update a permission
router.put("/:id", authorize("updatePermission"), asyncHandler(middleware.updatePermission), asyncHandler(controller.updatePermission));

// delete a permission | means that the permission will be archived
router.delete("/:id", authorize("deletePermission"), asyncHandler(controller.deletePermission));

export default router;