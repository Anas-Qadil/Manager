import { Request, Response, NextFunction } from "express";
import { validString } from "../../../utils";

const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: any = req.body;
    if (!data.name) {
      return res.status(400).send({
        message: "name is required",
      });
    }
    if (!validString(data.name)) {
      return res.status(400).send({
        message: "name is invalid",
      });
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data: any = req.body;
    if (data.name) {
      if (!validString(data.name)) {
        return res.status(400).send({
          message: "name is invalid",
        });
      }
    }
    next();
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  createRole,
  updateRole,
};