import UserProfileService from "./profile.service";
import { Request, Response, NextFunction } from "express";
import { PropertyRequiredError, NotFoundError, ResourceNotCreatedError, ResourceNotDeletedError, ResourceNotUpdatedError } from "../../commen/exceptions/exceptions.class";

const getUserProfileByID = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("user ID is required");
	const userProfile = await new UserProfileService().getUserProfile(req.params.id);
	if (!userProfile) throw new NotFoundError("user profile not found");
	else res.status(200).send({ data: userProfile });
	next();
}

const createUserProfile = async (req: Request, res: Response, next: NextFunction) => {
	const userProfile = await new UserProfileService().createUserProfile(req.body);
	if (!userProfile) throw new ResourceNotCreatedError("user profile not created");
	else res.status(201).send({ data: userProfile });
	next();
}

const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("user ID is required");
	const userProfile = await new UserProfileService().updateUserProfile(req.params.id, req.body);
	if (!userProfile) throw new ResourceNotUpdatedError("user profile not updated");
	else res.status(200).send({ data: userProfile });
	next();
}

const deleteUserProfile = async (req: Request, res: Response, next: NextFunction) => {
	if (!req.params.id) throw new PropertyRequiredError("user ID is required");
	const userProfile = await new UserProfileService().deleteUserProfile(req.params.id);
	if (!userProfile) throw new ResourceNotDeletedError("user profile not deleted");
	else res.status(200).send({ data: userProfile });
	next();
}

export default {
	getUserProfileByID,
	createUserProfile,
	updateUserProfile,
	deleteUserProfile,
};