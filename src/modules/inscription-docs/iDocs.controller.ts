import { Request, Response, NextFunction } from "express";
import iDocsService from "./iDocs.service";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";

const getInscriptionDocs = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: get paginated docs
	const page = req.query.page ? parseInt(req.query.page as string) : 1;
	const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
	const docs = await new iDocsService().getInscriptionDocs(page, limit);
	if (!docs) throw new NotFoundError("Inscription docs not found");
	res.status(200).send(docs);
	// next(); // for log purpose
}

const getInscriptionDocByID = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: get doc by id
	const id = req.params.id;
	if (!id) throw new PropertyRequiredError("id");
	const doc = await new iDocsService().getInscriptionDocByID(id);
	if (!doc) throw new NotFoundError("Inscription doc not found");
	res.status(200).send(doc);
	// next(); // for log purpose
}

// this controller is for test purposes only (to be removed)
const createInscriptionDoc = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: create doc
	const data = req.body;
	if (!data) throw new PropertyRequiredError("data");
	const doc = await new iDocsService().createInscriptionDoc(data);
	if (!doc) throw new ResourceNotCreatedError("Inscription doc not created");
	res.status(201).send(doc);
	// next(); // for log purpose
}

const updateInscriptionDoc = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: update doc
	const id = req.params.id;
	if (!id) throw new PropertyRequiredError("id");
	const data = req.body;
	if (!data) throw new PropertyRequiredError("data");
	const doc = await new iDocsService().updateInscriptionDoc(id, data);
	if (!doc) throw new ResourceNotUpdatedError("Inscription doc not updated");
	res.status(200).send(doc);
	// next(); // for log purpose
}

const deleteInscriptionDoc = async (req: Request, res: Response, next: NextFunction) => {
	// @TODO: delete doc
	const id = req.params.id;
	if (!id) throw new PropertyRequiredError("id");
	const doc = await new iDocsService().deleteInscriptionDoc(id);
	if (!doc) throw new ResourceNotDeletedError("Inscription doc not deleted");
	res.status(200).send(doc);
	// next(); // for log purpose
}

export default {
	getInscriptionDocs,
	getInscriptionDocByID,
	createInscriptionDoc,
	updateInscriptionDoc,
	deleteInscriptionDoc
}