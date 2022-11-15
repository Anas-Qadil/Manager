import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response) => {
  req.log.error = true;
  req.log.message = err.message || "internal server error";
  const status = err.statusCode || 500;
  return res.status(status).json({
    message : err.message,
    stack : process.env.NODE_ENV === "production" ? "🥞" : err.stack
  });
}

export default errorHandler;