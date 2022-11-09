import { Request, Response, NextFunction } from "express";
import { PropertyRequiredError, EmptyRequestBodyError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../services/error/error.class";


const updateGuest = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) throw new EmptyRequestBodyError("empty request body");
  if (!req.params.id) throw new PropertyRequiredError("id");
  next();
}

export default {
  updateGuest,
}