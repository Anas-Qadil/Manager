import { Request, Response, NextFunction } from "express";

// TODO: check if user has access to the specific route
const hasAccess = (req: Request, res: Response, next: NextFunction) => {
	try {
    console.log("hasAccess");
    next();
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default hasAccess;