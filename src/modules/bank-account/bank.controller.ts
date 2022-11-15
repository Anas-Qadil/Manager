import { Request, Response, NextFunction } from "express"

const getBankAccountByID = async (req: Request, res: Response, next: NextFunction) => {
	//@TODO: get Bank Account by ID
}

const createBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: create Bank Account
}

const updateBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: update Bank Account
}

const deleteBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: delete Bank Account
}

export default {
	getBankAccountByID,
	createBankAccount,
	updateBankAccount,
	deleteBankAccount
}