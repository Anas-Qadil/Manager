import { NextFunction, Request, Response } from "express"
import { IUser } from "../../../commen/interfaces";
import GuestRoleService from "./agentRole.service";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../../commen/exceptions/exceptions.class";

// get logged in user role
const getGuestRole = async (req: Request, res: Response, next: NextFunction) => {
  req.log = { ...req.log, event: "get logged in guest role", error: false, message: "success"}
  const user = req.user as IUser;
  const guestRoleData = await new GuestRoleService().getGuestRole(user.id);
  if (!guestRoleData) throw new NotFoundError("guest role not found");
  res.status(200).send({ message: "guest role found", data: guestRoleData });
  next();
}

const getGuestRoleByID = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) throw new PropertyRequiredError("guest role id is required");
  const guestRoleData = await new GuestRoleService().getGuestRoleByID(req.params.id);
  if (!guestRoleData) throw new NotFoundError("guest role not found");
  res.status(200).send({ message: "guest role found", data: guestRoleData });
  next();
}

const getAllGuestRoles = async (req: Request, res: Response, next: NextFunction) => {
  const guestRoleData = await new GuestRoleService().getAllGuestRoles();
  if (!guestRoleData) throw new NotFoundError("guest roles not found");
  res.status(200).send({ message: "guest roles found", data: guestRoleData });
  next();
}

const createGuestRole = async (req: Request, res: Response, next: NextFunction) => {
  const guestRoleData = await new GuestRoleService().createGuestRole(req.body);
  if (!guestRoleData) throw new ResourceNotCreatedError("guest role not created");
  res.status(201).send({ message: "guest role created", data: guestRoleData });
  next()
}

const updateGuestRole = async (req: Request, res: Response, next: NextFunction) => {
  const guestRoleData = await new GuestRoleService().updateGuestRole(req.params.id, req.body);
  if (!guestRoleData) throw new ResourceNotUpdatedError("guest role not updated");
  res.status(200).send({ message: "guest role updated", data: guestRoleData });
  next();
}

const deleteGuestRole = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) throw new PropertyRequiredError("guest role id is required");
  const guestRoleData = await new GuestRoleService().deleteGuestRole(req.params.id);
  if (!guestRoleData) throw new ResourceNotDeletedError("guest role not deleted");
  res.status(200).send({ message: "guest role deleted", data: guestRoleData });
  next();
}


export default {
  createGuestRole,
  updateGuestRole,
  deleteGuestRole,
  getGuestRole,
  getAllGuestRoles,
  getGuestRoleByID
};