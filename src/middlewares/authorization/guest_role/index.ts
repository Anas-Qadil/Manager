import { Request, Response, NextFunction } from "express";

const createGuestRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = req.user;
    const data: any = req.body;
    data.assignedBy = user.id;
    next();
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updateGuestRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  createGuestRole,
  updateGuestRole,
};