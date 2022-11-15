import CompanyService from "./company.service";
import { Request, Response, NextFunction } from "express";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";

const createCompany = async (req: Request, res: Response, next: NextFunction) => {
	const company = await new CompanyService().createCompany(req.body);
	if (!company) throw new ResourceNotCreatedError("company not created");
	res.status(201).send({ data: company });
	next();
}

const getCompanyByID = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("company ID is required");
	const company = await new CompanyService().getCompanyByID(req.params.id);
	if (!company) throw new NotFoundError("company not found");
	res.status(200).send({ data: company });
	next();
}

const getCompanies = async (req: Request, res: Response, next: NextFunction) => {
	const page = req.query.page ? parseInt(req.query.page as string) : 1;
	const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
	const companies = await new CompanyService().getCompanies(page, limit);
	res.status(200).send({ data: companies });
	next();
}

const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("company ID is required");
	const company = await new CompanyService().updateCompany(req.params.id, req.body);
	if (!company) throw new ResourceNotUpdatedError("company not updated");
	res.status(200).send({ data: company });
	next();
}

const deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("company ID is required");
	const company = await new CompanyService().deleteCompany(req.params.id);
	if (!company) throw new ResourceNotDeletedError("company not deleted");
	res.status(200).send({ data: company });
	next();
}

export default {
	createCompany,
	getCompanyByID,
	getCompanies,
	updateCompany,
	deleteCompany
}
