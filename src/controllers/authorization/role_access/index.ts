import { Request, Response } from "express";


const getUserRoleAccess = async (req: Request, res: Response) => {
	try {

    res.status(200).send("getUserRoleAccess");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getRoleAccessByID = async (req: Request, res: Response) => {
  try {
    res.status(200).send("getRoleAccessByID");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const createRoleAccess = async (req: Request, res: Response) => {
  try {
    res.status(200).send("createRoleAccess");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updateRoleAccess = async (req: Request, res: Response) => {
  try {
    res.status(200).send("updateRoleAccess");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deleteRoleAccess = async (req: Request, res: Response) => {
  try {
    res.status(200).send("deleteRoleAccess");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  getUserRoleAccess,
  getRoleAccessByID,
  createRoleAccess,
  updateRoleAccess,
  deleteRoleAccess,
};