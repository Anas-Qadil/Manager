import { Request, Response, NextFunction } from "express";
import { validString } from "../../../utils";
import { IPermission } from "../../../interfaces";
import { ValidationError, PropertyRequiredError } from "../../../services/error/error.class";

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
    next();
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const createPermission = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.name) throw new PropertyRequiredError("permission name is required");
  if (!validString(req.body.name)) throw new ValidationError("permission name is invalid");
  if (req.body.description) 
    if (!validString(req.body.description)) throw new ValidationError("permission description is invalid");
  next(); 
}

const updatePermission = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.name) 
    if (!validString(req.body.name)) throw new ValidationError("permission name is invalid");
  if (req.body.description) 
    if (!validString(req.body.description)) throw new ValidationError("permission description is invalid");
  next();
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
