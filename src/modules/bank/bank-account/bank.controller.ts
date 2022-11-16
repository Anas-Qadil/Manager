import { Request, Response, NextFunction } from "express"
import BankAccountService from "./bank.service"
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../../commen/exceptions/exceptions.class";

const getBankAccounts = async (req: Request, res: Response, next: NextFunction) => {
	const page = req.query.page ? parseInt(req.query.page as string) : 1;
	const limit = req.query.limit ? parseInt(req.query.limit as string) : 6;
	const bankAccounts = await new BankAccountService().getBankAccounts(page, limit);
	const count = await new BankAccountService().getBankAccountsCount();
	res.status(200).send({ data: bankAccounts, count });
	next();
}

const getBankAccountByID = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("id is required");
	const bankAccount = await new BankAccountService().getBankAccountByID(req.params.id);
	if (!bankAccount) throw new NotFoundError("Bank Account not found");
	res.status(200).send({ data: bankAccount });
	next();
}

const createBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	const bankAccount = await new BankAccountService().createBankAccount(req.body);
	if (!bankAccount) throw new ResourceNotCreatedError("bank account not created");
	res.status(201).send({ data: bankAccount });
	next();
}

const updateBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	const updateBankAccount = await new BankAccountService().updateBankAccount(req.params.id, req.body);
	if (!updateBankAccount) throw new ResourceNotUpdatedError("bank account not updated");
	res.status(200).send({ data: updateBankAccount });
	next();
}

const deleteBankAccount = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("id is required");
	const deleteBankAccount = await new BankAccountService().deleteBankAccount(req.params.id);
	if (!deleteBankAccount) throw new ResourceNotDeletedError("bank account not deleted");
	res.status(200).send({ data: deleteBankAccount });
	next();
}

export default {
	getBankAccounts,
	getBankAccountByID,
	createBankAccount,
	updateBankAccount,
	deleteBankAccount
}