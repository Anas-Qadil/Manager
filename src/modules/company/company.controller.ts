import CompanyService from "./company.service";
import { Request, Response, NextFunction } from "express";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";

const createCompany = async (req: Request, res: Response, next: NextFunction) => {
	const company = await new CompanyService().createCompany(req.body);
	// if (!company) throw new ResourceNotCreatedError("company not created");
	res.status(201).send({ message: "company created", data: company });
	next(); // move to the log middleware to log this event
}

const getCompany = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("company ID is required");
	const company = await new CompanyService().getCompany(req.params.id);
	// if (!company) throw new NotFoundError("company not found");
	res.status(200).send({ message: "company found", data: company });
	next(); // move to the log middleware to log this event
}

const getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
	const companies = await new CompanyService().getAllCompanies();
	// if (!companies) throw new NotFoundError("companies not found");
	res.status(200).send({ message: "companies found", data: companies });
	next(); // move to the log middleware to log this event
}

const updateCompany = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("company ID is required");
	const company = await new CompanyService().updateCompany(req.params.id, req.body);
	// if (!company) throw new ResourceNotUpdatedError("company not updated");
	res.status(200).send({ message: "company updated", data: company });
	next(); // move to the log middleware to log this event
}

const deleteCompany = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("company ID is required");
	const company = await new CompanyService().deleteCompany(req.params.id);
	// if (!company) throw new ResourceNotDeletedError("company not deleted");
	res.status(200).send({ message: "company deleted", data: company });
	next(); // move to the log middleware to log this event
}

export default {
	createCompany,
	getCompany,
	getAllCompanies,
	updateCompany,
	deleteCompany,
}
