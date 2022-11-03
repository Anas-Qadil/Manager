import { Request, Response, NextFunction } from "express";
import { PermissionsService } from "../../../services/permission/permission.class";

// TODO: check if user has access to the specific route
const hasAccess = (req: Request, res: Response, next: NextFunction) => {
	try {
    console.log("hasAccess");
    next();
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getPermissionByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("getPermissionByID");
    next();
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const createPermission = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("createPermission");
    next(); 
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updatePermission = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("updatePermission");
    next();
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deletePermission = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("deletePermission");
    next();
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  hasAccess,
  getPermissionByID,
  createPermission,
  updatePermission,
  deletePermission,
};
