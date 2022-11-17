import { Request, Response, NextFunction } from "express";
import UserService from "./user.service";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";

// get users Paginated
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	const page = req.query.page ? parseInt(req.query.page as string) : 1;
	const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

	const users = await new UserService().getUsers(page, limit);
	if (!users) throw new NotFoundError("Users not found");
	res.status(200).send(users);
	// next(); // for log purpose
}

const getUserByID = async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	if (!id) throw new PropertyRequiredError("id");
	const user = await new UserService().getUserByID(id);
	if (!user) throw new NotFoundError("User not found");
	res.status(200).send(user);
	// next(); // for log purpose
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const data = req.body;
	const user = await new UserService().createUser(data);
	if (!user) throw new ResourceNotCreatedError("User not created");
	res.status(201).send(user);
	// next(); // for log purpose
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	if (!id) throw new PropertyRequiredError("id");
	const data = req.body;
	const user = await new UserService().updateUser(id, data);
	if (!user) throw new ResourceNotUpdatedError("User not updated");
	res.status(200).send(user);
	// next(); // for log purpose
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;
	if (!id) throw new PropertyRequiredError("id");
	const user = await new UserService().deleteUser(id);
	if (!user) throw new ResourceNotDeletedError("User not deleted");
	res.status(200).send(user);
	// next(); // for log purpose
}

export default {
	getUsers,
	getUserByID,
	createUser,
	updateUser,
	deleteUser,
}