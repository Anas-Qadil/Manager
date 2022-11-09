import { NextFunction, Request, Response } from "express";
import RoleService from "../../../services/role_access/role.class";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../../services/error/error.class";
import { IUser } from "../../../interfaces";

// get logged in user roles
const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  req.log = { ...req.log, event: "get logged in user Roles", error: false, message: "success"}
  const user = req.user as IUser;
  const roleData = await new RoleService().getRoles(user.id);
  if (!roleData) throw new NotFoundError("role not found");
  res.status(200).send({ message: "role found", data: roleData });
  next();
}

const getAllRole = async (req: Request, res: Response, next: NextFunction) => {
  const roleData = await new RoleService().getAllRole();
  if (!roleData) throw new NotFoundError("role not found");
  res.status(200).send({ message: "roles found", data: roleData });
  next()
}

const getRoleByID = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) throw new PropertyRequiredError("role id is required");
  const roleData = await new RoleService().getRoleByID(req.params.id);
  if (!roleData) throw new NotFoundError("role not found");
  res.status(200).send({ message: "role  found", data: roleData });
  next()
}

const createRole = async (req: Request, res: Response, next: NextFunction) => {
  const data: any = req.body;
  const user = req.user as IUser;
  data.creatorID = user.id;
  const roleData = await new RoleService().createRole(req.body);
  if (!roleData) throw new ResourceNotCreatedError("role not created");
  res.status(201).send({ message: "role  created", data: roleData });
  next()
}

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  const roleData = await new RoleService().updateRole(req.params.id, req.body);
  if (!roleData) throw new ResourceNotUpdatedError("role not updated");
  res.status(200).send({ message: "role updated", data: roleData });
  next();
}

const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) throw new PropertyRequiredError("role id is required");
  const roleData = await new RoleService().deleteRole(req.params.id);
  if (!roleData) throw new ResourceNotDeletedError("role not deleted");
  res.status(200).send({ message: "role  deleted", data: roleData });
  next();
}

export default {
  getRoles,
  getRoleByID,
  createRole,
  updateRole,
  deleteRole,
  getAllRole
};