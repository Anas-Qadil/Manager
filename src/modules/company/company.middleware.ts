import { Request, Response, NextFunction } from "express";
import { IUser } from "../../commen/interfaces";
import { PropertyRequiredError, BadRequestError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";

const createCompany = async (req: Request, _: Response, next: NextFunction) => {
	const user = req.user as IUser
	const data = req.body;

	if (!data.name) throw new PropertyRequiredError("company name is required");
	if (!data.address) throw new PropertyRequiredError("company address is required");
	if (!data.city) throw new PropertyRequiredError("company city is required");
	if (!data.country) throw new PropertyRequiredError("company country is required");
	else if (data.country !== "MOROCCO" && data.country !== "EGYPT") throw new BadRequestError("company country must be MOROCCO");
	if (!data.rc) throw new PropertyRequiredError("company rc is required");
	if (!data.cnssNumber) throw new PropertyRequiredError("company cnssNumber is required");
	if (!data.idFiscal) throw new PropertyRequiredError("company idFiscal is required");
	if (!data.taxNumber) throw new PropertyRequiredError("company taxNumber is required");
	if (!data.companyCommunID) throw new PropertyRequiredError("company companyCommunID is required");
	if (!data.userID) throw new PropertyRequiredError("company userID is required");
	data.agentID = user.id;
	next();
}

const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO verify what to check
	next();
}

export default {
	createCompany,
	updateCompany,
}