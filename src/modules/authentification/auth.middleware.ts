import { RequestHandler, NextFunction, Request, Response } from "express";
import { NotFoundError, InvalidCredentialsError } from "../../commen/exceptions/exceptions.class";
import { hashPassword } from "../../commen/helpers/helpers";

export const signInMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  req.log = { ...req.log, event: "userLoggedIn", error: false, message: "success" };
  const user: any = req.user;
  if (!user) throw new NotFoundError("user not found");
  if (user.error?.code === 404) throw new NotFoundError(user.error.message);
  if (user.error?.code === 400) throw new InvalidCredentialsError(user.error.message);
  delete user.password;
  next();
}

export const signUpMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
    const data: any = req.body;
    const user: any = req.user;
    const format = /[!#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/;

    if (!data) return res.status(400).json({ message: "Bad request" });
    if (!data.matricule) return res.status(400).json({ message: "Matricule is required" });
    else if (data.matricule.length > 50) return res.status(400).json({ message: "Matricule is too long" });
    else if (format.test(data.matricule)) return res.status(400).json({ message: "Matricule cannot contain special character" });
    if (!data.password) return res.status(400).json({ message: "Password is required" });
    else if (data.password.length < 3) return res.status(400).json({ message: "Password is too short" });
    else if (data.password.length > 50) return res.status(400).json({ message: "Password is too long" });
    else if (format.test(data.password)) return res.status(400).json({ message: "Password cannot contain special character" });
    if (!data.username) return res.status(400).json({ message: "Username is required" });
    else if (data.username.length < 3) return res.status(400).json({ message: "Username is too short" });
    else if (data.username.length > 50) return res.status(400).json({ message: "Username is too long" });
    else if (format.test(data.username)) return res.status(400).json({ message: "Username cannot contain special character" });
    req.body.creatorId = user.id;
    req.body.password = await hashPassword(data.password);
    next();
  } catch (e) {
	  res.status(500).send({ message: "Internal server error." });
  }
}
