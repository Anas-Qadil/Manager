import { Request, Response, NextFunction } from "express";
import { PropertyRequiredError, BadRequestError, ValidationError } from "../../commen/exceptions/exceptions.class";
import { validString } from "../../commen/helpers/helpers";

const createUserProfile = async (req: Request, res: Response, next: NextFunction) => {
	const data: any = req.body;
	if (!data) throw new PropertyRequiredError("user profile data is required");
	if (data.fullName && !validString(data.fullName)) throw new ValidationError("full name can not contain special characters");
	else if (!data.fullName) throw new PropertyRequiredError("full name is required");
	if (data.idCardNumber && !validString(data.idCardNumber)) throw new ValidationError("id card number can not contain special characters");
	else if (!data.idCardNumber) throw new PropertyRequiredError("id card number is required");
	if (data.idCardExpiryDate && !validString(data.idCardExpiryDate)) throw new ValidationError("id card expiry date can not contain special characters");
	else if (!data.idCardExpiryDate) throw new PropertyRequiredError("id card expiry date is required");
	if (data.dateOfBirth && !validString(data.dateOfBirth)) throw new ValidationError("date of birth can not contain special characters");
	else if (!data.dateOfBirth) throw new PropertyRequiredError("date of birth is required");
	if (!data.placeOfBirth && !validString(data.placeOfBirth)) throw new ValidationError("place of birth can not contain special characters");
	else if (!data.placeOfBirth) throw new PropertyRequiredError("place of birth is required");
	if (!data.nationality && !validString(data.nationality)) throw new ValidationError("nationality can not contain special characters");
	else if (!data.nationality) throw new PropertyRequiredError("nationality is required");
	if (data.gender && (data.gender !== "F" && data.gender !== "M")) throw new BadRequestError("gender can only be F or M");
	else if (!data.gender) throw new PropertyRequiredError("gender is required");
	if (data.city && !validString(data.city)) throw new ValidationError("city can not contain special characters");
	else if (!data.city) throw new PropertyRequiredError("city is required");
	if (data.address && !validString(data.address)) throw new ValidationError("address can not contain special characters");
	else if (!data.address) throw new PropertyRequiredError("address is required");
	next();
}

export default {
	createUserProfile,
}