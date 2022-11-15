import { Request, Response, NextFunction } from "express";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../../commen/exceptions/exceptions.class";
import { IUser } from "../../../commen/interfaces";
import validator from "validator";

const createBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	const data: any = req.body;
	if (!data.bankName) throw new PropertyRequiredError("bankName is required");
	if (!data.rib) throw new PropertyRequiredError("rib is required");
	if (!data.companyID) throw new PropertyRequiredError("companyID is required");
	if (!data.userID) throw new PropertyRequiredError("userID is required");
	const user = req.user as IUser
	data.agentID = user.id;
	next();
}

const updateBankAccount = async (req: Request, _: Response, next: NextFunction) => {
	const data: any = req.body;
	if (data.archive && !validator.isBoolean(data.archive)) throw new PropertyRequiredError("archive must be a boolean");
	next();
}

export default {
	createBankAccount,
	updateBankAccount
}