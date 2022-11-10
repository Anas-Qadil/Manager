import { RequestHandler, NextFunction, Request, Response } from "express";
import { NotFoundError, InvalidCredentialsError } from "../../services/error/error.class";

const signInMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  req.log = { ...req.log, event: "userLoggedIn", error: false, message: "success" };
  const user: any = req.user;
  if (!user) throw new NotFoundError("user not found");
  if (user.error?.code === 404) throw new NotFoundError(user.error.message);
  if (user.error?.code === 400) throw new InvalidCredentialsError(user.error.message);
  delete user.password;
  next();
}

export {
  signInMiddleware
}