import { RequestHandler, NextFunction, Request, Response } from "express";


const signInMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user;
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (user.error) {
      return res.status(user.error.code).json({ message: user.error.message });
    }
    delete user.password;
    next();
  } catch (e) {
    res.status(500).send({ message: "Internal server error." });
  }
}

export {
  signInMiddleware
}