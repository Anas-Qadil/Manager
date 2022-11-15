import { Request, Response, NextFunction } from 'express';
import BankDocService from './bankDoc.service';
import { PropertyRequiredError, NotFoundError, ResourceNotUpdatedError, ResourceNotDeletedError } from "../../../commen/exceptions/exceptions.class";

const getBankDocByID = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError('id is required');
	const bankDoc = await new BankDocService().getBankDocByID(req.params.id);
	if (!bankDoc) throw new NotFoundError('Bank Doc not found');
	res.status(200).send({ data: bankDoc });
	next();
};

const updateBankDoc = async (req: Request, res: Response, next: NextFunction) => {
	const updateBankDoc = await new BankDocService().updateBankDoc(req.params.id, req.body);
	if (!updateBankDoc) throw new ResourceNotUpdatedError('something went wrong while updating Bank Doc');
	res.status(200).send({ data: updateBankDoc });
	next();
};

const getBankDocs = async (req: Request, res: Response, next: NextFunction) => {
	const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
	const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 6;
	const bankDocs = await new BankDocService().getBankDocs(page, limit);
	res.status(200).send({ data: bankDocs });
	next();
};

const deleteBankDoc = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError('id is required');
	const deleteBankDoc = await new BankDocService().deleteBankDoc(req.params.id);
	if (!deleteBankDoc) throw new ResourceNotDeletedError('something went wrong while deleting Bank Doc');
	res.status(200).send({ data: deleteBankDoc });
	next();
};

export default {
	getBankDocByID,
	updateBankDoc,
	getBankDocs,
	deleteBankDoc
};