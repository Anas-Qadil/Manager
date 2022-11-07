import { Request, Response } from "express";
import { PermissionsService } from "../../../services/permission/permission.class";

// permissions of the logged in user 
const getUserPermissions = async (req: Request, res: Response) => {
  try {
    const user: any = req.user; // get the user from the request
    if (!user.id) res.status(401).send({ message: "unauthorized" });

    const permissionsService = await new PermissionsService().getUserPermissions(user.id);
    if (!permissionsService) return res.status(404).send({ message: "permissions not found" });

    res.status(200).send({
      message: "permission found",
      data: permissionsService
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getPermissionByID = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) res.status(400).send({ message: "permission ID is required" });

    const permissionsService = await new PermissionsService().getPermissionByID(req.params.id);
    if (!permissionsService) return res.status(404).send({ message: "permission not found" });

	  res.status(200).send({
      message: "permission found",
      data: permissionsService
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const createPermission = async (req: Request, res: Response) => {
  try {
    const permissionsService = await new PermissionsService().createPermission(req.body);
    if (!permissionsService) return res.status(400).send({ message: "permission not created" });
    res.status(200).send({
      message: "permission created",
      data: permissionsService
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

// request body should not have record id
// TODO: add validation and check if the user has the permission to update the permission
// TODO: check if permission exists and if it is archived
const updatePermission = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) res.status(401).send({ message: "permission ID is required" });

    const permissionsService = await new PermissionsService().updatePermission(req.params.id, req.body);
    if (!permissionsService) return res.status(400).send({ message: "permission not updated" });
    res.status(200).send({
      message: "permission updated",
      data: permissionsService
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deletePermission = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) res.status(401).send({ message: "permission ID is required" });
    const permissionsService = await new PermissionsService().deletePermission(req.params.id);
    if (!permissionsService) return res.status(400).send({ message: "permission not deleted" });
    res.status(200).send({
      message: "permission deleted",
      data: permissionsService
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  getUserPermissions,
  getPermissionByID,
  createPermission,
  updatePermission,
  deletePermission,
};