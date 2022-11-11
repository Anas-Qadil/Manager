import { Request, Response, NextFunction } from "express";
import { IUser } from "../../../interfaces";

const createGuestRole = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  const data: any = req.body;
  data.assignedBy = user.id;
  next();
}

const updateGuestRole = async (req: Request, res: Response, next: NextFunction) => {
  next();
}

export default {
  createGuestRole,
  updateGuestRole,
};