import { Request, Response, NextFunction } from "express";

const createCompany = async (req: Request, res: Response, next: NextFunction) => {
	// @TODD: check the body request for required fields and valid fields
	next(); // move to the log middleware to log this event
}

const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
	// @TODD: check the body request for required fields and valid fields
	next(); // move to the log middleware to log this event
}

export default {
	createCompany,
	updateCompany,
}