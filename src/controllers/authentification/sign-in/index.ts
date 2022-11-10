import { NextFunction, Request, Response } from "express";
import { generateToken } from "../../../configs/passport/passport.service";
import { UnexpectedError } from "../../../services/error/error.class";

const signInController = (req: Request, res: Response, next: NextFunction) => {
  const {error, token} = generateToken(req.user);
  if (error) throw new UnexpectedError("auth token generation failed");
  res.status(200).json({ message: "Signed in successfully", token, user: req.user });
  next();
};

export {
  signInController
}