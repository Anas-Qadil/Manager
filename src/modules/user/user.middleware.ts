import { Request, Response, NextFunction } from "express";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: check req.body data
	next();
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: check req.body data
	next();
}

export default {
	createUser,
	updateUser,
}