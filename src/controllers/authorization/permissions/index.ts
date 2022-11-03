import { Request, Response } from "express";

const getUserPermissions = async (req: Request, res: Response) => {
  try {
    // const permissions = await Permission.find();
    // res.status(200).send(permissions);
    res.status(200).send("getPermissions");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const getPermissionByID = async (req: Request, res: Response) => {
  try {
    // const permission = await Permission.findById(req.params.id);
    // res.status(200).send(permission);
	  res.status(200).send("getPermission");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const createPermission = async (req: Request, res: Response) => {
  try {
    // const permission = await Permission.create(req.body);
    // res.status(200).send(permission);
    res.status(200).send("createPermission");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const updatePermission = async (req: Request, res: Response) => {
  try {
    // const permission = await Permission.findByIdAndUpdate(req.params.id, req.body);
    // res.status(200).send(permission);
    res.status(200).send("updatePermission");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

const deletePermission = async (req: Request, res: Response) => {
  try {
    // const permission = await Permission.findByIdAndDelete(req.params.id);
    // res.status(200).send(permission);
    res.status(200).send("deletePermission");
  } catch (err) {
    res.status(500).send({
      message: "internal server error",
    });
  }
}

export default {
  getUserPermissions,
  getPermissionByID,
  createPermission,
  updatePermission,
  deletePermission,
};