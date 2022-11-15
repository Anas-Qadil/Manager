import { Request, Response, NextFunction } from 'express';
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../../commen/exceptions/exceptions.class";
import validator from 'validator';
import { IUser } from '../../../commen/interfaces';

const updateBankDoc = async (req: Request, _: Response, next: NextFunction) => {
	const data = req.body;
	const user = req.user as IUser;

	if (!req.params.id) throw new PropertyRequiredError('data is required');
	if (data.archive && !validator.isBoolean(data.archive)) throw new PropertyRequiredError('archive must be a boolean');
	data.agentID = user.id;
	next();
};

export default {
	updateBankDoc,
};