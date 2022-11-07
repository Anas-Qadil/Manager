import express from 'express';
import permissions from '../../../controllers/authorization/permissions';
import middleware from '../../../middlewares/authorization/permission';

const router = express.Router();

// get all permissions of the logged in user
router.get("/", permissions.getUserPermissions);

// get permission by id
router.get("/:id", permissions.getPermissionByID);

// create a new permission
router.post("/", middleware.createPermission, permissions.createPermission);

// update a permission
router.put("/:id", middleware.updatePermission, permissions.updatePermission);

// delete a permission | means that the permission will be archived
router.delete("/:id", permissions.deletePermission);

export default router;