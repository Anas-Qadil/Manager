import express from 'express';
import permissions from '../../../controllers/authorization/permissions';
import middleware from '../../../middlewares/authorization/permission';
import check_access from '../../../middlewares/authorization/access';
import log from '../../../middlewares/log';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// [ROUTE]: /api/v1/permissions

// get all permissions of the logged in user
router.get("/", asyncHandler(permissions.getUserPermissions));

// get permission by id
router.get("/:id", check_access("getPermissionByID"), asyncHandler(permissions.getPermissionByID));

// create a new permission
router.post("/", check_access("createPermission"), asyncHandler(middleware.createPermission), asyncHandler(permissions.createPermission));

// update a permission
router.put("/:id", check_access("updatePermission"), asyncHandler(middleware.updatePermission), asyncHandler(permissions.updatePermission));

// delete a permission | means that the permission will be archived
router.delete("/:id", check_access("deletePermission"), asyncHandler(permissions.deletePermission));

export default router;