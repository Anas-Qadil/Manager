import { NextFunction, Request, Response } from "express";
import { generateToken } from "../../configs/passport/passport.service";
import { UnexpectedError, BadRequestError } from "../../commen/exceptions/exceptions.class";
import GuestService from "../../modules/agent/agent.service";

export const signInController = (req: Request, res: Response, next: NextFunction) => {
  const {error, token} = generateToken(req.user);
  if (error) throw new UnexpectedError("auth token generation failed");
  res.status(200).json({ message: "Signed in successfully", token, user: req.user });
  next();
};


export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  req.log = {...req.log, event: "creatingGuest", message: "Success"};
  const guest: any = await new GuestService().createGuest(req.body);
  if (guest.errorCode) {
    if (guest.errorCode === "P2002") throw new BadRequestError("Username already exists");
    throw new BadRequestError("Error creating guest");
  }
  res.status(201).json({ message: "Signed up successfully", data: guest.guest });
  next();
}
