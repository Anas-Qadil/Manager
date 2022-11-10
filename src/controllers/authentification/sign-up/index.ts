import { NextFunction, Request, Response } from "express";
import GuestService from "../../../services/guests/guest.class";
import { BadRequestError } from "../../../services/error/error.class";

const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  req.log = {...req.log, event: "creatingGuest", message: "Success"};
  const guest: any = await new GuestService().createGuest(req.body);
  if (guest.errorCode) {
    if (guest.errorCode === "P2002") throw new BadRequestError("Username already exists");
    throw new BadRequestError("Error creating guest");
  }
  res.status(201).json({ message: "Signed up successfully", data: guest.guest });
  next();
}

export { signUpController }; 