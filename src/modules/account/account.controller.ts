import { Request, Response, NextFunction } from "express";
import AccountService from "./account.service";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";


const getAccounts = async (req: Request, res: Response, next: NextFunction) => {
	const page = req.query.page ? parseInt(req.query.page as string) : 1;
	const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;
	const account = await new AccountService().getAccounts(page, limit);
	if (!account) throw new NotFoundError("Accounts not found");
	res.status(200).send(account);
	// next(); // go to the log middleware
}

const getAccountByID = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("id");
	const account = await new AccountService().getAccountByID(req.params.id);
	if (!account) throw new NotFoundError("Account not found");
	res.status(200).send(account);
	// next(); // go to the log middleware
}

const createAccount = async (req: Request, res: Response, next: NextFunction) => {
	const account = await new AccountService().createAccount(req.body);
	if (!account) throw new ResourceNotCreatedError("Account not created");
	res.status(201).send(account);
	// next(); // go to the log middleware
}

const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("id");
	const account = await new AccountService().updateAccount(req.params.id, req.body);
	if (!account) throw new ResourceNotUpdatedError("Account not updated");
	res.status(200).send(account);
	// next(); // go to the log middleware
}

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("id");
	const account = await new AccountService().deleteAccount(req.params.id);
	if (!account) throw new ResourceNotDeletedError("Account not deleted");
	res.status(200).send(account);
	// next(); // go to the log middleware
}

export default {
	getAccounts,
	getAccountByID,
	createAccount,
	updateAccount,
	deleteAccount
}