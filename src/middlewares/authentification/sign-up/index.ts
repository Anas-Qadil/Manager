import { RequestHandler, NextFunction, Request, Response } from "express";
import { hashPassword } from "../../../utils";

const signUpMiddleware: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
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

export {
  signUpMiddleware
}