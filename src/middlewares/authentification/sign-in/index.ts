import { RequestHandler, NextFunction, Request, Response } from "express";


const signInMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user;
    if (user.error) {
      return res.status(user.error.code).json({ message: user.error.message });
    }
    
    next();
  } catch (e) {
    res.status(500).send({ message: "Internal server error." });
  }
}

export {
  signInMiddleware
}