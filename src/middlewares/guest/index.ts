import { Request, Response, NextFunction } from "express";
//11;[11]>iex
const updateGuest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "content can not be empty!",
      });
    }
    if (!req.params.id) {
      return res.status(400).send({
        message: "id can not be empty!",  
      });
    }

    next();
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  updateGuest,
}