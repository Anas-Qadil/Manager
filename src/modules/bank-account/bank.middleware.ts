import { Request, Response, NextFunction } from "express";

const createBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: check req body
}

const updateBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: check req body
}

export default {
	createBankAccount,
	updateBankAccount
}