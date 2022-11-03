import express, { Express, Request, Response, NextFunction } from 'express';
import permissions from '../../../controllers/authorization/permissions';
import middleware from '../../../middlewares/authorization/permission';
const router = express.Router();

// get all permissions of the logged in user
router.get("/", permissions.getUserPermissions);

// get all permissions of a specific user
router.get("/:id", permissions.getPermissionByID);

// create a new permission
router.post("/", middleware.createPermission, permissions.createPermission);

// update a permission
router.put("/:id", middleware.updatePermission,permissions.updatePermission);

// delete a permission | means that the permission will be archived
router.delete("/:id", middleware.deletePermission, permissions.deletePermission);

export default router;