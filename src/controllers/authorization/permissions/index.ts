import { Request, Response } from "express";
import { PermissionsService } from "../../../services/permission/permission.class";

// permissions of the logged in user 
const getUserPermissions = async (req: Request, res: Response) => {
  try {
    if (!req.user) res.status(401).send({ message: "user is not logged in" });

    const user: any = req.user; // get the user from the request
    const permissions = await new PermissionsService().getUserPermissions(user.id);
    if (!permissions) return res.status(404).send({ message: "permissions not found" });
    console.log(permissions)
    res.status(200).send({
      message: "permission found",
      data: permissions
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
    const permissions = await new PermissionsService().createPermission(req.body);
    if (!permissions) return res.status(400).send({ message: "permission not created" });
    res.status(201).send({
      message: "permission created",
      data: permissions
    });
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updatePermission = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) res.status(401).send({ message: "permission ID is required" });
    const permissions = await new PermissionsService().updatePermission(req.params.id, req.body);
    if (!permissions) return res.status(400).send({ message: "permission not updated" });
    res.status(200).send({
      message: "permission updated",
      data: permissions
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