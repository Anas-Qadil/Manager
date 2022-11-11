import { Request, Response, NextFunction } from "express";
import { PermissionsService } from "./permission.service";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../../commen/exceptions/exceptions.class";


// permissions of the logged in user 
const getUserPermissions = async (req: Request, res: Response, next: NextFunction) => {
    // for log middleware
    req.log = { ...req.log, event: "get logged in user permissions", error: false, message: "success"}
    const user: any = req.user; // get the user from the request
    const permissions = await new PermissionsService().getUserPermissions(user.id);
    if (!permissions) throw new NotFoundError('permissions not found');
    else res.status(200).send({ message: "permission found", data: permissions });
    next(); // move to the log middleware to log this event
}

const getPermissionByID = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) throw new PropertyRequiredError('permission ID is required');
  const permissionsService = await new PermissionsService().getPermissionByID(req.params.id);
  if (!permissionsService) throw new NotFoundError('permission not found');
  res.status(200).send({ message: "permission found", data: permissionsService });
  next(); // move to the log middleware to log this event
}

const createPermission = async (req: Request, res: Response, next: NextFunction) => {
  const permissions = await new PermissionsService().createPermission(req.body);
  if (!permissions) throw new ResourceNotCreatedError('permission not created');
  res.status(201).send({ message: "permission created", data: permissions });
  next(); // move to the log middleware to log this event
}

const updatePermission = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) throw new PropertyRequiredError('permission ID is required');
  const permissions = await new PermissionsService().updatePermission(req.params.id, req.body);
  if (!permissions) throw new ResourceNotUpdatedError('permission not updated');
  res.status(200).send({ message: "permission updated", data: permissions });
  next(); // move to the log middleware to log this event
}

const deletePermission = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) throw new PropertyRequiredError('permission ID is required');
  const permissionsService = await new PermissionsService().deletePermission(req.params.id);
  if (!permissionsService) throw new ResourceNotDeletedError('permission not deleted');
  res.status(200).send({ message: "permission deleted", data: permissionsService });
  next(); // move to the log middleware to log this event
}

export default {
  getUserPermissions,
  getPermissionByID,
  createPermission,
  updatePermission,
  deletePermission,
};