import { Request, Response, NextFunction } from "express";

const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: validate data
	next();
}

export default {
	updateAccount
}