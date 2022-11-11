import { Request, Response, NextFunction } from "express";
import { validString } from "../../../commen/helpers/helpers";
import { PropertyRequiredError, ValidationError } from "../../../commen/exceptions/exceptions.class";


const createRole = async (req: Request, res: Response, next: NextFunction) => {
  const data: any = req.body;
  if (!data.name) throw new PropertyRequiredError('name is required');
  if (!validString(data.name)) throw new ValidationError('name is invalid');
  next();
}

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  const data: any = req.body;
  if (data.name)
    if (!validString(data.name)) throw new ValidationError('name is invalid');
  if (!req.params.id) throw new PropertyRequiredError('id is required');  
  next();
}

export default {
  createRole,
  updateRole,
};