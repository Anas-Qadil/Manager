import { Request, Response, NextFunction } from "express";
import { validString } from "../../../commen/helpers/helpers";
import { IPermission } from '../../../commen/interfaces';
import { ValidationError, PropertyRequiredError } from "../../../commen/exceptions/exceptions.class";

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
    next();
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  getPermissionByID,
  createPermission,
  updatePermission,
  deletePermission,
};
